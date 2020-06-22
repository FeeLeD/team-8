import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Message from './Message';

const Messages = ({ userData: { login }, onlineMessages, typing }) => {

    useEffect(() => {
        const messagesDiv = document.getElementById("messages");
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    })

    return (

        <div id="messages" className="messages">
            {
                onlineMessages.map((message, index) =>
                    <Message
                        key={index}
                        type={message.sender === login ? "outcomingLetterWrapper" : "incomingLetterWrapper"}
                        content={message.content}
                    />)
            }
            {
                typing !== '' && <p>{typing} печатает...</p>
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