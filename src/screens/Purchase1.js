import React, { Component } from 'react';
import Axios from 'axios';
import '../CSS/sign.css';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default class Purchase1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // username: '',
            // email: '',
            // password: '',
            fullName: "",
            BaddressCountry: "",
            BaddressCity: "",
            BaddressStreet: "",
            SaddressCountry: "",
            SaddressCity: "",
            SaddressStreet: "",
            SameAddress: true,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const fullName = this.state.fullName;
        const BaddressCountry = this.state.SaddressCountry;
        const BaddressCity = this.state.SaddressCity;
        const BaddressStreet = this.state.SaddressStreet;
        const SaddressCountry = this.state.SaddressCountry;
        const SaddressCity = this.state.SaddressCity;
        const SaddressStreet = this.state.SaddressStreet;

        const data = await Axios.post(`/purchase/step1`, { fullName: fullName, BaddressCountry: BaddressCountry, BaddressCity: BaddressCity, BaddressStreet: BaddressStreet, SaddressCountry: SaddressCountry, SaddressCity: SaddressCity, SaddressStreet: SaddressStreet, }, { withCredentials: true })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    this.props.history.push('/Purchase2');
                    window.location.reload();
                }
            })
            .catch((error) => {
                alert('User Not Logged in!');
                console.log(error);
            });
        console.log(data);
    };


    render() {
        const { fullName, BaddressCountry, BaddressCity, BaddressStreet, SaddressCountry, SaddressCity, SaddressStreet } = this.state;
        return (
            <>
                <div className="left">
                    <Link to='/cart'>
                        <div className="wherewernot">
                            CART
                </div>
                    </Link>
                    <div className="wherewernot" >
                        <FiArrowRight />
                    </div>
                    <Link to='/FormLogin'>
                        <div className="wherewernot">
                            SIGN IN
                </div>
                    </Link>
                    <div className="wherewernot" >
                        <FiArrowRight />
                    </div>

                    <div className="wherewer">
                        SHIPPING
                </div>

                    <div className="wherewewill">
                        <FiArrowRight />
                    </div>
                    <div className="wherewewill">
                        PAYMENT
           </div>
                </div>
                <div className='auth-wrapper'>
                    <div className='auth-inner'>
                        <form onSubmit={this.handleSubmit}>
                            <h3>Shipping address</h3>

                            <div className='form-group'>
                                <label>Name</label>
                                <input
                                    type='text'
                                    name='fullName'
                                    value={fullName}
                                    className='form-control'
                                    placeholder='Name'
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className='form-group'>
                                <label>Country</label>
                                <input
                                    // type='email'
                                    name='SaddressCountry'
                                    value={SaddressCountry}
                                    className='form-control'
                                    placeholder='Country'
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className='form-group'>
                                <label>City</label>
                                <input
                                    // type='password'
                                    name='SaddressCity'
                                    value={SaddressCity}
                                    className='form-control'
                                    placeholder='City'
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className='form-group'>
                                <label>Street</label>
                                <input
                                    // type='password'
                                    name='SaddressStreet'
                                    value={SaddressStreet}
                                    className='form-control'
                                    placeholder='Street'
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className='form-group'>
                                {/* <Checkbox label=" My billing and shipping address are the same" name='SameAddress' onChange={this.handleChange} ></Checkbox> */}
                                <input
                                    name="SameAddress"
                                    type="checkbox"
                                    checked={this.state.SameAddress}
                                    onChange={this.handleChange} />
                                <label> My billing and shipping address are the same</label>
                            </div>

                            <button type='submit' className='btn btn-primary btn-block'>
                                Next
            </button>

                        </form>
                    </div>
                </div >
            </>
        );
    }
}