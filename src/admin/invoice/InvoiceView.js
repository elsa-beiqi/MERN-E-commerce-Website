import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Invoice.css'


export default function InvoiceView() {
    const { id } = useParams();
    const [invoice, setinvoice] = useState([])
    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get(`/pm/invoices/${id}`, { withCredentials: true })
            setinvoice(data[0]);
        };
        fecthData();
    }, []);
    return (
        <div
            className={'invoice-section weneedmargin'}
        >
            <div className='containerINBOX'>
                <div
                    className='row invoice-row'
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <div className='col'>
                        <div className='invoice-text-wrapper'>
                            <h1 className={'heading-c dark'}>
                                Canvas Inc.
                            </h1>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='invoice-text-wrapper'>
                            <div className='invoice-ordersummary'>123 Main Street</div>
                            <div className='invoice-ordersummary'>Tuzla, IST, 31433</div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='invoice-text-wrapper'>
                            <div className='invoice-heading'>Invoice</div>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='invoice-text-wrapper'>

                        </div>
                    </div>
                    <div className='col'>
                        <div className='invoice-text-wrapper'>
                            <p className={'invoice-subtitle-date dark'} >
                                Invoice Number: {id}
                            </p>
                            {(typeof (invoice.date) !== 'undefined') ? <p className={'invoice-subtitle-date dark'} >
                                Invoice Date: {invoice.date.substring(0, 10)}
                            </p> : <></>}

                            <p className={'invoice-subtitle-date dark'} >
                                Balance Due: {invoice.total}
                            </p>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='invoice-text-wrapper'>
                            <p className={'invoice-subtitle-date dark'} >
                                {invoice.name}
                            </p>
                            <p className={'invoice-subtitle-date dark'} >
                                {invoice.address}
                            </p>
                            <p className={'invoice-subtitle-date dark'} >
                                {invoice.city}, {invoice.country}
                            </p>
                        </div>
                    </div>
                    <div className='col2'>
                        <div className='invoice-text-wrapper'>
                            <h1 className='id'>Item</h1>
                        </div>
                    </div>
                    <div className='col2'>
                        <div className='invoice-text-wrapper'>
                            <h1 className='id'>Description</h1>
                        </div>
                    </div>
                    <div className='col2'>
                        <div className='invoice-text-wrapper'>
                            <h1 className='id'>Unit Cost</h1>
                        </div>
                    </div>
                    <div className='col2'>
                        <div className='invoice-text-wrapper'>
                            <h1 className='id'>Quantity</h1>
                        </div>
                    </div>
                    <div className='col2'>
                        <div className='invoice-text-wrapper'>
                            <h1 className='id'>Line Total</h1>
                        </div>
                    </div>
                    {(typeof (invoice._id) !== 'undefined') ? <>{invoice.products.map((product) =>
                        <>
                            <div className='col2'>
                                <div className='invoice-text-wrapper'>
                                    <h1 className='id'>{product.productName}</h1>
                                </div>
                            </div>
                            <div className='col2'>
                                <div className='invoice-text-wrapper'>
                                    <h1 className='id'>{product.productCategory}</h1>
                                </div>
                            </div>
                            <div className='col2'>
                                <div className='invoice-text-wrapper'>
                                    <h1 className='id'>${product.PriceatPurchase}</h1>
                                </div>
                            </div>
                            <div className='col2'>
                                <div className='invoice-text-wrapper'>
                                    <h1 className='id'>{product.quantity}</h1>
                                </div>
                            </div>
                            <div className='col2'>
                                <div className='invoice-text-wrapper'>
                                    <h1 className='id'>${product.quantity * product.PriceatPurchase}</h1>
                                </div>
                            </div>
                        </>
                    )} </> : <> </>}
                    <div className='col2'>
                        <div className='invoice-text-wrapper'>
                        </div>
                    </div>
                    <div className='col2'>
                        <div className='invoice-text-wrapper'>
                        </div>
                    </div>
                    <div className='col2'>
                        <div className='invoice-text-wrapper'>
                            <h1 className='id'>Total:</h1>
                        </div>
                    </div>
                    <div className='col2'>
                        <div className='invoice-text-wrapper'>
                        </div>
                    </div>
                    <div className='col2'>
                        <div className='invoice-text-wrapper'>
                            <h1 className='id'>${invoice.total}</h1>
                        </div>
                    </div>
                    <div className='col2'>
                        <div className='invoice-text-wrapper'>
                        </div>
                    </div>
                    <div className='col2'>
                        <div className='invoice-text-wrapper'>
                        </div>
                    </div>
                    <div className='col2'>
                        <div className='invoice-text-wrapper'>
                        </div>
                    </div>
                    <div className='col2'>
                        <div className='invoice-text-wrapper'>
                        </div>
                    </div>
                    <div className='col2'>
                        <div className='invoice-text-wrapper'>
                        </div>
                    </div>
                    <div className='col3'>
                        <div className='invoice-text-wrapper'>
                        </div>
                    </div>
                    <div className='col3'>
                        <div className='invoice-text-wrapper'>
                        </div>
                    </div>
                    <div className='col4'>
                        <div className='invoice-text-wrapper'>
                            <h1 className='id'>Thank you for your business.</h1>
                        </div>
                    </div>
                    <div className='col3'>
                        <div className='invoice-text-wrapper'>
                        </div>
                    </div>
                    <div className='col3'>
                        <div className='invoice-text-wrapper'>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../../CSS/Order.css';
// import { useParams } from 'react-router-dom';

// export default function Invoice() {
//     const [purchases, setpurchase] = useState([]);
//     const [detail, setdetail] = useState([])
//     const { id } = useParams();

//     useEffect(() => {
//         const fecthData = async () => {
//             const { data } = await axios.get(`pm/invoices/${id}`, { withCredentials: true });
//             console.log(data);
//             setpurchase(data[0].products);
//             setdetail(data[0]);
//         }
//         fecthData();
//     }, []);
//     const round = (value, qty) => {
//         const x = Number(value);
//         const y = Number(qty);
//         const z = x * y;
//         return Number(z.toFixed(2));

//     }
//     return (
//         <div>

//             <div className='px-2 px-lg-0'>
//                 <div className='container text-black pt-5 pb-2 text-left'>
//                     <h3 className='display-4' style={{ fontSize: '24px', textDecoration: 'none', fontWeight: 600, color: "#3b3d46" }}>
//                         ORDER #{id}
//                     </h3>
//                     <div className={'headingK darkO'}>
//                         Order placed on: {detail.date}
//                     </div>
//                     <div className={'headingK darkO'}>
//                         Order status: {detail.status}
//                     </div>

//                 </div>
//             </div>


//             <div className={'order-section'}  >
//                 <div className='container'>
//                     <div
//                         className='rowO order-row'
//                         style={{
//                             display: 'flex',
//                             flexDirection: 'row'
//                         }}
//                     >
//                         <div className='colx'>
//                             <div className='order-text-wrapper'>
//                                 <h5 className={'headingO darkO'}>
//                                     Shipping address
//                                 </h5>
//                                 <p className={'order-subtitle darkO'} >
//                                     {detail.quantity}
//                                 </p>
//                                 <p className={'order-subtitle darkO'} >
//                                     {detail.quantity}
//                                 </p>
//                                 <p className={'order-subtitle darkO'} >
//                                     {detail.quantity}
//                                 </p>
//                                 <p className={'order-subtitle darkO'} >
//                                     {detail.quantity}
//                                 </p>
//                                 <p className={'order-subtitle darkO'} >
//                                     {detail.quantity}
//                                 </p>
//                                 <h5 className={'headingO darkO somesbace'}>
//                                     Billing address
//                                 </h5>
//                                 <p className={'order-subtitle darkO '} >
//                                     {detail.quantity}
//                                 </p>
//                                 <p className={'order-subtitle darkO'} >
//                                     {detail.quantity}
//                                 </p>
//                                 <p className={'order-subtitle darkO'} >
//                                     {detail.quantity}
//                                 </p>
//                                 <p className={'order-subtitle darkO'} >
//                                     {detail.quantity}
//                                 </p>
//                                 <p className={'order-subtitle darkO'} >
//                                     {detail.quantity}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className='coly'>
//                             <div className='container'>
//                                 <div
//                                     className='rowO order-row'
//                                     style={{
//                                         display: 'flex',
//                                         flexDirection: 'row'
//                                     }}
//                                 >
//                                     <h5 className={'headingO darkO someweird'}>
//                                         Order detail
//                                 </h5>
//                                 </div>
//                             </div>
//                             <div className='container'>
//                                 <div
//                                     className='rowO order-row'
//                                     style={{
//                                         display: 'flex',
//                                         flexDirection: 'row'
//                                     }}
//                                 >
//                                     <div className='colR'>
//                                         <div className='order-text-wrapper'>
//                                             <p className={'order-up '} >
//                                                 PRODUCT
//                                 </p>
//                                         </div>
//                                     </div>
//                                     <div className='colV'>
//                                         <div className='order-text-wrapper'>
//                                             <p className={'order-up '} >
//                                                 PRICE
//                                 </p>
//                                         </div>
//                                     </div>
//                                     <div className='colV'>
//                                         <div className='order-text-wrapper'>
//                                             <p className={'order-up '} >
//                                                 QUANTITY
//                                 </p>
//                                         </div>
//                                     </div>
//                                     <div className='colV'>
//                                         <div className='order-text-wrapper'>
//                                             <p className={'order-up '} >
//                                                 TOTAL
//                                 </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='dividerO'>
//                             </div>
//                             {purchases.map((order) =>
//                                 <div className='container' key={order._id}>
//                                     <div
//                                         className='rowO order-row'
//                                         style={{
//                                             display: 'flex',
//                                             flexDirection: 'row'
//                                         }}
//                                     >
//                                         <div className='colR'>
//                                             <div className='order-text-wrapper'>
//                                                 <a href={`/product/${order._id}`}>
//                                                     <div className=''
//                                                         display='flex' >
//                                                         <img className='photo_new' src={order.onlineImageLink} /> </div>
//                                                 </a>
//                                             </div>
//                                         </div>
//                                         <div className='colV'>
//                                             <div className='order-text-wrapper'>
//                                                 <p className={'order-subtitle darkO'} >
//                                                     ${round(order.PriceatPurchase, 1)}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <div className='colV'>
//                                             <div className='order-text-wrapper'>
//                                                 <p className={'order-subtitle darkO'} >
//                                                     {order.quantity}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <div className='colV'>
//                                             <div className='order-text-wrapper'>
//                                                 <p className={'order-subtitle darkO'} >
//                                                     ${round(order.PriceatPurchase, order.quantity)}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>)}
//                             <div className='dividerO'>
//                             </div>
//                             <div className='container'>
//                                 <div
//                                     className='rowO order-row'
//                                     style={{
//                                         display: 'flex',
//                                         flexDirection: 'row'
//                                     }}
//                                 >
//                                     <div className='colR'>
//                                         <div className='order-text-wrapper'>
//                                             <p className={'order-up '} >
//                                                 Total
//                                 </p>
//                                         </div>
//                                     </div>
//                                     <div className='colV'>
//                                         <div className='order-text-wrapper'>

//                                         </div>
//                                     </div>
//                                     <div className='colV'>
//                                         <div className='order-text-wrapper'>

//                                         </div>
//                                     </div>
//                                     <div className='colV'>
//                                         <div className='order-text-wrapper'>
//                                             <p className={'order-up '} >
//                                                 ${round(detail.total, 1)}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>




//     );
// }


