import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../CSS/cart.css';
import { Button } from 'react-bootstrap';
import { MdEdit } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import Edit from './Edit';

export default function Cart() {

    const [products, setproducts] = useState([]);
    const [stock, setstock] = useState();
    const [edit, setedit] = useState(false);

    const fecthData = async () => {
        const { data } = await axios.get(`/product/all`, { withCredentials: true });
        setproducts(data);
    }
    const removeFromStock = async (id) => {
        await axios.delete(`/pm/deleteproduct/${id}`, { withCredentials: true })
            .catch((error) => {
                alert('The slected item was removed');
                console.log(error);
            });
        fecthData();
    }
    useEffect(() => {
        fecthData();
    }, []);

    return (
        <div>
            <div className='px-2 px-lg-0'>
                <div className='container text-black pt-5 pb-2 text-left'>
                    {/* <h1 className='display-4' style={{ fontSize: 40, fontWeight: 800, color: "#060b26" }}>
                        Stocks
                    </h1> */}
                </div>
            </div>
            {(products.length > 0) ?
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
                                                        <div className='p-2 px-3 text-uppercase'
                                                            display='flex' >Product
                                                </div>
                                                    </th>
                                                    <th scope='col' className='border-0 bg-light'>
                                                        <div className='p-2 px-3 text-uppercase'
                                                            display='flex' >
                                                        </div>
                                                    </th>
                                                    <th scope='col' className='border-0 bg-light'>
                                                        <div className='py-2 text-uppercase'>Price</div>
                                                    </th>
                                                    <th scope='col' className='border-0 bg-light' >
                                                        <div className='py-2 text-uppercase'>Stock</div>
                                                    </th>
                                                    <th scope='col' className='border-0 bg-light'>
                                                        <div className='py-2 text-uppercase '></div>

                                                    </th>
                                                    <th scope='col' className='border-0 bg-light'>
                                                        <div className='py-2 text-uppercase '></div>

                                                    </th>
                                                </tr>
                                            </thead>
                                            <br></br>
                                            {/* </table>
                                <table className='table'> */}
                                            {products.map((product) => (
                                                <thead key={product._id}>
                                                    {/* <tr>
                                                        <th scope='col' className=' bg-light' >
                                                            <a href={`/product/${product._id}`}>
                                                                <div className='p-2 px-3 text-uppercase'
                                                                    display='flex' >
                                                                    <img className='p-2 px-3 photo_new' src={product.onlineImageLink} /> </div>
                                                            </a>
                                                        </th>
                                                        <th scope='col' className=' bg-light' >
                                                            <a href={`/product/${product._id}`} className="name">
                                                                <div className='p-2 px-3 text-uppercase'
                                                                    display='flex' >
                                                                    {product.productName} </div>
                                                            </a>
                                                        </th>

                                                        <th scope='col' className=' bg-light'>
                                                            <div className='py-2 text-uppercase'>${product.productPrice}</div>
                                                        </th>
                                                        <th scope='col' className=' bg-light'>
                                                            <div className='p-2 px-3 text-uppercase'
                                                                display='flex' >
                                                                {product.productStock} </div>
                                                            <div className='py-2 text-uppercase'> <input
                                                                value={stock}
                                                                min={0}
                                                                className='addstocknums'
                                                                type="number"
                                                                placeholder={product.productStock}
                                                                required
                                                                onChange={(e) => setstock(e.target.value)}
                                                            ></input></div>
                                                        </th>
                                                        <th scope='col' className='bg-light'>
                                                            <Button variant="light" className='py-2 text-uppercase remove' onClick={() => removeFromStock(product._id)}>Remove</Button>
                                                        </th>
                                                        {(!edit) ? <th scope='col' className='bg-light'>
                                                            <Button variant="light" className='py-2 text-uppercase remove' onClick={() => setedit(true)}><MdEdit /></Button>
                                                        </th> : <th scope='col' className='bg-light'>
                                                                <Button variant="light" className='py-2 text-uppercase remove' onClick={() => setedit(false)}><FaTimes /></Button>
                                                            </th>
                                                        }
                                                    </tr>*/}
                                                    <Edit _id={product._id} onlineImageLink={product.onlineImageLink} productName={product.productName} productPrice={product.productPrice} productStock={product.productStock} />
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
                                    <div className="right"><Button variant="primary" href="/AddProduct"><i className="fas fa-plus"></i> Add Product</Button></div>
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
