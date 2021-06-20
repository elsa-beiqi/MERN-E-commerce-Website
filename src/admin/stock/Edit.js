import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';

function Edit(
    {

        _id,
        onlineImageLink,
        productName,
        productPrice,
        productStock,
    }
) {
    const [pstock, setpstock] = useState(productStock)
    const [stock, setstock] = useState(0);
    const [edit, setedit] = useState(false);
    const removeFromStock = async (id) => {
        await axios.delete(`/pm/deleteproduct/${id}`, { withCredentials: true })
            .catch((error) => {
                alert('The slected item was removed');
                console.log(error);
            });
        // fecthData();
    }
    const changeStock = async () => {
        await axios.put(`/pm/productstock/${_id}/${stock}`, { withCredentials: true })
            .then((response) => {
                alert(response.data);
                setpstock(stock);
            })
            .catch((error) => {
                alert('Could not change stock quantity');
                console.log(error);
            });
        // fecthData();
    }
    return (
        <>
            <tr>
                <th scope='col' className=' bg-light' >
                    <a href={`/product/${_id}`}>
                        <div className='p-2 px-3 text-uppercase'
                            display='flex' >
                            <img className='p-2 px-3 photo_new' src={onlineImageLink} /> </div>
                    </a>
                </th>
                <th scope='col' className=' bg-light' >
                    <a href={`/product/${_id}`} className="name">
                        <div className='p-2 px-3 text-uppercase'
                            display='flex' >
                            {productName} </div>
                    </a>
                </th>

                <th scope='col' className=' bg-light'>
                    <div className='py-2 text-uppercase'>${productPrice}</div>
                </th>
                <th scope='col' className=' bg-light'>
                    <div className='p-2 px-3 text-uppercase'
                        display='flex' >
                        {pstock} </div>
                </th>
                <th scope='col' className='bg-light'>
                    <Button variant="light" className='py-2 text-uppercase remove' onClick={() => removeFromStock(_id)}>Remove</Button>
                </th>
                {(!edit) ? <th scope='col' className='bg-light'>
                    <Button variant="light" className='py-2 text-uppercase remove' onClick={() => setedit(true)}><MdEdit /></Button>
                </th> : <th scope='col' className='bg-light'>
                        <Button variant="light" className='py-2 text-uppercase remove' onClick={() => setedit(false)}><FaTimes /></Button>
                    </th>
                }
            </tr>
            {(!edit) ? <></> :
                <tr>
                    <th scope='col' className=' bg-light' >
                        <div className='p-2 px-3 text-uppercase'
                            display='flex' >
                        </div>
                    </th>
                    <th scope='col' className=' bg-light' >
                        <div className='p-2 px-3 text-uppercase'
                            display='flex' >
                        </div>
                    </th>
                    <th scope='col' className=' bg-light'>
                        <div className='py-2 text-uppercase'></div>
                    </th>
                    <th scope='col' className=' bg-light'>
                        <div className='py-2 text-uppercase'> <input
                            value={stock}
                            min={0}
                            className='addstocknums'
                            type="number"
                            placeholder={productStock}
                            required
                            onChange={(e) => setstock(e.target.value)}
                        ></input></div>

                    </th>
                    <th scope='col' className=' bg-light'>
                        <div className='py-2 text-uppercase'></div>
                    </th>
                    <th scope='col' className=' bg-light'>
                        <Button variant="light" className='py-2 text-uppercase remove' onClick={changeStock}>Save</Button>
                    </th>
                </tr>

            }
        </>
    )
}

export default Edit