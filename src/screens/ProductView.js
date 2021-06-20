import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, Link, } from 'react-router-dom';
import * as RBS from 'react-bootstrap';
import Rating from '../components/Rating';
import Comment from '../components/Comment';
import Review from '../components/Review';
import { useDispatch } from 'react-redux';
import { getCartQTY } from '../actions/cartActions';
import '../CSS/productView.css';


export default function ProductView() {
    const dispatch = useDispatch();

    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [qty, setqty] = useState(1);
    const [stock, setstock] = useState([]);
    const [qtyleft, setqtyleft] = useState(0);
    const [p_id, setp_id] = useState();
    const [com, setcom] = useState(true);
    const [revshow, setrevshow] = useState(false);
    const [modalShow, setModalShow] = useState(false);


    const addToCartHandler = async (id) => {
        console.log(qty);
        await axios.post(`/cart/add/${id}/${qty}`, {}, { withCredentials: true })
            .then((response) => {
                if (response.status === 200) {
                    alert('Product was added to cart succesfully :)');
                    setqtyleft(qtyleft - qty);
                    console.log(qtyleft);
                    var x = Array.from({ length: qtyleft - qty }, (_, i) => i + 1);
                    setstock(x);
                    dispatch(getCartQTY());
                }
            })
            .catch((error) => {
                alert('The slected quantity of product is out of stock!');
                console.log(error);
            });
    }
    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get(`/product/allinfo/${id}`, { withCredentials: true })
            setProduct(data);
            console.log(data);
            console.log(data.productStock);
            var x = Array.from({ length: data.productStock }, (_, i) => i + 1);
            setstock(x);
            setqtyleft(data.productStock);
            console.log(stock);
            console.log(qtyleft);
            setp_id(data._id);
        };
        fecthData();
    }, []);
    useEffect(() => {
        const fecthData1 = async () => {
            const { data } = await axios.get(`/cart`);
            console.log(product._id);
            data.forEach(item => {
                if (item._id === product._id) {
                    setqtyleft(qtyleft - item.quantity);
                    console.log("hello")
                    var x = Array.from({ length: qtyleft - item.quantity }, (_, i) => i + 1);
                    setstock(x);
                }
            })
        };
        fecthData1();
    }, [com])




    const categoryOn = `/PL/Category/${product.productCategory}`;

    return (
        <div >
            <RBS.Breadcrumb className="bc breadcrumbz">
                <RBS.Breadcrumb.Item href="#">Home</RBS.Breadcrumb.Item>
                <RBS.Breadcrumb.Item href="/PL">Products
                </RBS.Breadcrumb.Item>
                <RBS.Breadcrumb.Item active>{product.productName}</RBS.Breadcrumb.Item>
            </RBS.Breadcrumb>
            <div className={'home__pv-section'}>
                <div className='container'>
                    <div
                        className='row home__pv-row'
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <div className='col'>
                            <div className='home__pv-img-wrapper'>
                                <img src={product.onlineImageLink} alt={product.productName} className='home__pv-img' />
                            </div>
                        </div>
                        <div className='col'>
                            {/* <div className='home__hero-text-wrapper'>
                                <div className='top-line'>{topLine}</div>
                                <h1 className={lightText ? 'heading' : 'heading dark'}>
                                    {headline}
                                </h1>
                                <p
                                    className={
                                        lightTextDesc
                                            ? 'home__hero-subtitle'
                                            : 'home__hero-subtitle dark'
                                    }
                                >
                                    {description}
                                </p>
                                <Link to='/sign-up'>
                                    <Button buttonSize='btn--wide' buttonColor='blue'>
                                        {buttonLabel}
                                    </Button>
                                </Link>
                            </div> */}
                            <RBS.Card className="text-left" style={{ width: '23rem' }}>
                                <RBS.Card.Body>
                                    <RBS.Card.Title className="prodTitle">{product.productName}</RBS.Card.Title>
                                    <RBS.Card.Subtitle className="text-muted">
                                        <Rating rating={product.productRating} numReviews={product.productNumofRatings} showViews={true}
                                        ></Rating>
                                    </RBS.Card.Subtitle>
                                    {(product.productStock > 0) ? <RBS.Card.Subtitle className="success">In Stock</RBS.Card.Subtitle> : <RBS.Card.Subtitle className="danger">Out of stock</RBS.Card.Subtitle>}
                                    {/* <RBS.Card.Subtitle className="price" >${product.productPrice}</RBS.Card.Subtitle> */}
                                    <div className={'view'}>
                                        <RBS.Card.Text className={'home__bs-price op '}>
                                            ${product.productPrice}
                                        </RBS.Card.Text>
                                        <RBS.Card.Text className={'home__bs-price view'}>
                                            &nbsp; ${product.productDCPrice}
                                        </RBS.Card.Text>
                                    </div>
                                    <RBS.Card.Text className="text-muted">
                                        {product.productDescription}
                                    </RBS.Card.Text>
                                    <RBS.Row >
                                        <RBS.Col xs lg="3">
                                            <RBS.Form.Control as="select"
                                                onChange={e => {
                                                    console.log(e.target.value);
                                                    setqty(e.target.value);
                                                }}>
                                                {
                                                    stock.map((x) => (
                                                        <option key={x} value={x}>{x}</option>
                                                    ))
                                                }
                                            </RBS.Form.Control>
                                        </RBS.Col>
                                        <RBS.Col>

                                            {(product.productStock > 0) ? <RBS.Button variant="warning" onClick={() => addToCartHandler(product._id)}><i className="fas fa-cart-plus"></i></RBS.Button> :
                                                <RBS.Button variant="warning" disabled><i className="fas fa-cart-plus"></i></RBS.Button>
                                            }
                                        </RBS.Col>
                                    </RBS.Row>
                                    <RBS.Card.Link href={categoryOn}>view similar products</RBS.Card.Link>
                                </RBS.Card.Body>
                            </RBS.Card>
                            <br></br>

                            {(typeof (product) !== 'undefined') ? <>
                                {console.log(product._id)}
                                <Comment id={product._id} />
                            </> : <></>}
                            {(typeof (p_id) !== 'undefined' && com) ? <>
                                {setcom(false)}
                            </> : <></>}



                            <>
                                <RBS.Card border="primary" style={{ width: '23rem' }} className="text-left">
                                    <RBS.Card.Header>
                                        <h6>Be the first to add a review!</h6>
                                    </RBS.Card.Header>
                                    <RBS.Card.Body>
                                        <RBS.Button variant="primary" onClick={() => setModalShow(true)}>
                                            + review
                               </RBS.Button>
                                    </RBS.Card.Body>
                                </RBS.Card>
                                <Review
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    id={product._id}
                                />
                            </>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// <RBS.Container>
// <RBS.Row >
//     <RBS.Col xs lg="5" >
//         <RBS.Figure>
//             <RBS.Figure.Image
//                 width={280}
//                 height={300}
//                 alt="171x180"
//                 src={product.onlineImageLink}
//             />
//         </RBS.Figure>
//     </RBS.Col>
//     <RBS.Col xs lg="5">
//         <RBS.Container>
//             <RBS.Row>
                // <RBS.Card className="text-left" style={{ width: '23rem' }}>
                //     <RBS.Card.Body>
                //         <RBS.Card.Title>{product.productName}</RBS.Card.Title>
                //         <RBS.Card.Subtitle className="mb-2 text-muted">
                //             <Rating rating={product.productRating} numReviews={product.productNumofRatings} showViews={true}
                //             ></Rating>
                //         </RBS.Card.Subtitle>
                //         {(product.productStock > 0) ? <RBS.Card.Subtitle className="success">In Stock</RBS.Card.Subtitle> : <RBS.Card.Subtitle className="danger">Out of stock</RBS.Card.Subtitle>}
                //         <RBS.Card.Subtitle className="mb-2 text-muted">${product.productPrice}</RBS.Card.Subtitle>
                //         <RBS.Card.Text>
                //             {product.productDescription}
                //         </RBS.Card.Text>
                //         <RBS.Row >
                //             <RBS.Col xs lg="3">
                //                 <RBS.Form.Control as="select"
                //                     onChange={e => {
                //                         console.log(e.target.value);
                //                         setqty(e.target.value);
                //                     }}>
                //                     {
                //                         stock.map((x) => (
                //                             <option key={x} value={x}>{x}</option>
                //                         ))
                //                     }
                //                 </RBS.Form.Control>
                //             </RBS.Col>
                //             <RBS.Col>

                //                 {(product.productStock > 0) ? <RBS.Button variant="warning" onClick={() => addToCartHandler(product._id)}><i className="fas fa-cart-plus"></i></RBS.Button> :
                //                     <RBS.Button variant="warning" disabled><i className="fas fa-cart-plus"></i></RBS.Button>
                //                 }
                //             </RBS.Col>
                //         </RBS.Row>
                //         <RBS.Card.Link href={categoryOn}>view similar products</RBS.Card.Link>
                //     </RBS.Card.Body>
                // </RBS.Card>
//             </RBS.Row>
//             <br></br>
//             <RBS.Row>
//                 {(typeof (p_id) !== 'undefined') ? <>
//                     <Comment id={p_id} />
//                 </> : <></>}
//                 {(typeof (p_id) !== 'undefined' && com) ? <>
//                     {setcom(false)}
//                 </> : <></>}
//             </RBS.Row>
//         </RBS.Container>
//     </RBS.Col>
// </RBS.Row>
// </RBS.Container>