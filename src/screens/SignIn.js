import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import '../CSS/sign.css';


export default function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        // TODO: sign in action
        dispatch(signin(email, password));
    };
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);
    return (
        <div className='auth-wrapper'>
            <div className='auth-inner'>
                <form onSubmit={submitHandler}>
                    <h3>Sign In</h3>

                    <div className='form-group'>
                        <label >Email address</label>
                        <input
                            className='form-control'
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        ></input>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input
                            className='form-control'
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                    </div>



                    <button className='btn btn-primary btn-block' type="submit">
                        Sign In
          </button>
                    <p>
                        New customer? <Link to="/register">Create your account</Link>
                    </p>

                </form>
            </div>
        </div>
    );
}