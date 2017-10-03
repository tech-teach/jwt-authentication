/**
 * Will use some of the auth stuff.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './AuthConsumer.css';


class AuthConsumer extends Component {
    render() {
        return (
            <div className="uses-user">
                <div className="user-box">
                    <h3>Can trust user info</h3>
                    <pre>{JSON.stringify(this.props.user, null, '  ')}</pre>
                </div>
                <div className="user-box">
                    <h3>Can present to admins</h3>
                    {
                        this.props.user.is_admin && (
                            <button>Only for admins</button>
                        )
                    }
                </div>
            </div>
        )
    }
}


AuthConsumer.propTypes = {
    user: PropTypes.object.isRequired,
}


export default AuthConsumer;