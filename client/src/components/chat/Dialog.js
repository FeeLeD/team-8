import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllMessages, createChat, clearSearch, getAllRooms, setActiveDialog, clearOnlineMessages } from '../../actions/chat';


const Dialog = ({ createChat, clearSearch, getAllMessages, getAllRooms, user, users, roomId, userData, joinRoom, id, activeDialogId, setActiveDialog, clearOnlineMessages }) => {

    const onClick = e => {
        clearOnlineMessages();
        if (user) {
            createChat(userData._id, user._id).then(res => {
                getAllRooms();
            });
            clearSearch();
        }
        else {
            setActiveDialog(id);
            getAllMessages(roomId);
            joinRoom(userData.login, roomId);
        }
    }

    return (
        <div id={id} className={id === activeDialogId ? "dialog active" : "dialog"} onClick={e => onClick(e)}>
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
                                        <p className="online">...</p>
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
    setActiveDialog: PropTypes.func.isRequired,
    clearOnlineMessages: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    userData: state.login.userData,
    activeDialogId: state.chat.activeDialogId
});

export default connect(mapStateToProps, { createChat, getAllMessages, clearSearch, getAllRooms, setActiveDialog, clearOnlineMessages })(Dialog);