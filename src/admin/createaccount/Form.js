import React, { useState, useEffect } from 'react';
import validate from '../../formsLoginSignup/validateInfo';
import '../../formsLoginSignup/Form2.css';
import FormSuccess from '../../formsLoginSignup/FormSuccess';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function FormSignup() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
        password2: '',
        userType: 1,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
    };

    const register = async () => {
        console.log("hi")
        const data = await axios.post(`/admin/createaccount`, { email: values.email, password: values.password, userType: values.userType }, { withCredentials: true })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    // this.props.history.push('/SignIn');
                    // window.location.reload();
                }
                alert(response.data);
            })
            .catch((error) => {
                alert(error);
                console.log(error);
            });
        console.log(data);
    }
    useEffect(
        () => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                // submitForm();
                register();
            }
        },
        [errors]
    );


    function submitForm() {
        setIsSubmitted(true);
    }
    return (
        <>
            <div className='formA-container'>
                {/* <div className='formL-content-left'>
                    <img className='formf-img' src='img/welcome.png' alt='welcome' /> 
                </div> */}
                {!isSubmitted ? (
                    <div className='formA-content'>

                        <form onSubmit={handleSubmit} className='formL' noValidate>
                            {/* <h1>
                                user type 1: customer
                            </h1>
                            <h1>
                                user type 2: sales manager
                            </h1>
                            <h1>
                                user type 3: product manager
                            </h1>
                            <h1>
                                user type 4: admin
                            </h1> */}
                            <div className='formL-inputs'>
                                <label className='formL-label'>Email</label>
                                <input
                                    className='formL-input'
                                    type='email'
                                    name='email'
                                    placeholder='Enter your email'
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p>{errors.email}</p>}
                            </div>

                            <div className='formL-inputs'>
                                <label className='formL-label'>User Type</label>
                                <select value={values.userType} className='formL-input' onChange={handleChange}>
                                    <option value={2}>Sales Manager</option>
                                    <option value={3}>Product Manager</option>
                                    <option value={4}>Admin</option>
                                </select>
                            </div>

                            <div className='formL-inputs'>
                                <label className='formL-label'>Password</label>
                                <input
                                    className='formL-input'
                                    type='password'
                                    name='password'
                                    placeholder='Enter your password'
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <p>{errors.password}</p>}
                            </div>
                            <div className='formL-inputs'>
                                <label className='formL-label'>Confirm Password</label>
                                <input
                                    className='formL-input'
                                    type='password'
                                    name='password2'
                                    placeholder='Confirm your password'
                                    value={values.password2}
                                    onChange={handleChange}
                                />
                                {errors.password2 && <p>{errors.password2}</p>}
                            </div>
                            <button className='formA-input-btn' type='submit'>
                                Create Account
            </button>
                        </form>
                    </div>
                ) : (
                        <FormSuccess />
                    )}
            </div>
        </>
    );
};


