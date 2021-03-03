import React, { Component } from 'react'
import { signUpUser } from '../api-utils.js';

export default class SignUpPage extends Component {
    state = {
        email: '',
        password: ''
    }

    handleEmailChange = (e) => this.setState({ email: e.target.value })

    handlePasswordChange = (e) => this.setState({ password: e.target.value })

    handleOnSubmit = async e => {
        e.preventDefault();

        const user = await signUpUser(this.state.email, this.state.password);

        this.props.handleUserChange(user);

        this.props.history.push('/to-dos');
    }

    render() {
        return (
            <div className='Signup'>
                <h3>Sign Up!</h3>
                <form onSubmit={this.handleOnSubmit}>
                    <label>
                        <h5>Your Email: </h5>
                        <input value={this.state.email} onChange={this.handleEmailChange} />
                    </label>
                    <label>
                        <h5>Enter Password: </h5>
                        <input value={this.state.password} onChange={this.handlePasswordChange} />
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}
