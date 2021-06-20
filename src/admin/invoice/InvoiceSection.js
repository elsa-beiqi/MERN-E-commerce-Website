import React, { useState } from 'react';
import './Invoice.css';
import { Button } from '../../components/button/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import download from 'downloadjs'

function HeroSection({
    status,
    _id,
    name,
    address,
    city,
    country,
    date,
    userEmail,
    products,
    total,
    IGN
}) {
    const [selstatus, setselstatus] = useState(status);
    const saveinvoice = async () => {
        await axios.get(`sm/${_id}/pdf`, { withCredentials: true, responseType: 'blob', })
            .then((response) => {
                const content = response.headers['content-type'];
                download(response.data, 'invoice', content)
                console.log(response);
            })
    }
    const changestatus = async () => {
        if (status !== selstatus) {
            await axios.put(`pm/invoices/${_id}/${selstatus}`, { withCredentials: true })
                .then((response) => {
                    alert(response.data);
                })
        }
        console.log(selstatus)
    }
    return (
        <>
            <div
                className={'re-section weneedmargin'}
            >
                <div className='containerRE'>
                    <div
                        className='row invoice-row'
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <div className='col'>
                            <div className='invoice-text-wrapper'>
                                <div className={status}>{status}</div>
                                <Link to={`/InvoiceView/${_id}`}>
                                    <h1 className={'id'}>
                                        {_id}
                                    </h1>
                                </Link>
                                <p className={'invoice-subtitle-date dark'} >
                                    Invoice Date:  {date.substring(0, 10)}
                                </p>
                                <p className={'invoice-subtitle dark'} >
                                    Delivery Detail:
                                </p>
                                <p className={'invoice-subtitle-info dark'} >
                                    {name}
                                </p>
                                <p className={'invoice-subtitle-info dark'} >
                                    {userEmail}
                                </p>
                                <p className={'invoice-subtitle-info dark'} >
                                    {address}
                                </p>
                                <p className={'invoice-subtitle-info dark'} >
                                    {city}
                                </p>
                                <p className={'invoice-subtitle-info dark'} >
                                    {country}
                                </p>
                                {/* <Link to='/sign-up'>
                                    <Button buttonSize='btn--wide' buttonColor='blue'>
                                        {buttonLabel}
                                    </Button>
                                </Link> */}
                            </div>
                        </div>
                        <div className='col'>
                            <div className='invoice-text-wrapper'>
                                <div className='invoice-ordersummary'>Order Summary</div>
                                {(!IGN) ? <>{products.map((product) =>
                                    <div key={product._id}>
                                        <p className={'invoice-subtitle-date dark'}>
                                            {product.productName} x{product.quantity} &nbsp;&nbsp; ${product.PriceatPurchase}
                                        </p>
                                        <p className={'invoice-subtitle-id dark'} >
                                            {product._id}
                                        </p>
                                    </div>
                                )}</> :
                                    <>{products.map((product) =>
                                        <div key={product}>
                                            <p className={'invoice-subtitle-date dark'}>
                                                {product}
                                            </p>
                                        </div>
                                    )}</>
                                }

                            </div>
                        </div>
                        <div className='col'>
                            <div className='invoice-text-wrapper'>
                                {(!IGN) ? <>
                                    <div className='invoice-ordersummary'>Change Status</div>
                                    <select value={selstatus} className='formX-input' onChange={(e) => setselstatus(e.target.value)}>
                                        {(status === 'processing') ? <option value={'in-transit'}>in-transit</option> : <></>}
                                        {(status !== 'delivered') ? <option value={'delivered'}>delivered</option> : <></>}
                                    </select>
                                    <Button buttonSize='btn--medium' buttonColor='blue' onClick={changestatus}>
                                        save changes
                                </Button>
                                </> :
                                    <Button buttonSize='btn--medium' buttonColor='blue' onClick={saveinvoice}>
                                        save invoice
                         </Button>
                                }
                            </div>
                        </div>
                        <div className='col'>
                            <div className='invoice-text-wrapper'>
                                <div className='invoice-ordersummary'>Total</div>
                                <p className={'invoice-subtitle-date dark'} >
                                    ${total}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSection;