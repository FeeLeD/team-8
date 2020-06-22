import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';
import { getAllRooms } from '../actions/chat';
import io from "socket.io-client";

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

const URL = 'https://team-8-messenger.herokuapp.com/';

let socket;

const Chat = ({ getAllRooms, isAuthenticated, userData, location }) => {
    const [usersOnline, updateUsersOnline] = useState([]);

    useEffect(() => {
        socket = io(URL);
    }, [URL, location.search])

    useEffect(() => {
        const { login } = userData;
        if (login)
            socket.emit('join', { login }, () => { });

        socket.on('join', login => {
            updateUsersOnline([...usersOnline, login]);
        });

        getAllRooms();
    }, [])

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
                <Dialogs socket={socket} usersOnline={usersOnline}/>
            </div>
            <div className="right">
                <div className="status">
                    <span className="name">Me<span className="blue">ss</span>enger</span>
                </div>
                <div className="main">
                    <Messages socket={socket} />
                    <Input socket={socket} />
                </div>
            </div>
            {/* <p>Copyright © 2020  Dream team Group RI-370005. All rights reserved.</p> */}
        </div>
    );
}

Chat.propTypes = {
    getAllRooms: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    userData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated,
    userData: state.login.userData
});

export default connect(mapStateToProps, { getAllRooms })(Chat);