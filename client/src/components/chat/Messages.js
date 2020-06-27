import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearOnlineMessages } from '../../actions/chat';

import Message from './Message';

const Messages = ({ userData: { login }, messagesFromBase, onlineMessages, clearOnlineMessages, currentRoomId, typings }) => {

    useEffect(() => {
        const messagesDiv = document.getElementById("messages");
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    })


    if (onlineMessages.length > 0) {
        onlineMessages.forEach(message => {
            if (message.roomId === currentRoomId) {
                messagesFromBase.push(message);
            }
        })

        clearOnlineMessages();        
    }

    return (
        <Fragment>
            <div id="messages" className="messages">
                {
                    messagesFromBase.map((message, index) =>
                        <Message
                            key={index}
                            type={message.sender === login && "outcomingLetterWrapper"}
                            login={message.sender === login ? "Вы" : message.sender}
                            content={message.content}
                            date={message.date}
                        />)
                }
            </div>
            <div className="typing-container">
                {
                    (typings && typings.length > 0) &&
                    typings.map((user, index) => {
                        if (user.roomId === currentRoomId && user.login !== login)
                            return <p key={index} className="typing">{user.login} печатает...</p>
                    })
                }
            </div>
        </Fragment>
    );
}

Messages.propTypes = {
    clearOnlineMessages: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    userData: state.login.userData,
    onlineMessages: state.chat.onlineMessages,
    currentRoomId: state.chat.currentRoomId,
    typings: state.chat.typings
});

export default connect(mapStateToProps, { clearOnlineMessages })(Messages);