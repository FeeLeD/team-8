import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/login';
import { clearChatState } from '../../actions/chat';
import { Link } from 'react-router-dom';

const BurgerMenu = ({ logout, clearChatState }) => {

    const onClick = e => {
        e.preventDefault();
        logout();
        clearChatState();
    }

    return (
        <div className="menu">
            <div className="menuButton">
                <div className="lines"></div>
                <div className="lines"></div>
                <div className="lines"></div>
            </div>
            <div className="dropdown-content">
                <a href="#profile">Мой профиль</a>
                <a onClick={e => onClick(e)}>Выход</a>
            </div>
        </div>
    );
}

BurgerMenu.propTypes = {
    logout: PropTypes.func.isRequired,
    clearChatState: PropTypes.func.isRequired
};

export default connect(null, { logout, clearChatState })(BurgerMenu);