import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMessage } from '../../actions/chat';
import { makeDateFromNow } from '../../utils/dataCorrector';

const Input = ({ userData, currentRoomId, sendMessageToRoom, addMessage, keyPressing }) => {

    const [messageInfo, setMessageInfo] = useState({
        login: userData.login,
        message: '',
        roomId: currentRoomId,
        date: makeDateFromNow()
    });

    useEffect(() => {
        setMessageInfo({ ...messageInfo, login: userData.login, roomId: currentRoomId })
    }, [userData, currentRoomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (messageInfo.message !== '') {
            setMessageInfo({ ...messageInfo, date: makeDateFromNow() });
            addMessage({ chatId: currentRoomId, login: userData.login, content: messageInfo.message });
            sendMessageToRoom(messageInfo);
            setMessageInfo({
                login: userData.login,
                message: '',
                roomId: currentRoomId,
                date: makeDateFromNow()
            })
        }
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
        <div id="message" className="message">
            <form className="messageForm">
                <input
                    name="writeMessage"
                    placeholder="Написать сообщение..."
                    value={messageInfo.message}
                    onChange={e => setMessageInfo({ ...messageInfo, message: e.target.value })}
                    onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : keyPressing(userData.login, currentRoomId)}
                    type="text" />
                <button onClick={e => sendMessage(e)}>...</button>
            </form>
        </div>
    );
}

Input.propTypes = {
    userData: PropTypes.object.isRequired,
    addMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    userData: state.login.userData,
    currentRoomId: state.chat.currentRoomId
});

export default connect(mapStateToProps, { addMessage })(Input);