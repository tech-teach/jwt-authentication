/**
 * Will use some of the auth stuff.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './AuthConsumer.css';

import Service from '../services/service';


class AuthConsumer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            protected: null,
            secret: null,
        }
    }

    getProtected() {
        const service = new Service(this.props.token);
        service.getProtected(
            res => this.setState({protected: res}),
            err => this.setState({protected: err})
        );
    }

    getSecret() {
        const service = new Service(this.props.token);
        service.getSecret(
            res => this.setState({secret: res}),
            err => this.setState({secret: err})
        );
    }

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
                <div className="user-box">
                    <h3>Can communicate with other services</h3>
                    <button onClick={this.getProtected.bind(this)}>Get protected</button>
                    <pre>{JSON.stringify(this.state.protected, null, '  ')}</pre>
                </div>
                <div className="user-box">
                    <h3>Can communicate with other services</h3>
                    <button onClick={this.getSecret.bind(this)}>Get secret</button>
                    <pre>{JSON.stringify(this.state.secret, null, '  ')}</pre>
                </div>
            </div>
        )
    }
}


AuthConsumer.propTypes = {
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
}


export default AuthConsumer;