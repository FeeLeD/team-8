import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtTypes from 'prop-types';
import { repeatSending } from '../actions/register';

import '../stylesheets/registerVer.css';
import mailImage from '../img/mail.svg';

const RegisterVer = ({ repeatSending, email, isAuthenticated }) => {
    const [ userEmail, setEmail ] = useState('');

    const onChange = e => setEmail(e.target.value);

    const onSubmit = e => {
        e.preventDefault();

        if (email !== '') {
            repeatSending(email);
        } else if (userEmail !== '') {
            repeatSending(userEmail);
        }
    }

    // Redirect 
    if (isAuthenticated)
        return <Redirect to="/messenger"/>

    return (
        <div className="RegVer">
            <div>
                <h1>Регистрация</h1>
                <h2>Подтверждение аккаунта</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <img className="mailImage" src={mailImage} alt="Письмо отправлено на почту"/>
                    {email ?
                        <Fragment>
                            <span className="center">Подтвердите свой аккаунт</span>
                            <span className="center">На вашу почту {email} отправлено письмо со ссылкой на подтверждение аккаунта.</span>
                            <button type="submit">Повторить отправку</button>
                        </Fragment>
                        :
                        <Fragment>
                            <span className="center">На указанную почту будет оптравлено письмо со ссылкой на подтверждение аккаунта</span>
                            <input
                                name="email"
                                type="email"
                                placeholder="Введите Ваш email"
                                value={userEmail}
                                onChange={e => onChange(e)}
                                required
                            />
                            <button type="submit">Повторить отправку</button>
                        </Fragment>
                    }

                </form>
                <p>Copyright © 2020  Dream team Group RI-370005. All rights reserved.</p>
            </div>
        </div>);
};

RegisterVer.propTypes = {
    repeatSending: ProtTypes.func.isRequired,
    email: ProtTypes.string.isRequired
};

const mapStateToProps = state => ({
    email: state.register.email,
    isAuthenticated: state.login.isAuthenticated
});

export default connect(mapStateToProps, { repeatSending })(RegisterVer);