import React, { useEffect, useState } from 'react';
import HeroSection from './CommentSection';
import './Comment.css'
import axios from 'axios';

export default function Home() {
    const [comments, setcomments] = useState([])
    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get(`/pm/allunapproved`, { withCredentials: true })
            setcomments(data);
        };
        fecthData();
    }, [])

    return (
        <>
            {comments.map((comment) => (
                <div key={comment._id}>
                    <HeroSection approved={comment.approved} _id={comment._id} content={comment.content} rating={comment.rating} user={comment.user} productID={comment.productID} />
                </div>
            ))}
        </>
    );
}

