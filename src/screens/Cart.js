// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../CSS/cart.css';
// import { Button } from 'react-bootstrap';

// export default function Cart() {

//     const [cart, setcart] = useState([]);
//     const [price, setprice] = useState(0)


//     const fecthData = async () => {
//         const { data } = await axios.get(`/cart`, { withCredentials: true });
//         setcart(data);
//     }
//     const fecthData1 = async () => {
//         const { data } = await axios.get(`/purchase/totalprice`, { withCredentials: true });
//         setprice(data.totalprice);
//     }
//     const removeFromCart = async (id, qty) => {

//         await axios.delete(`/cart/remove/${id}/${qty}`, { withCredentials: true })
//             .catch((error) => {
//                 alert('The slected item was removed');
//                 console.log(error);
//             });
//         fecthData();
//         fecthData1();
//     }
//     useEffect(() => {
//         fecthData();
//         fecthData1();
//     }, []);

//     return (
//         <div>
//             <div className='px-2 px-lg-0'>
//                 <div className='container text-black pt-5 pb-2 text-left'>
//                     <h1 className='display-4' style={{ fontSize: 40, fontWeight: 540, color: "#2b468b" }}>
//                         Shopping Cart
//                     </h1>
//                 </div>
//             </div>
//             {(cart.length > 0) ?
//                 <>
//                     <div className=''>
//                         <div className='container'>
//                             <div className='row'>
//                                 <div className='col-lg-12 pt-5 px-5 pb-0 bg-white rounded shadow-sm'>
//                                     <div className='table-responsive'>
//                                         <table className='table' >
//                                             <thead>
//                                                 <tr className="thead">
//                                                     <th scope='col' className='border-0 bg-light'>
//                                                         <div className='p-2 px-3 text-uppercase'
//                                                             display='flex' >Product
//                                                 </div>
//                                                     </th>
//                                                     <th scope='col' className='border-0 bg-light'>
//                                                         <div className='p-2 px-3 text-uppercase'
//                                                             display='flex' >
//                                                         </div>
//                                                     </th>
//                                                     <th scope='col' className='border-0 bg-light'>
//                                                         <div className='py-2 text-uppercase'>Price</div>
//                                                     </th>
//                                                     <th scope='col' className='border-0 bg-light' >
//                                                         <div className='py-2 text-uppercase'>Quantity</div>
//                                                     </th>
//                                                     <th scope='col' className='border-0 bg-light'>
//                                                         <div className='py-2 text-uppercase '>Remove</div>

//                                                     </th>
//                                                 </tr>
//                                             </thead>
//                                             <br></br>
//                                             {cart.map((product) => (

//                                                 <thead key={product._id}>
//                                                     <tr>
//                                                         <th scope='col' className='border-0 bg-light' >
//                                                             <a href={`/product/${product._id}`}>
//                                                                 <div className='p-2 px-3 text-uppercase'
//                                                                     display='flex' >
//                                                                     <img className='p-2 px-3 photo_new' src={product.onlineImageLink} /> </div>
//                                                             </a>
//                                                         </th>
//                                                         <th scope='col' className='border-0 bg-light' >
//                                                             <a href={`/product/${product._id}`} className="name">
//                                                                 <div className='p-2 px-3 text-uppercase'
//                                                                     display='flex' >
//                                                                     {product.productName} </div>
//                                                             </a>
//                                                         </th>

//                                                         <th scope='col' className='border-0 bg-light'>
//                                                             <div className='py-2 text-uppercase'>${product.productPrice}</div>
//                                                         </th>
//                                                         <th scope='col' className='border-0 bg-light'>
//                                                             <div className='py-2 text-uppercase'>{product.quantity}</div>
//                                                         </th>
//                                                         <th scope='col' className='border-0 bg-light'>
//                                                             <Button variant="light" className='py-2 text-uppercase remove' onClick={() => removeFromCart(product._id, product.quantity)}>Remove</Button>
//                                                         </th>
//                                                     </tr>
//                                                 </thead>

//                                             ))}
//                                         </table>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className='pb-5'>
//                         <div className='container'>
//                             <div className='row'>
//                                 <div className='col-lg-12 pt-2 pr-5 pl-5 pb-4 bg-white rounded shadow-sm mb-5'>
//                                     <div className='table-responsive'>
//                                         <table className='table' >
//                                             <thead>
//                                                 <tr className="thead">
//                                                     <th scope='col' className='border-0 bg-light'>
//                                                         <div className='p-2 px-3 text-uppercase'
//                                                             display='flex' >Total Price
//                                                 </div>
//                                                     </th>

//                                                     <th scope='col' className='border-0 bg-light'>
//                                                         <div className='py-2 text-uppercase'>${price}</div>
//                                                     </th>


//                                                 </tr>
//                                             </thead>

//                                         </table>
//                                     </div>
//                                     <div className="right"><Button variant="primary" href="/Purchase1">Proceed to checkout</Button></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div >
//                 </>
//                 : <div>:(</div>
//             }
//         </div >
//     );
// }
import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/cart.css';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getCartQTY } from '../actions/cartActions';

export default function Cart() {

    const [cart, setcart] = useState([]);
    const [price, setprice] = useState(0)
    const dispatch = useDispatch();

    const fecthData = async () => {
        const { data } = await axios.get(`/cart`, { withCredentials: true });
        setcart(data);
    }
    const fecthData1 = async () => {
        const { data } = await axios.get(`/purchase/totalprice`, { withCredentials: true });
        setprice(data.totalprice);
    }
    const removeFromCart = async (id, qty) => {
        dispatch(getCartQTY());
        await axios.delete(`/cart/remove/${id}/${qty}`, { withCredentials: true })
            .catch((error) => {
                alert('The selected item was removed');
                console.log(error);
            });
        fecthData();
        fecthData1();
    }
    useEffect(() => {
        fecthData();
        fecthData1();
    }, []);

    return (
        <div>
            <div className='px-2 px-lg-0'>
                <div className='container text-black pt-5 pb-2 text-left'>
                    <h1 className='display-4' style={{ fontSize: 40, fontWeight: 540, color: "#2b468b" }}>
                        Shopping Cart
                    </h1>
                </div>
            </div>
            {(cart.length > 0) ?
                <>
                    <div className=''>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-lg-12 pt-5 px-5 pb-0 bg-white rounded shadow-sm'>
                                    <div className='table-responsive'>
                                        <table className='table' >
                                            <thead>
                                                <tr className="thead">
                                                    <th scope='col' className='border-0 bg-light'>
                                                        <div className='p-2 px-3 font-weight-normal'
                                                            display='flex' >Product
                                                </div>
                                                    </th>
                                                    <th scope='col' className='border-0 bg-light'>
                                                        <div className='p-2 px-3 font-weight-normal'
                                                            display='flex' >
                                                        </div>
                                                    </th>
                                                    <th scope='col' className='border-0 bg-light'>
                                                        <div className='py-2 font-weight-normal'>Price</div>
                                                    </th>
                                                    <th scope='col' className='border-0 bg-light' >
                                                        <div className='py-2 font-weight-normal'>Quantity</div>
                                                    </th>
                                                    <th scope='col' className='border-0 bg-light'>
                                                        <div className='py-2 font-weight-normal'>Remove</div>

                                                    </th>
                                                </tr>
                                            </thead>
                                            <br></br>
                                            {/* </table>
                                <table className='table'> */}
                                            {cart.map((product) => (

                                                <thead key={product._id}>
                                                    <tr>
                                                        <th scope='col' className='border-0 bg-light' >
                                                            <a href={`/product/${product._id}`}>
                                                                <div className=''
                                                                    display='flex' >
                                                                    <img className='photo_new' src={product.onlineImageLink} /> </div>
                                                            </a>
                                                        </th>
                                                        <th scope='col' className='border-0 bg-light' >
                                                            <a href={`/product/${product._id}`} className="name">
                                                                <div className='p-2 px-3 font-weight-normal'
                                                                    display='flex' >
                                                                    {product.productName} </div>
                                                            </a>
                                                        </th>

                                                        <th scope='col' className='border-0 bg-light'>
                                                            <div className={"cartprice"}>
                                                                <div className='py-2 font-weight-normal OLD'>${product.productPrice}</div>
                                                                <div className='py-2 font-weight-normal'> &nbsp; ${product.productDCPrice}</div>
                                                            </div>
                                                        </th>
                                                        <th scope='col' className='border-0 bg-light'>
                                                            <div className='py-2 font-weight-normal'>{product.quantity}</div>
                                                        </th>
                                                        <th scope='col' className='border-0 bg-light'>
                                                            <Button variant="light" className='py-2 font-weight-normal remove' onClick={() => removeFromCart(product._id, product.quantity)}>🗑️</Button>
                                                        </th>
                                                    </tr>
                                                </thead>

                                            ))}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='pb-5'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-lg-12 pt-2 pr-5 pl-5 pb-4 bg-white rounded shadow-sm mb-5'>
                                    <div className='table-responsive'>
                                        <table className='table' >
                                            <thead>
                                                <tr className="thead">
                                                    <th scope='col' className='border-0 bg-light'>
                                                        <div className='p-2 px-3'
                                                            display='flex' >Total Price
                                                </div>
                                                    </th>

                                                    <th scope='col' className='border-0 bg-light'>
                                                        <div className='px-6 py-2'>${price}</div>
                                                    </th>


                                                </tr>
                                            </thead>

                                        </table>
                                    </div>
                                    <div className="right"><Button variant="primary" href="/Purchase1">Proceed to checkout</Button></div>
                                </div>
                            </div>
                        </div>
                    </div >
                </>
                : <div>:(</div>
            }
        </div >
    );
}