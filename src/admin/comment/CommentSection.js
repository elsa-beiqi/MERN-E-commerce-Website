import React, { useEffect, useState } from 'react';
import './Comment.css';
import { Button } from '../../components/button/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Rating from '../../components/Rating';

function HeroSection({
    approved,
    _id,
    content,
    rating,
    user,
    productID,
}) {
    const [src, setsrc] = useState('')
    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get(`/product/allinfo/${productID}`, { withCredentials: true })
            setsrc(data.onlineImageLink);
        };
        fecthData();
    }, [])
    const [set, setset] = useState(false);
    const approvecomment = async () => {
        console.log("hi")
        await axios.put(`pm/approvecomment/${_id}`, { withCredentials: true })
            .then((response) => {
                console.log(response.statusText);
                (response.statusText === 'OK') ? setset(true) : <></>

            })
    }
    const denycomment = async () => {
        await axios.put(`pm/denycomment/${_id}`, { withCredentials: true })
    }
    return (
        <>
            <div
                className={'comment-section weneedmargin'}
            >
                <div className='container-c'>
                    <div
                        className='row-c comment-row'
                        style={{
                            display: 'flex',
                            flexDirection: 'row-reverse'
                        }}
                    >
                        <div className='col-c'>
                            <div className='comment-text-wrapper'>
                                <div className='top-line-c'>
                                    <Rating
                                        rating={rating}
                                        showViews={false}
                                    ></Rating>
                                </div>
                                <h1 className={'heading-c dark'}>
                                    {content}
                                </h1>
                                <p className={'comment-subtitle dark'} >
                                    {user}
                                </p>
                                {(!set) ?
                                    <>
                                        <Button buttonSize='btn--wide' buttonColor='blue' onClick={approvecomment}>
                                            approve
                                    </Button>
                                        <Button buttonSize='btn--wide' buttonColor='blue' onClick={denycomment}>
                                            deny
                                    </Button></>
                                    : <Button buttonSize='btn--wide' buttonColor='blue' >
                                        changes saved
                                    </Button>}
                            </div>
                        </div>
                        <div className='col'>
                            <div className='comment-img-wrapper'>
                                <img src={src} alt="img" className='comment-img' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSection;