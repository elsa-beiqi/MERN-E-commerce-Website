import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/Order.css';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { signout } from '../actions/userActions';

export default function Cart() {
    const history = useHistory();
    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout());
        history.push(`/`);
        window.location.reload();
    };
    const [purchases, setpurchase] = useState([]);
    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get(`/purchase`, { withCredentials: true });
            setpurchase(data);
        }
        fecthData();
    }, []);
    const round = (value) => {
        const x = Number(value);
        return Number(x.toFixed(2));

    }
    const remove = async (id) => {
        await axios.delete(`/purchase/${id}`, { withCredentials: true })
            .then((response) => {
                console.log(response);
                alert("Your order has been cancelled!")
            })
            .catch((error) => {
                alert(error.response.data);
                console.log(error);
            });
    }
    const userSignin = useSelector((state) => state.userSignin);
    const { username, useremail, useraddress, usercity, usercountry } = userSignin;
    return (
        <div>

            <div className='px-2 px-lg-0'>
                <div className='container text-black pt-5 pb-2 text-left'>
                    <h3 className='display-4' style={{ fontSize: '2rem', textDecoration: 'none', fontWeight: 540, color: "#3b3d46" }}>
                        Account
                    </h3>
                    <div>
                        <Button variant="light" className='order-subtitle darkX remove' onClick={signoutHandler}>Sign out</Button>

                    </div>
                </div>
            </div>


            <div className={'order-section'}  >
                <div className='container'>
                    <div
                        className='rowO order-row'
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <div className='colx'>
                            <div className='order-text-wrapper'>
                                <h5 className={'headingO darkO'}>
                                    {username}
                                </h5>
                                <p className={'order-light'} >
                                    {useremail}
                                </p>
                                <p className={'order-subtitle darkO'} >
                                    {useraddress}
                                </p>
                                <p className={'order-subtitle darkO'} >
                                    {usercity}
                                </p>
                                <p className={'order-subtitle darkO'} >
                                    {usercountry}
                                </p>
                            </div>

                        </div>
                        <div className='coly'>
                            <div className='container'>
                                <div
                                    className='rowO order-row'
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <h5 className={'headingO darkO someweird'}>
                                        Order History
                                </h5>
                                </div>
                            </div>
                            <div className='container'>
                                <div
                                    className='rowO order-row'
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <div className='colS'>
                                        <div className='order-text-wrapper'>
                                            <p className={'order-up '} >
                                                ORDER
                                </p>
                                        </div>
                                    </div>
                                    <div className='colA'>
                                        <div className='order-text-wrapper'>
                                            <p className={'order-up '} >
                                                DATE
                                </p>
                                        </div>
                                    </div>
                                    <div className='colA'>
                                        <div className='order-text-wrapper'>
                                            <p className={'order-up '} >
                                                STATUS
                                </p>
                                        </div>
                                    </div>
                                    <div className='colA'>
                                        <div className='order-text-wrapper'>
                                            <p className={'order-up '} >
                                                TOTAL
                                </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='dividerO'>
                            </div>
                            {purchases.map((order) =>
                                <div className='container' key={order._id}>
                                    <div
                                        className='rowO order-row'
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        {(order.status === 'processing') ?
                                            <div className='colS'>
                                                <div className='order-text-wrapper'>
                                                    <Link to={`/Invoice/${order._id}`}>
                                                        <p className={'order-subtitle darkI'} >
                                                            {order._id}
                                                        </p>
                                                    </Link>
                                                </div>
                                            </div>
                                            :
                                            <div className='colS'>
                                                <div className='order-text-wrapper'>
                                                    <p className={'order-subtitle darkI'} >
                                                        {order._id}
                                                    </p>
                                                </div>
                                            </div>

                                        }

                                        <div className='colA'>
                                            <div className='order-text-wrapper'>
                                                <p className={'order-subtitle darkO'} >
                                                    {order.date.substring(0, 10)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='colA'>
                                            <div className='order-text-wrapper'>
                                                <p className={'order-subtitle darkO'} >
                                                    {order.status}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='colA'>
                                            <div className='order-text-wrapper'>
                                                <p className={'order-subtitle darkO'} >
                                                    ${round(order.total)}
                                                </p>
                                            </div>
                                        </div>
                                        {/* {(order.status === 'processing') ?
                                            <div className='colV'>
                                                <div className='order-text-wrapperX'>
                                                    <Button variant="light" className=' order-subtitle darkX remove' onClick={() => remove(order._id)}>cancel order</Button>
                                                </div>
                                            </div> : <> </>
                                        } */}

                                    </div>
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>




    );
}


