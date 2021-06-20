import React, { useState } from 'react'
import * as RBS from 'react-bootstrap';
import axios from 'axios';

function Review(props, id) {
    const [one, setone] = useState('far fa-star');
    const [two, settwo] = useState('far fa-star');
    const [three, setthree] = useState('far fa-star');
    const [four, setfour] = useState('far fa-star');
    const [five, setfive] = useState('far fa-star');
    const [star, setstar] = useState(0)
    const [comment, setcomment] = useState("")
    const [validated, setValidated] = useState(false);

    function oneChange() {
        setone('fa fa-star')
        settwo('far fa-star')
        setthree('far fa-star')
        setfour('far fa-star')
        setfive('far fa-star')
        setstar('1');
    }
    function twoChange() {
        setone('fa fa-star')
        settwo('fa fa-star')
        setthree('far fa-star')
        setfour('far fa-star')
        setfive('far fa-star')
        setstar('2');
    }
    function threeChange() {
        setone('fa fa-star')
        settwo('fa fa-star')
        setthree('fa fa-star')
        setfour('far fa-star')
        setfive('far fa-star')
        setstar('3');
    }
    function fourChange() {
        setone('fa fa-star')
        settwo('fa fa-star')
        setthree('fa fa-star')
        setfour('fa fa-star')
        setfive('far fa-star')
        setstar('4');
    }
    function fiveChange() {
        setone('fa fa-star')
        settwo('fa fa-star')
        setthree('fa fa-star')
        setfour('fa fa-star')
        setfive('fa fa-star')
        setstar('5');
    }

    const fetchdata = async () => {
        console.log(comment);
        console.log(star);
        console.log(props.id)
        await axios.post(`/comment/${props.id}`, { content: comment, rating: star, approved: false }, { withCredentials: true })
            .then((response) => {
                console.log(response);
                alert("Your Comment has been added!")
            })
            .catch((error) => {

                alert(error.response.data);
            });
    }
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

        } else {
            fetchdata();
            console.log("hiii")
        }
        setValidated(true)

    };

    return (

        <RBS.Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onSubmit={handleSubmit}
        >
            <RBS.Modal.Header closeButton>
                <RBS.Modal.Title id="contained-modal-title-vcenter">
                    Write your review
            </RBS.Modal.Title>
            </RBS.Modal.Header>
            <RBS.Form noValidate validated={validated} onClick={handleSubmit}>
                <RBS.Modal.Body>

                    <RBS.FormGroup controlId="validationCustom01">
                        <RBS.Form.Label>Rating</RBS.Form.Label>
                        <div key={`custom-inline`} className="mb-3">
                            <i className={one} onClick={oneChange}></i>
                            <i className={two} onClick={twoChange}></i>
                            <i className={three} onClick={threeChange}></i>
                            <i className={four} onClick={fourChange}></i>
                            <i className={five} onClick={fiveChange}></i>
                        </div>
                    </RBS.FormGroup>

                    <RBS.FormGroup controlId="validationCustom01">
                        <RBS.Form.Label>Review</RBS.Form.Label>
                        <RBS.Form.Control as="textarea" rows={3} placeholder="write your review..." required useref={comment} onChange={(event) => { setcomment(event.target.value) }}
                        />
                    </RBS.FormGroup>

                </RBS.Modal.Body>
                <RBS.Modal.Footer>
                    <RBS.Button >Submit</RBS.Button>
                </RBS.Modal.Footer>
            </RBS.Form>
        </RBS.Modal>
    );
}
export default Review;
