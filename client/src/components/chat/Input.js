import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Input = ({ userData, currentRoomId, socket }) => {

    const [messageInfo, setMessageInfo] = useState({
        login: userData.login,
        message: '',
        roomId: currentRoomId
    });

    useEffect(() => {
        setMessageInfo({ ...messageInfo, login: userData.login, roomId: currentRoomId })
    }, [userData, currentRoomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (socket)
            socket.emit('sendMessage', messageInfo, () => setMessageInfo({ ...messageInfo, message: '' }));
    };

    if (currentRoomId === 0) {
        return (
            <div className="message">
                <form className="messageForm">
                    <input className="noRooms" placeholder="Выберите чат..." readOnly />
                </form>
            </div>
        )
    }

    return (
        <div className="message">
            <form className="messageForm">
                <input
                    name="writeMessage"
                    placeholder="Написать сообщение..."
                    value={messageInfo.message}
                    onChange={e => setMessageInfo({ ...messageInfo, message: e.target.value })}
                    onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                    type="text" />
                <button onClick={e => sendMessage(e)}>...</button>
            </form>
        </div>
    );
}

Input.propTypes = {
    userData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    userData: state.login.userData,
    currentRoomId: state.chat.currentRoomId
});

export default connect(mapStateToProps)(Input);