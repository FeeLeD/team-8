import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllMessages, createChat, clearSearch, getAllRooms } from '../../actions/chat';


const Dialog = ({ createChat, clearSearch, getAllMessages, getAllRooms, user, users, roomId, userData, socket, usersOnline }) => {

    const joinRoom = (login, roomId) => {
        socket.emit('joinRoom', { login, roomId });
    }

    const onClick = e => {
        if (user) {
            createChat(userData._id, user._id).then(res => {
                getAllRooms();
                joinRoom(userData.login, roomId);
            });
            clearSearch();
        }
        else {
            getAllMessages(roomId);
            joinRoom(userData.login, roomId);
        }
    }

    return (
        <div className="dialog" onClick={e => onClick(e)}>
            <div className="avatar" />
            <div className="infoDialog">
                {
                    user ?
                        <Fragment>
                            <span className="name">{user.login}</span>
                            <span>Написать пользователю...</span>
                        </Fragment>
                        :
                        <Fragment>
                            {
                                users.map((user, index) =>
                                    <Fragment key={index} >
                                        <span className="name">{user.login}</span>
                                        {usersOnline.includes(user.login) ?
                                            <p className="online">online</p> :
                                            <p className="offline">offline</p>
                                        }
                                    </Fragment>
                                )
                            }
                        </Fragment>
                }
            </div>
        </div>
    );
};

Dialog.propTypes = {
    createChat: PropTypes.func.isRequired,
    getAllMessages: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    userData: state.login.userData
});

export default connect(mapStateToProps, { createChat, getAllMessages, clearSearch, getAllRooms })(Dialog);