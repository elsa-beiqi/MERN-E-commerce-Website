// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { signin } from '../actions/userActions';
// import Axios from 'axios';
// import '../CSS/sign.css';
// // import Home from './Home';


// export default function SignIn(props) {

//     const [email, setemail] = useState("");
//     const [password, setpassword] = useState("");

//     const redirect = props.location.search
//         ? props.location.search.split('=')[1]
//         : '/';
//     const userSignin = useSelector((state) => state.userSignin);
//     const { userInfo, error } = userSignin;

//     const dispatch = useDispatch();

//     // handleSuccessfulLogin(data) {
//     //     this.props.handleSubmit(data);
//     //     this.props.history.push('../');
//     // }

//     useEffect(() => {
//         if (userInfo) {
//             props.history.push(redirect);
//         }
//     }, [props.history, redirect, userInfo]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(signin(email, password));
//         // await Axios.post(`/login`, { email: email, password: password }, { withCredentials: true })
//         //     .then((response) => {
//         //         if (response.status === 200) {
//         //             this.props.history.push('/home');
//         //             window.location.reload();
//         //         }
//         //     })
//         //     .catch((error) => {
//         //         alert('Wrong email or password!');
//         //         console.log(error);
//         //     });

//     };
//     return (
//         <div className='auth-wrapper'>
//             <div className='auth-inner'>
//                 <form>
//                     <h3>Sign In</h3>

//                     <div className='form-group'>
//                         <label>Email</label>
//                         <input
//                             type='email'
//                             className='form-control'
//                             placeholder='Enter email'
//                             value={email}
//                             onChange={(event) => { setemail(event.target.value) }}
//                             required
//                         />
//                     </div>

//                     <div className='form-group'>
//                         <label>Password</label>
//                         <input
//                             type='password'
//                             className='form-control'
//                             placeholder="Enter a password with at least 8 characters"
//                             required pattern="([0-9a-zA-Z]*).{8,}"
//                             value={password}
//                             onChange={(event) => { setpassword(event.target.value) }}
//                         />
//                     </div>

//                     <button
//                         type='submit'
//                         onClick={handleSubmit()}
//                         className='btn btn-primary btn-block'
//                     >
//                         Submit
//             </button>

//                     <p className='forgot-password text-right'>
//                         Don't have an account? <a href='/signup'>Sign up</a>
//                     </p>
//                 </form>
//             </div>
//         </div>
//     );
// }

import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import Axios from 'axios';
import '../CSS/sign.css';
import Home from './Home';


export default class SignIn extends Component {
    constructor(props) {
        super(props);
        //this.handleClick = this.handleClick.bind(this);
        this.state = {
            email: '',
            password: '',
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    };

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    handleSuccessfulLogin(data) {
        this.props.handleSubmit(data);
        this.props.history.push('../');
    }

    handleSubmit = async (event) => {



        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        await Axios.post(`/login`, { email: email, password: password }, { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {

                    this.props.history.push('/home');
                    window.location.reload();
                }
            })
            .catch((error) => {
                alert('Wrong email or password!');
                console.log(error);
            });
    };

    render() {
        return (
            <div className='auth-wrapper'>
                <div className='auth-inner'>
                    <form>
                        <h3>Sign In</h3>

                        <div className='form-group'>
                            <label>Email</label>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Enter email'
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label>Password</label>
                            <input
                                type='password'
                                className='form-control'
                                placeholder="Enter a password with at least 8 characters"
                                required pattern="([0-9a-zA-Z]*).{8,}"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                            />
                        </div>

                        <button
                            type='submit'
                            onClick={this.handleSubmit}
                            className='btn btn-primary btn-block'
                        >
                            Submit
            </button>

                        <p className='forgot-password text-right'>
                            Don't have an account? <a href='/signup'>Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}