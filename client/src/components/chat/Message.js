import React from 'react';

const Message = ({ type, login, content, date }) => {
    return (
        <div className={"letter " + type}>
            <div className="avatar" />
            <div className="content">
                <span className="message-info">{login}</span>
                <span>{content}</span>
                <span className="message-info">{date}</span>
            </div>
        </div>
    );
}

export default Message;