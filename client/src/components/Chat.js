import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';
import { getAllRooms } from '../actions/chat';
import io from "socket.io-client";
import { setAlert } from '../actions/alert';

import Profile from './chat/Profile';
import BurgerMenu from './chat/BurgerMenu';
import Search from './chat/Search';
import Dialogs from './chat/Dialogs';
import Messages from './chat/Messages';
import Input from './chat/Input';

import '../stylesheets/chat.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

let URL;
if ((window.location.href.includes('localhost'))) {
    URL = 'http://localhost:3000/';
}
else {
    URL = 'https://team-8-messenger.herokuapp.com/';
}
console.log(URL)

let socket;

const Chat = ({ getAllRooms, isAuthenticated, userData, messagesFromBase, setAlert }) => {
    const [onlineMessages, setOnlineMessages] = useState([]);
    const [usersOnline, updateUsersOnline] = useState([]);
    const [typing, setTyping] = useState('');

    useEffect(() => {
        socket = io(URL);
    }, [URL])

    useEffect(() => {
        const { login } = userData;
        if (login) {
            socket.emit('join', { login });
        }

        socket.on('join', login => {
            if (login !== undefined)
                setAlert(`${login} присоединился к чату!`, 'success', 2000);
        });

        socket.on('message', message => {
            setOnlineMessages(onlineMessages => [...onlineMessages, message])
        });

        socket.on('typing', login => {
            setTyping(() => login);
        });

        socket.on('stopTyping', login => {
            setTyping(() => '');
        });

        getAllRooms();
    }, [])

    useEffect(() => {
        const base = messagesFromBase.map((message, index) => ({
            sender: message.login,
            content: message.content
        }));

        setOnlineMessages(base);
    }, [messagesFromBase])

    const joinRoom = (login, roomId) => {
        socket.emit('joinRoom', { login, roomId });
    }

    const sendMessageToRoom = messageInfo => {
        socket.emit('sendMessage', messageInfo);
    };

    const keyPressing = (login, currentRoomId) => {
        socket.emit('typing', { login, roomId: currentRoomId });

        setTimeout(() => {
            socket.emit('stopTyping', { login, roomId: currentRoomId });
        }, 2000)
    }

    if (!isAuthenticated)
        return <Redirect to='/' />

    return (
        <div className="chatWrapper">
            <Profile userData={userData} />
            <div className="left">
                <div className="header">
                    <BurgerMenu />
                    <Search />
                </div>
                <Dialogs joinRoom={joinRoom} usersOnline={usersOnline} />
            </div>
            <div className="right">
                <div className="status">
                    <span className="name">Me<span className="blue">ss</span>enger</span>
                </div>
                <Messages onlineMessages={onlineMessages} typing={typing} />
                <Input sendMessageToRoom={sendMessageToRoom} keyPressing={keyPressing} />

            </div>
            {/* <p>Copyright © 2020  Dream team Group RI-370005. All rights reserved.</p> */}
        </div>
    );
}

Chat.propTypes = {
    getAllRooms: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    userData: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated,
    userData: state.login.userData,
    messagesFromBase: state.chat.messages
});

export default connect(mapStateToProps, { getAllRooms, setAlert })(Chat);