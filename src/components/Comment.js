import React, { useState, useEffect } from 'react'
import * as RBS from 'react-bootstrap';
import axios from 'axios';
import Rating from './Rating';
import Review from './Review';

function Comment(id) {
    const [comments, setComments] = useState([]);
    const [idd, setidd] = useState();
    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get(`/comment/${id.id}`, { withCredentials: true })
            setComments(data);
        };
        setidd(id.id)
        console.log(id);
        fecthData();
    }, []);

    return (
        <div>
            {(() => {
                if (comments.length > 0) {
                    return (
                        <>
                            {
                                comments.map(comment => (<div key={comment._id}>
                                    <RBS.Card border="primary" style={{ width: '23rem' }}>
                                        <RBS.Card.Header>
                                            <RBS.Row >
                                                <RBS.Col >{comment.user}</RBS.Col>
                                                <RBS.Col > <Rating rating={comment.rating} showViews={false}></Rating></RBS.Col>
                                            </RBS.Row>
                                        </RBS.Card.Header>
                                        <RBS.Card.Body>
                                            <RBS.Card.Text className="text-left">
                                                {comment.content}
                                            </RBS.Card.Text>
                                        </RBS.Card.Body>
                                    </RBS.Card>
                                </div>))
                            }

                        </>
                    )
                }
            })()}
        </div>

    )
}
export default Comment;