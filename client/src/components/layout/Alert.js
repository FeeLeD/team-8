import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//CSS
import '../../stylesheets/alert.css';

const Alert = ({ alerts }) => (
    alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            <p>{ alert.message }</p>
        </div>
    ))
)

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);