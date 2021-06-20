import React, { useState, useEffect } from 'react'
import * as RBS from 'react-bootstrap';
import axios from 'axios';
import Rating from '../components/Rating';
import { useDispatch } from 'react-redux';
import { getCartQTY } from '../actions/cartActions';
import '../CSS/productlist.css';
import { Button } from './button/Button'
import { FaCartPlus } from 'react-icons/fa'

export default function Products(id) {

    const [product, setProduct] = useState("loading");
    const dispatch = useDispatch();
    const [style, setstyle] = useState("none")

    const addToCartHandler = async () => {
        console.log(id.id);
        await axios.post(`/cart/add/${id.id}/1`, {}, { withCredentials: true }).catch((error) => {
            alert("Product out of stock!");
        });;
        const { data } = await axios.get(`/cart`, { withCredentials: true });
        console.log(data);
        dispatch(getCartQTY());
    }
    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get(`/product/allinfo/${id.id}`, { withCredentials: true });
            setProduct(data);
        };

        fecthData();
    }, []);

    return (
        <>
            {
                (product !== "loading") ?
                    <div className='col-pl' onMouseEnter={e => {
                        setstyle('block');
                    }}
                        onMouseLeave={e => {
                            setstyle('none')
                        }}>
                        <a href={`/product/${product._id}`}>
                            <div className='home__bs-img-wrapper'>
                                <img src={product.onlineImageLink} alt={product.productName} className='home__bs-img' />
                            </div>
                        </a>
                        <div className='home__text-wrapper'>
                            <a href={`/product/${product._id}`}>
                                <p className={'home__subtitle'}>
                                    {product.productName.substring(0, 27)}
                                </p>
                            </a>
                            {/* <p className={'home__subtitle'}>
                                {product.productCategory}
                            </p> */}
                            {/* {
                                (product.productNumofRatings > 0 && (style !== 'none')) ?
                                    <Rating
                                        rating={product.productRating}
                                        numReviews={product.productNumofRatings}
                                        showViews={false}
                                    ></Rating>
                                    : <> </>
                            } */}
                            <div className={'price'}>
                                <p className={'home__bs-price op'}>
                                    ${product.productPrice}
                                </p>
                                <p className={'home__bs-price'}>
                                    &nbsp; ${product.productDCPrice}
                                </p>
                            </div>
                            {
                                ((style !== 'none')) ?
                                    <div className='home__subtitle'>
                                        {(product.productStock > 0) ? <Button buttonStyle='btn--outline' onClick={() => addToCartHandler(product._id)}><FaCartPlus /> add to cart</Button> : <>out of stock</>}
                                    </div>
                                    : <> </>
                            }
                        </div>
                    </div>
                    : <></>
            }
        </>
    )
}

 // <RBS.Card style={{ width: '20rem', height: '25rem' }} className="noBorder" >
        //     <a href={`/product/${product._id}`}>
        //         <RBS.Figure style={{ width: '10rem', height: '13rem' }}>
        //             <RBS.Figure.Image className="photo"
        //                 width={171}
        //                 height={180}
        //                 alt={product.productName}
        //                 src={product.onlineImageLink}

        //             />
        //         </RBS.Figure>
        //     </a>
        //     <RBS.Card.Body>
        //         <a href={`/product/${product._id}`}>
        //             <RBS.Card.Title className="smallertitle">{product.productName}</RBS.Card.Title>
        //         </a>
        //         <Rating
        //             rating={product.productRating}
        //             numReviews={product.productNumofRatings}
        //             showViews={true}
        //         ></Rating>
        //         <div className="price">${product.productPrice}</div>
        //         <RBS.Card.Footer className="noColor">
        //             {(product.productStock > 0) ? <RBS.Button variant="primary" onClick={() => addToCartHandler(product._id)}>add to cart</RBS.Button> :
        //                 <RBS.Button disabled variant="primary" onClick={() => addToCartHandler(product._id)}>add to cart</RBS.Button>
        //             }

        //         </RBS.Card.Footer>

        //     </RBS.Card.Body>
        // </RBS.Card >
