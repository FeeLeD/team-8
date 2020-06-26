import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Message from './Message';

const Messages = ({ userData: { login }, formMessageData, typing }) => {

    useEffect(() => {
        const messagesDiv = document.getElementById("messages");
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    })

    return (
        <div id="messages" className="messages">
            {
                formMessageData().map((message, index) =>
                    <Message
                        key={index}
                        type={message.sender === login && "outcomingLetterWrapper"}
                        login={message.sender === login ? "Вы" : message.sender}
                        content={message.content}
                        date={message.date}
                    />)
            }
            {
                (typing !== '' && typing !== login) && <p className="typing">{typing} печатает...</p>
            }
        </div>
    );
}

Messages.propTypes = {
    messages: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    userData: state.login.userData
});

export default connect(mapStateToProps)(Messages);