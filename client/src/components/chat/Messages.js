import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Message from './Message';

const Messages = ({ userData: { _id, login }, socket }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (socket) {
            socket.on('message', message => {
                setMessages([...messages, message])
            });
        }
    }, [messages]);

    return (
        <div className="messages">
            {
                messages.map((message, index) =>
                    <Message
                        key={index}
                        type={message.sender === login ? "outcomingLetterWrapper" : "incomingLetterWrapper"}
                        content={message.content}
                    />
                )
            }
        </div>
    );
}

Messages.propTypes = {
    messages: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    messages: state.chat.messages,
    userData: state.login.userData,
});

export default connect(mapStateToProps)(Messages);