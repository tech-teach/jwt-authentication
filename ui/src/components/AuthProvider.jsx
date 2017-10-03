/**
 * Provides authentication.
 */

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';

import AuthService from '../services/auth';
import './AuthProvider.css';


class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      user: null,
      error: null,
    };
  }

  useToken(token) {
    jwt.verify(token, this.props.publicKey, { algorithms: ['RS256'] }, (err, user) => {
      if (err) {
        localStorage.removeItem('token');
        this.setState({
          token: null,
          user: null,
          error: err,
        });
      } else {
        localStorage.setItem('token', token);
        this.setState({
          token,
          user,
          error: null
        })
      }
    })
  }

  componentDidMount() {
    // Look for the token in local storage
    this.useToken(localStorage.getItem('token'))
  }

  login(credentials) {
    // for now just set the token to whatever
    const auth = new AuthService();
    auth.login(credentials, token => this.useToken(token), () => this.useToken(null));
  }

  logout() {
    // for now just remove the token
    this.useToken(null);
  }

  renderButtons() {
    return (
      <div className="auth-buttons">
        <button onClick={() => this.login({ username: 'admin', password: 'admin' })} >
          login as admin
                </button>
        <button onClick={() => this.login({ username: 'user', password: 'user' })} >
          login as user
                </button>
        <button onClick={() => this.login({ username: 'user', password: 'not user' })} >
          use faulty credentials
                </button>
        <button onClick={() => this.useToken('faulty.token.signature')} >
          use faulty token
                </button>
        {this.state.user && (
          <button onClick={() => this.logout()} >
            logout
                    </button>
        )}
      </div>
    )
  }

  render() {
    if (this.state.token) {
      return (
        <div>
          <p onClick={this.logout.bind(this)}>A guy is authed</p>
          {this.renderButtons()}
          {this.props.children && (
            <div className="auth-children-container">
              {cloneElement(this.props.children, { user: this.state.user, token: this.state.token })}
            </div>
          )}
        </div>
      );
    }
    return (
      <div>
        <p>No one is here</p>
        {this.renderButtons()}
        <br />
        {
          this.state.error && (
            <div className="error-box">
              <pre>{JSON.stringify(this.state.error, null, '  ')}</pre>
            </div>
          )
        }
      </div>
    );
  }
}


AuthProvider.propTypes = {
  publicKey: PropTypes.string.isRequired,
  children: PropTypes.element,
}


export default AuthProvider;