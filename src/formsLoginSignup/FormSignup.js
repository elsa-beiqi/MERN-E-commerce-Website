import React, { useState, useEffect } from 'react';
import validate from './validateInfo';
// import useForm from './useForm';
import './Form.css';
import FormSuccess from './FormSuccess';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function FormSignup() {
  const history = useHistory();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    fullname: '',
    taxID: '',
    address: '',
    city: '',
    country: ''
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
  const authenticate = async () => {
    await axios.put(`/authenticate/sendemail`, { withCredentials: true })
    submitForm();
  }

  const register = async () => {
    console.log("hi")
    const data = await axios.post(`/register`, { email: values.email, password: values.password, userType: 1, fullName: values.fullname, taxID: values.taxID, address: values.address, city: values.city, country: values.country }, { withCredentials: true })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          history.push('/SignIn');
          window.location.reload();
          alert('User successfully signed up!')
          authenticate();
        }
      })
      .catch((error) => {
        alert(error.response.data);
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
      <div className='formf-container'>
        <div className='formf-content-right'>
          <form onSubmit={handleSubmit} className='formf' noValidate>
            <h1>
              Get started with us today! Create your account by filling out the
              information below.
            </h1>
            <div className='formf-inputs'>
              <label className='formf-label'>Full Name</label>
              <input
                className='formf-input'
                type='text'
                name='fullname'
                placeholder='Enter your full name'
                value={values.fullname}
                onChange={handleChange}
              />
              {errors.fullname && <p>{errors.fullname}</p>}
            </div>

            <div className='formf-inputs'>
              <label className='formf-label'>Email</label>
              <input
                className='formf-input'
                type='email'
                name='email'
                placeholder='Enter your email'
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>

            <div className='formf-inputs'>
              <label className='formf-label'>Tax ID</label>
              <input
                className='formf-input'
                type='text'
                name='taxID'
                placeholder='Enter your Tax ID'
                value={values.taxID}
                onChange={handleChange}
              />
              {errors.taxID && <p>{errors.taxID}</p>}
            </div>

            <div className='formf-inputs'>
              <label className='formf-label'>Address</label>
              <input
                className='formf-input'
                type='text'
                name='address'
                placeholder='Enter your Address'
                value={values.address}
                onChange={handleChange}
              />
              {errors.address && <p>{errors.address}</p>}
            </div>

            <div className='formf-inputs'>
              <label className='formf-label'>City</label>
              <input
                className='formf-input'
                type='text'
                name='city'
                placeholder='Enter your City'
                value={values.city}
                onChange={handleChange}
              />
              {errors.city && <p>{errors.city}</p>}
            </div>

            <div className='formf-inputs'>
              <label className='formf-label'>Country</label>
              <input
                className='formf-input'
                type='text'
                name='country'
                placeholder='Enter your Country'
                value={values.country}
                onChange={handleChange}
              />
              {errors.country && <p>{errors.country}</p>}
            </div>

            <div className='formf-inputs'>
              <label className='formf-label'>Password</label>
              <input
                className='formf-input'
                type='password'
                name='password'
                placeholder='Enter your password'
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <div className='formf-inputs'>
              <label className='formf-label'>Confirm Password</label>
              <input
                className='formf-input'
                type='password'
                name='password2'
                placeholder='Confirm your password'
                value={values.password2}
                onChange={handleChange}
              />
              {errors.password2 && <p>{errors.password2}</p>}
            </div>
            <button className='formf-input-btn' type='submit'>
              Sign up
            </button>
            <span className='formf-input-login'>
              Already have an account? Login
                {/* <a href='/FormLogin'>here</a> */}
              <Link to="/FormLogin"> here</Link>
            </span>
          </form>
        </div>

      </div>
    </>
  );
};


