import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import Axios from 'axios';
import { Row } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { purItems } from '../actions/cartActions';
import { FiArrowRight } from 'react-icons/fi'

export default function PaymentForm() {
    const [cvc, setcvc] = useState('');
    const [expiry, setexpiry] = useState('');
    const [focus, setfocus] = useState('');
    const [name, setname] = useState('');
    const [number, setnumber] = useState('')
    const history = useHistory();
    const dispatch = useDispatch();



    const invoice = async (event) => {
        console.log('HELLO')
        await Axios.get(`/purchase/sendinvoice`, { withCredentials: true })
            .then((response) => {
                console.log(response.data.fullName);
                if (response.status === 200) {
                    console.log(response.data);
                    history.push(`/Invoice/${response.data.invoiceid}`);
                    window.location.reload();
                }
            })
    }

    const handleSubmit = async (event) => {
        console.log("hi")
        event.preventDefault();

        const data = await Axios.post(`/purchase/step2`, { CardNumber: number, Date: expiry, PIN: cvc, CardName: name }, { withCredentials: true })
            .then((response) => {
                dispatch(purItems());
                console.log(response);
                if (response.status === 200) {

                    invoice();
                }
            })
            .catch((error) => {
                alert(error.response.data);
            });
    };

    return (<>
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
            <Link to='Purchase1'>
                <div className="wherewernot">
                    SHIPPING
                </div>
            </Link>
            <div className="wherewernot">
                <FiArrowRight />
            </div>
            <div className="wherewer">
                PAYMENT
           </div>
        </div>
        <div className='auth-wrapper'  >
            <div className='auth-inner'  >


                <Cards
                    cvc={cvc}
                    expiry={expiry}
                    focused={focus}
                    name={name}
                    number={number}
                />
                <form className="purchasetwo">

                    <div className='form-g topspace'>
                        <input
                            type="tel"
                            name="name"
                            placeholder="Name "
                            onChange={(e) => setname(e.target.value)}
                            onFocus={(e) => setfocus(e.target.name)}
                            className="PI1"
                        />
                    </div>

                    <div className='form-g'>
                        <input
                            type="tel"
                            name="number"
                            placeholder="Card Number"
                            onChange={(e) => setnumber(e.target.value)}
                            onFocus={(e) => setfocus(e.target.name)}
                            className="PI1"
                        />
                    </div>
                    <Row className="PI2R">
                        <div className='form-g'>
                            <input
                                type="tel"
                                name="expiry"
                                placeholder="Valid Thru"
                                onChange={(e) => setexpiry(e.target.value)}
                                onFocus={(e) => setfocus(e.target.name)}
                                className="PI2"
                            />
                        </div>
                        <div className='PI2RS'></div>
                        <div className='form-g'>
                            <input
                                type="tel"
                                name="cvc"
                                placeholder="CVC"
                                onChange={(e) => setcvc(e.target.value)}
                                onFocus={(e) => setfocus(e.target.name)}
                                className="PI2"
                            />
                        </div>
                    </Row>
                    <button type='submit' onClick={handleSubmit} className='btn btn-primary btn-block topspace'>
                        Complete Your Order
                    </button>

                </form>

            </div>
        </div >
    </>
    );
}

// export default class PaymentForm extends React.Component {
//     state = {
//         cvc: '',
//         expiry: '',
//         focus: '',
//         name: '',
//         number: '',
//     };
//     invoice = async (event) => {
//         console.log('HELLO')
//         await Axios.get(`/purchase/sendinvoice`, { withCredentials: true })
//             .then((response) => {
//                 console.log(response.data.fullName);
//                 if (response.status === 200) {
//                     console.log(response.data);
//                     this.props.history.push(`/Invoice/${response.data.fullName}/${response.data.BaddressCountry}/${response.data.BaddressCity}/${response.data.BaddressStreet}/${response.data.SaddressCountry}/${response.data.SaddressCity}/${response.data.SaddressStreet}/${response.data.SaddressDate}/${response.data.date}/${response.data.dateString}/${response.data.invoiceid}`);
//                     window.location.reload();
//                 }
//             })
//     }

//     handleInputFocus = (e) => {
//         this.setState({ focus: e.target.name });
//     }

//     handleInputChange = (e) => {
//         const { name, value } = e.target;

//         this.setState({ [name]: value });
//     }

//     handleSubmit = async (event) => {
//         console.log("hi")
//         event.preventDefault();
//         const cvc = this.state.cvc;
//         const expiry = this.state.expiry;
//         const name = this.state.name;
//         const number = this.state.number;

//         const data = await Axios.post(`/purchase/step2`, { CardNumber: number, Date: expiry, PIN: cvc, CardName: name }, { withCredentials: true })
//             .then((response) => {
//                 console.log(response);
//                 if (response.status === 200) {
//                     this.invoice();
//                 }
//             })
//             .catch((error) => {
//                 alert('User Not Logged in!');
//                 console.log(error);
//             });
//     };

//     render() {
//         return (

//             <div className='auth-wrapper'  >
//                 <div className='auth-inner'  >


//                     <Cards
//                         cvc={this.state.cvc}
//                         expiry={this.state.expiry}
//                         focused={this.state.focus}
//                         name={this.state.name}
//                         number={this.state.number}
//                     />
//                     <form onSubmit={this.handleSubmit} className="purchasetwo">

//                         <div className='form-g topspace'>
//                             <input
//                                 type="tel"
//                                 name="name"
//                                 placeholder="Name "
//                                 onChange={this.handleInputChange}
//                                 onFocus={this.handleInputFocus}
//                                 className="PI1"
//                             />
//                         </div>

//                         <div className='form-g'>
//                             <input
//                                 type="tel"
//                                 name="number"
//                                 placeholder="Card Number"
//                                 onChange={this.handleInputChange}
//                                 onFocus={this.handleInputFocus}
//                                 className="PI1"
//                             />
//                         </div>
//                         <Row className="PI2R">
//                             <div className='form-g PI2R1 space'>
//                                 <input
//                                     type="tel"
//                                     name="expiry"
//                                     placeholder="Valid Thru"
//                                     onChange={this.handleInputChange}
//                                     onFocus={this.handleInputFocus}
//                                     className="PI2"
//                                 />
//                             </div>

//                             <div className='form-g PI2R1'>
//                                 <input
//                                     type="tel"
//                                     name="cvc"
//                                     placeholder="CVC"
//                                     onChange={this.handleInputChange}
//                                     onFocus={this.handleInputFocus}
//                                     className="PI2"
//                                 />
//                             </div>
//                         </Row>
//                         <button type='submit' className='btn btn-primary btn-block'>
//                             Complete Your Order
//                             </button>

//                     </form>

//                 </div>
//             </div >
//         );
//     }
// }
