import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setAuthToken from '../utils/setAuthToken';
import { getAllRooms, setOnlineMessage, addTyping, clearTyping } from '../actions/chat';
import io from "socket.io-client";
import { setAlert } from '../actions/alert';
import { makeDataFormatFrom } from '../utils/dataCorrector';

import Profile from './chat/Profile';
import BurgerMenu from './chat/BurgerMenu';
import Search from './chat/Search';
import Dialogs from './chat/Dialogs';
import Messages from './chat/Messages';
import Input from './chat/Input';
import Loading from './Loading';

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

const Chat = ({ getAllRooms, userData, loaded, messagesFromBase, setAlert, setOnlineMessage, addTyping, clearTyping }) => {
    const [baseMessages, setBaseMessages] = useState([]);

    useEffect(() => {
        socket = io(URL);
    }, [URL]);

    useEffect(() => {
        if (loaded) {
            const { login } = userData;
            socket.emit('join', { login });

            socket.on('join', login => {
                setAlert(`${login} присоединился к чату!`, 'success', 2000);
            });

            socket.on('message', message => {
                setOnlineMessage(message);

                if (message.sender !== userData.login)
                    setAlert(`${message.sender}: ${message.content}`, 'message', 4000);
            });

            socket.on('typing', ({ login, roomId }) => {
                addTyping({ login, roomId });

                setTimeout(() => clearTyping(), 1000);
            });

            socket.on('stopTyping', ({ login, roomId }) => {
                addTyping({ login, roomId });

                setTimeout(() => clearTyping(), 2000);
            });

            getAllRooms(rooms => {
                rooms.forEach(room => {
                    joinRoom(userData.login, room._id);
                });
            });
        }
    }, [loaded]);

    useEffect(() => {
        const base = messagesFromBase.map(message => ({
            sender: message.login,
            content: message.content,
            date: makeDataFormatFrom(message.date)
        }));

        setBaseMessages(base);
    }, [messagesFromBase])

    const joinRoom = (login, roomId) => {
        socket.emit('joinRoom', { login, roomId });
    }

    const sendMessageToRoom = messageInfo => {
        socket.emit('sendMessage', messageInfo);
    };

    const keyPressing = (login, currentRoomId) => {
        socket.emit('typing', { login, roomId: currentRoomId });
    }

    return (
        <Fragment>
            {
                loaded ?
                    <div className="chatWrapper">
                        <Profile userData={userData} />
                        <div className="left">
                            <div className="header">
                                <BurgerMenu />
                                <Search />
                            </div>
                            <Dialogs joinRoom={joinRoom} />
                        </div>
                        <div className="right">
                            <div className="status">
                                <span className="name">Me<span className="blue">ss</span>enger</span>
                            </div>
                            <Messages messagesFromBase={baseMessages} />
                            <Input sendMessageToRoom={sendMessageToRoom} keyPressing={keyPressing} />

                        </div>
                        {/* <p>Copyright © 2020  Dream team Group RI-370005. All rights reserved.</p> */}
                    </div>
                    :
                    <Loading />
            }
        </Fragment>
    );
}

Chat.propTypes = {
    getAllRooms: PropTypes.func.isRequired,
    setOnlineMessage: PropTypes.func.isRequired,
    addTyping: PropTypes.func.isRequired,
    clearTyping: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    userData: state.login.userData,
    currentRoomId: state.chat.currentRoomId,
    messagesFromBase: state.chat.messages,
    loaded: state.login.loaded
});

export default connect(mapStateToProps, { getAllRooms, setAlert, setOnlineMessage, addTyping, clearTyping })(Chat);