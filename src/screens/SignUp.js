import React, { Component } from 'react';
import Axios from 'axios';
import '../CSS/sign.css';

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        const data = await Axios.post(`/register`, { email: email, password: password }, { withCredentials: true })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    this.props.history.push('/SignIn');
                    window.location.reload();
                }
            })
            .catch((error) => {
                alert('Wrong email or password!');
                console.log(error);
            });
        console.log(data);
    };


    render() {
        const { username, email, password } = this.state;
        return (
            <div className='auth-wrapper'>
                <div className='auth-inner'>
                    <form onSubmit={this.handleSubmit}>
                        <h3>Sign Up</h3>

                        <div className='form-group'>
                            <label>Username </label>
                            <input
                                type='text'
                                name='username'
                                value={username}
                                className='form-control'
                                placeholder='Username'
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label>Email address</label>
                            <input
                                type='email'
                                name='email'
                                value={email}
                                className='form-control'
                                placeholder='Enter email'
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label>Password</label>
                            <input
                                type='password'
                                name='password'
                                value={password}
                                className='form-control'
                                placeholder='Enter password'
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <button type='submit' className='btn btn-primary btn-block'>
                            Sign Up
            </button>
                        <p className='forgot-password text-right'>
                            Already registered? <a href='/signin'>Sign in</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}