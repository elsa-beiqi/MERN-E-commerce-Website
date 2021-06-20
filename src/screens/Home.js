import React from 'react'
import * as RBS from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {

    return (
        <div className="idk">
            <RBS.Carousel className="idk">
                <RBS.Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="https://cdm0lfbn.cloudimg.io/v7/_origin_/image_uploader/photos/9e/original/pablo-picasso.jpg?p=large"
                        alt="First slide"
                        height={550}
                    />
                    <RBS.Carousel.Caption>
                        <h3>Shop the finest pieces of art</h3>
                        <p>Painted by Ahmad Da Vinci</p>
                    </RBS.Carousel.Caption>
                </RBS.Carousel.Item>
                <RBS.Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="https://www.digipen.edu/sites/default/files/public/img/academics/01-hero/digipen-student-animation-adija.jpg"
                        alt="Second slide"
                        height={550}
                    />
                    <RBS.Carousel.Caption>
                        <h3>Explore your artistic side with our products</h3>
                        <p>Your world lies in your canvas</p>
                    </RBS.Carousel.Caption>
                </RBS.Carousel.Item>
                <RBS.Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.texascentral.com/wp-content/uploads/2019/02/connecting_arts_communities_blogbanner.png"
                        alt="Third slide"
                        height={550}
                    />
                    <RBS.Carousel.Caption>
                        <h3>Create your own world</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </RBS.Carousel.Caption>
                </RBS.Carousel.Item>
            </RBS.Carousel>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <RBS.Row>
                <RBS.Col xs lg="5" className="imggg orr">
                    <RBS.Image fluid src="https://media.edutopia.org/styles/responsive_2880px_original/s3/masters/2020-03/P7XH13%20%281%29.jpg" rounded height={250} />
                </RBS.Col>
                <RBS.Col className="imggg ora">
                    <RBS.Card fluid >
                        <RBS.Card.Body className="bgColor ora">
                            <Link to="/PL">
                                <RBS.Card.Text className="orange">
                                    <h1> Shop your art supplies, &</h1>
                                    <h1>get creative</h1>
                                </RBS.Card.Text>
                            </Link>
                        </RBS.Card.Body>
                    </RBS.Card>
                </RBS.Col>
            </RBS.Row>
            <br></br>
            <br></br>
        </div>

    )
}
