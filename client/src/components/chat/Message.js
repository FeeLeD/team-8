import React from 'react';

const Message = ({ type, content }) => {
    return (
        <div className={type}>
            <div className="avatar" />
            <div className="inLetter">
                <span>{content}</span>
            </div>
        </div>
    );
}

export default Message;