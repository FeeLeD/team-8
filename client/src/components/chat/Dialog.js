import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllMessages, createChat, clearSearch, getAllRooms, setActiveDialog } from '../../actions/chat';


const Dialog = ({ createChat, clearSearch, getAllMessages, getAllRooms, user, users, roomId, userData, joinRoom, usersOnline, id, activeDialogId, setActiveDialog }) => {

    const onClick = e => {
        setActiveDialog(id);
        if (user) {
            createChat(userData._id, user._id).then(res => {
                getAllRooms();
            });
            clearSearch();
        }
        else {
            getAllMessages(roomId);
            joinRoom(userData.login, roomId);
        }
    }

    return (
        <div id={id} className={ id === activeDialogId ? "dialog active" : "dialog" } onClick={e => onClick(e)}>
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
    clearSearch: PropTypes.func.isRequired,
    setActiveDialog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    userData: state.login.userData,
    activeDialogId: state.chat.activeDialogId
});

export default connect(mapStateToProps, { createChat, getAllMessages, clearSearch, getAllRooms, setActiveDialog })(Dialog);