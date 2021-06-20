import React, { useState, useEffect } from 'react';
import '../CSS/sign.css';
import Axios from "axios"
import axios from 'axios';
import DiscountSection from './DiscountSection';

export default function PriceDiscounts(props) {
    // const [set, setset] = useState(false)
    // const [dummy, setdummy] = useState([])
    const [products, setproducts] = useState([])
    const [productPrice, setproductPrice] = useState(0);
    const [productDiscount, setproductDiscount] = useState(0);

    // const createarri = (length) => {
    //     var dom = []
    //     for (var i = 0; i < length; i++) {
    //         dom.push(null);
    //     }
    //     setdummy(dom);
    // }
    // const add = (id) => {
    //     var x = 0;
    //     x = products.findIndex(obj => obj._id === id);
    //     console.log(x);
    //     // setset(true);
    //     var newArr = [...dummy]; // copying the old datas array
    //     newArr[x] = id; // replace e.target.value with whatever you want to change it to

    //     setdummy(newArr);
    // }
    // const remove = (id) => {
    //     setset(false);
    //     var index = dummy.indexOf(id);
    //     var blob = dummy;
    //     blob[index] = null;
    //     setdummy(blob);
    //     console.log(index);
    //     console.log(blob);
    // }

    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get(`/product/all`, { withCredentials: true });
            setproducts(data);
            // createarri(data.length);
        }
        fecthData();
    }, []);
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("HELLO")
        await Axios.post(`/sm/discount`, {
            productPrice: productPrice,
            productDiscount: productDiscount
        }, { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    props.history.push(`/SetImage/${response.data.productid}`);
                }
            })
            .catch((error) => {
                alert(error);
                console.log(error);
            });
    };

    return (
        <>
            {products.map((product) =>
                <div key={product._id}>
                    <DiscountSection _id={product._id} onlineImageLink={product.onlineImageLink} productName={product.productName} productPrice={product.productPrice} productDiscount={product.productDiscount} productDCPrice={product.productDCPrice} />
                </div>
            )}
            {/* <div className='container-a'>
                <div className="stockview">
                    <form onSubmit={submitHandler}>
                        {}
                        <div className='form-group'>
                            <label>Product Price $</label>
                            <input
                                value={productPrice}
                                min={0}
                                className='addstocknums'
                                type="number"
                                placeholder="0.0"
                                required
                                onChange={(e) => setproductPrice(e.target.value)}
                            ></input>
                        </div>

                        <div className='form-group'>
                            <label>Discount %</label>
                            <input
                                value={productDiscount}
                                min={0}
                                max={100}
                                className='addstocknums'
                                type="number"
                                placeholder="0.0"
                                required
                                onChange={(e) => setproductDiscount(e.target.value)}
                            ></input>
                        </div>

                        <button className='btn btn-primary btn-block' type="submit">
                            Add Price and Discount
                </button>
                    </form>
                </div>
            </div> */}
        </>
    );
}