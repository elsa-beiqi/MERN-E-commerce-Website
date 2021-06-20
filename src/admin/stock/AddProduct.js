import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/sign.css';
import Axios from "axios"



export default function SigninScreen(props) {
    const [productSize, setproductSize] = useState("");
    const [productName, setproductName] = useState("");
    const [productDistributor, setproductDistributor] = useState("Some Art Company");
    const [productDescription, setproductDescription] = useState("This is a product!");
    const [productCategory, setproductCategory] = useState("Brush");
    const [productBGcolor, setproductBGcolor] = useState("Peach");
    const [productPrice, setproductPrice] = useState(0);
    const [productDiscount, setproductDiscount] = useState(0);
    const [productStock, setproductStock] = useState(0);
    const [productBestseller, setproductBestSeller] = useState(false);
    const [productRating, setproductRating] = useState(0);
    const [productNumofRatings, setproductNumofRatings] = useState(0);

    useEffect(() => {
        console.log(productName);
        console.log(productNumofRatings);
        console.log(productCategory);
    }, [productName, productNumofRatings, productCategory])

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("HELLO")
        await Axios.post(`/pm/addproduct`, {
            productSize: productSize,
            productName: productName,
            productDistributor: productDistributor,
            productDescription: productDescription,
            productCategory: productCategory,
            productBGcolor: productBGcolor,
            productPrice: productPrice,
            productDiscount: productDiscount,
            productStock: productStock,
            productRating: productRating,
            productNumofRatings: productNumofRatings
        }, { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    props.history.push(`/Stock`);
                }
            })
            .catch((error) => {
                alert(error);
                console.log(error);
            });
    };

    return (
        <div
            className={'no-section weneedmargin'}
        >
            <div className='container-a '>
                <div className="stockview">
                    <form onSubmit={submitHandler}>
                        {/* <div className="addstocktitle">  Add Product</div> */}

                        <div className='form-group'>
                            <label>Product Name</label>
                            <input
                                value={productName}
                                className='form-control'
                                type="text"
                                placeholder="Enter Product Name"
                                required
                                onChange={(e) => setproductName(e.target.value)}
                            ></input>
                        </div>

                        <div className='form-group'>
                            <label>Product Size</label>
                            <input
                                value={productSize}
                                className='form-control'
                                type="text"
                                placeholder="Size X"
                                required
                                onChange={(e) => setproductSize(e.target.value)}
                            ></input>
                        </div>

                        <div className='form-group'>
                            <label>Product Distributor</label>
                            <input
                                value={productDistributor}
                                className='form-control'
                                type="text"
                                placeholder="Enter Product Distributor"
                                required
                                onChange={(e) => setproductDistributor(e.target.value)}
                            ></input>
                        </div>

                        <div className='form-group'>
                            <label>Product Description</label>
                            <textarea
                                value={productDescription}
                                className='form-control'
                                as="textarea"
                                placeholder="Enter Product Description"
                                required
                                onChange={(e) => setproductDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className='form-group'>
                            <label className="select">Product Category</label>
                            <select value={productCategory} className="addstocknums" onChange={(e) => setproductCategory(e.target.value)}>
                                <option value="Accessory">Accessory</option>
                                <option value="Brush">Brush</option>
                                <option value="Canvas">Canvas</option>
                                <option value="Paint">Paint</option>
                                <option value="Painting">Painting</option>
                                <option value="Spray">Spray</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <label className="select">Product Background Color</label>
                            <select valie={productBGcolor} className="addstocknums" onChange={(e) => setproductBGcolor(e.target.value)}>
                                <option value="Peach">Peach</option>
                                <option value="Blue">Blue</option>
                                <option value="Red">Red</option>

                            </select>
                        </div>

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

                        <div className='form-group'>
                            <label>Stock</label>
                            <input
                                value={productStock}
                                min={0}
                                className='addstocknums'
                                type="number"
                                placeholder="0"
                                required
                                onChange={(e) => setproductStock(e.target.value)}
                            ></input>
                        </div>

                        <div className='form-group'>
                            <label className="select">Product Rating</label>
                            <select value={productRating} className="addstocknums" onChange={(e) => setproductRating(e.target.value)}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <label>Number of Ratings</label>
                            <input
                                value={productNumofRatings}
                                min={0}
                                className='addstocknums'
                                type="number"
                                placeholder="0"
                                required
                                onChange={(e) => setproductNumofRatings(e.target.value)}
                            ></input>
                        </div>

                        <div className='form-group'>
                            <label>Best Seller</label>
                            <input
                                value={productBestseller}
                                className='addstockcheckbox'
                                type="checkbox"
                                checked={productBestseller}
                                required
                                onChange={(e) => setproductBestSeller(!productBestseller)}
                            ></input>
                        </div>

                        <button className='btn btn-primary btn-block' type="submit">
                            Add Product
                </button>
                    </form>
                </div>
            </div>
        </div>
    );
}