import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/Order.css';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export default function Invoice() {
    const [yok, setyok] = useState(false);
    const [purchases, setpurchase] = useState([]);
    const [detail, setdetail] = useState([])
    const { id } = useParams();
    const [refunds, setrefunds] = useState([])


    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get(`/purchase/refunds/${id}`, { withCredentials: true });
            console.log(data);
            setrefunds(data.products);
            // setdetail(data[0]);
        }
        const fecthData2 = async () => {
            const { data } = await axios.get(`/purchase/${id}`, { withCredentials: true });
            console.log(data);
            setpurchase(data[0].products);
            setdetail(data[0]);
        }
        fecthData();
        fecthData2();
    }, []);
    const round = (value, qty) => {
        const x = Number(value);
        const y = Number(qty);
        const z = x * y;
        return Number(z.toFixed(2));

    }
    const returnz = async (idd, qty) => {
        await axios.delete(`/purchase/${id}/${idd}/${qty}`, { withCredentials: true })
            .then((response) => {
                console.log(response);
                alert("Your return request has been sent!")
            })
            .catch((error) => {
                alert(error.response.data);
                console.log(error);
            });
    }

    const remove = async (id) => {
        await axios.delete(`/purchase/${id}`, { withCredentials: true })
            .then((response) => {
                console.log(response);
                alert("Your order has been cancelled!")
                setyok(true);
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
                    <h3 className='display-4' style={{ fontSize: '24px', textDecoration: 'none', fontWeight: 600, color: "#3b3d46" }}>
                        ORDER #{id}
                    </h3>
                    <div className={'headingK darkO'}>
                        Order placed on: {detail.date}
                    </div>
                    <div className={'headingK darkO'}>
                        Order status: {detail.status}
                    </div>
                    {(detail.status === 'processing') ? <div>
                        <Button variant="light" className=' order-subtitle darkX remove' onClick={() => remove(detail._id)}>cancel order</Button>
                    </div> : <></>}

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
                                    Shipping address
                                </h5>
                                <p className={'order-subtitle darkO'} >
                                    {username}
                                </p>
                                <p className={'order-subtitle darkO'} >
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
                                <h5 className={'headingO darkO somesbace'}>
                                    Billing address
                                </h5>
                                <p className={'order-subtitle darkO '} >
                                    {username}
                                </p>
                                <p className={'order-subtitle darkO'} >
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
                                        Order detail
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
                                    <div className='colR'>
                                        <div className='order-text-wrapper'>
                                            <p className={'order-up '} >
                                                PRODUCT
                                </p>
                                        </div>
                                    </div>
                                    <div className='colV'>
                                        <div className='order-text-wrapper'>
                                            <p className={'order-up '} >
                                                PRICE
                                </p>
                                        </div>
                                    </div>
                                    <div className='colV'>
                                        <div className='order-text-wrapper'>
                                            <p className={'order-up '} >
                                                QUANTITY
                                </p>
                                        </div>
                                    </div>
                                    <div className='colV'>
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
                                        <div className='colR'>
                                            <div className='order-text-wrapper'>
                                                <a href={`/product/${order._id}`}>
                                                    <div className=''
                                                        display='flex' >
                                                        <img className='photo_new' src={order.onlineImageLink} /> </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className='colV'>
                                            <div className='order-text-wrapper'>
                                                <p className={'order-subtitle darkO'} >
                                                    ${round(order.PriceatPurchase, 1)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='colV'>
                                            <div className='order-text-wrapper'>
                                                <p className={'order-subtitle darkO'} >
                                                    {order.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='colV'>
                                            <div className='order-text-wrapper'>
                                                <p className={'order-subtitle darkO'} >
                                                    ${round(order.PriceatPurchase, order.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                        {(order.status === 'delivered' && !yok) ?
                                            <div className='colV'>
                                                <div className='order-text-wrapperX'>
                                                    <Button variant="light" className=' order-subtitle darkX remove' onClick={() => returnz(order._id, order.quantity)}>return order</Button>
                                                </div>
                                            </div> : <> </>
                                        }
                                    </div>
                                </div>)}
                            <div className='dividerO'>
                            </div>
                            <div className='container'>
                                <div
                                    className='rowO order-row'
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <div className='colR'>
                                        <div className='order-text-wrapper'>
                                            <p className={'order-up '} >
                                                Total
                                </p>
                                        </div>
                                    </div>
                                    <div className='colV'>
                                        <div className='order-text-wrapper'>

                                        </div>
                                    </div>
                                    <div className='colV'>
                                        <div className='order-text-wrapper'>

                                        </div>
                                    </div>
                                    <div className='colV'>
                                        <div className='order-text-wrapper'>
                                            <p className={'order-up '} >
                                                ${round(detail.total, 1)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>






                            {/* 
                            {(refunds.length > 0) ?
                                <div className='container'>
                                    <div
                                        className='rowO order-row'
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <h5 className={'headingO darkO someweird'}>
                                            Order detail
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
                                        <div className='colR'>
                                            <div className='order-text-wrapper'>
                                                <p className={'order-up '} >
                                                    PRODUCT
 </p>
                                            </div>
                                        </div>
                                        <div className='colV'>
                                            <div className='order-text-wrapper'>
                                                <p className={'order-up '} >
                                                    PRICE
 </p>
                                            </div>
                                        </div>
                                        <div className='colV'>
                                            <div className='order-text-wrapper'>
                                                <p className={'order-up '} >
                                                    QUANTITY
 </p>
                                            </div>
                                        </div>
                                        <div className='colV'>
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
                                            <div className='colR'>
                                                <div className='order-text-wrapper'>
                                                    <a href={`/product/${order._id}`}>
                                                        <div className=''
                                                            display='flex' >
                                                            <img className='photo_new' src={order.onlineImageLink} /> </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className='colV'>
                                                <div className='order-text-wrapper'>
                                                    <p className={'order-subtitle darkO'} >
                                                        ${round(order.PriceatPurchase, 1)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='colV'>
                                                <div className='order-text-wrapper'>
                                                    <p className={'order-subtitle darkO'} >
                                                        {order.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='colV'>
                                                <div className='order-text-wrapper'>
                                                    <p className={'order-subtitle darkO'} >
                                                        ${round(order.PriceatPurchase, order.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                            {(order.status === 'delivered' && !yok) ?
                                                <div className='colV'>
                                                    <div className='order-text-wrapperX'>
                                                        <Button variant="light" className=' order-subtitle darkX remove' onClick={() => returnz(order._id, order.quantity)}>return order</Button>
                                                    </div>
                                                </div> : <> </>
                                            }
                                        </div>
                                    </div>)}
                            <div className='dividerO'>
                            </div>
                            <div className='container'>
                                <div
                                    className='rowO order-row'
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <div className='colR'>
                                        <div className='order-text-wrapper'>
                                            <p className={'order-up '} >
                                                Total
 </p>
                                        </div>
                                    </div>
                                    <div className='colV'>
                                        <div className='order-text-wrapper'>

                                        </div>
                                    </div>
                                    <div className='colV'>
                                        <div className='order-text-wrapper'>

                                        </div>
                                    </div>
                                    <div className='colV'>
                                        <div className='order-text-wrapper'>
                                            <p className={'order-up '} >
                                                ${round(detail.total, 1)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div> : <></>

} */}







                        </div>
                    </div>
                </div>
            </div>
        </div>



<<<<<<< HEAD
=======

>>>>>>> rama
    );
}


