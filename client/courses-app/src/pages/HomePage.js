// frontend/src/pages/HomePage.js
import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link as ScrollLink, Element } from 'react-scroll';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <Container fluid className="p-5 bg-dark text-white text-center mt-0">
                <h1 className="display-3 mb-4">Welcome to Courses App</h1>
                <p className="lead mb-5">Discover and enroll in the best courses to boost your skills.</p>
                <ScrollLink
                    to="about-section"
                    smooth={true}
                    duration={500}
                    className="btn btn-outline-light btn-lg"
                >
                    Learn More
                </ScrollLink>
            </Container>

            {/* About Section */}
            <Element name="about-section">
                <Container className="py-5" data-aos="fade-up">
                    <Row className="mb-4">
                        <Col>
                            <h2 className="text-center mb-3">About Us</h2>
                            <p className="text-center">
                                We offer a wide range of courses to help you develop new skills and advance your career.
                                Our courses are designed and delivered by industry experts to ensure the highest quality education.
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <Col xs={12} md={4} key={idx}>
                                <Card className="mb-4 shadow-sm" style={{ borderRadius: '15px' }}>
                                    <Card.Img variant="top" src={`https://via.placeholder.com/300?text=Course+${idx + 1}`} style={{ borderRadius: '15px 15px 0 0' }} />
                                    <Card.Body>
                                        <Card.Title>Course {idx + 1}</Card.Title>
                                        <Card.Text>
                                            This is a brief description of Course {idx + 1}. Learn the essentials and advanced topics.
                                        </Card.Text>
                                        <Button variant="primary">Learn More</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Element>

            {/* Courses Section */}
            <Element name="courses-section">
                <Container fluid className="bg-light py-5" data-aos="fade-up">
                    <Container>
                        <Row className="mb-4">
                            <Col>
                                <h2 className="text-center mb-3">Our Courses</h2>
                                <p className="text-center">
                                    Explore our diverse range of courses tailored to meet your learning needs.
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <Col xs={12} md={4} key={idx}>
                                    <Card className="mb-4 shadow-sm" style={{ borderRadius: '15px' }}>
                                        <Card.Img variant="top" src={`https://via.placeholder.com/300?text=Course+${idx + 4}`} style={{ borderRadius: '15px 15px 0 0' }} />
                                        <Card.Body>
                                            <Card.Title>Course {idx + 4}</Card.Title>
                                            <Card.Text>
                                                Dive deep into Course {idx + 4}. Enhance your knowledge and skills.
                                            </Card.Text>
                                            <Button variant="primary">Learn More</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </Container>
            </Element>

            {/* Testimonials Section */}
            <Element name="testimonials-section">
                <Container className="py-5" data-aos="fade-up">
                    <Row className="mb-4">
                        <Col>
                            <h2 className="text-center mb-3">Testimonials</h2>
                            <p className="text-center">
                                Hear from our satisfied students and see how our courses have impacted their careers.
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <Col xs={12} md={4} key={idx}>
                                <Card className="mb-4 shadow-sm" style={{ borderRadius: '15px' }}>
                                    <Card.Body>
                                        <Card.Text>
                                            <i>"Course {idx + 1} was fantastic! I learned so much and the instructors were amazing!"</i>
                                        </Card.Text>
                                        <Card.Footer>- Student {idx + 1}</Card.Footer>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Element>

            {/* Carousel Section */}
            <Element name="carousel-section">
                <Container fluid className="bg-light py-5" data-aos="fade-up">
                    <Container>
                        <Row className="mb-4">
                            <Col>
                                <h2 className="text-center mb-3">Featured Courses</h2>
                                <p className="text-center">
                                    Check out our featured courses!
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Carousel>
                                    {Array.from({ length: 3 }).map((_, idx) => (
                                        <Carousel.Item key={idx}>
                                            <img
                                                className="d-block w-100"
                                                src={`https://via.placeholder.com/800x400?text=Featured+Course+${idx + 1}`}
                                                alt={`Featured Course ${idx + 1}`}
                                                style={{ borderRadius: '15px' }}
                                            />
                                            <Carousel.Caption>
                                                <h3>Featured Course {idx + 1}</h3>
                                                <p>Explore the highlights of Course {idx + 1}.</p>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Element>

            {/* Contact Section */}
            <Element name="contact-section">
                <Container fluid className="bg-dark text-white py-5" data-aos="fade-up">
                    <Container>
                        <Row className="mb-4">
                            <Col>
                                <h2 className="text-center mb-3">Contact Us</h2>
                                <p className="text-center">
                                    Have questions? Get in touch with us and we will be happy to help.
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" style={{ borderRadius: '10px' }} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" style={{ borderRadius: '10px' }} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label">Message</label>
                                        <textarea className="form-control" id="message" rows="3" style={{ borderRadius: '10px' }}></textarea>
                                    </div>
                                    <Button variant="primary" type="submit">Submit</Button>
                                </form>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Element>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-5" style={{ borderRadius: '15px 15px 0 0' }}>
                <Container>
                    <Row>
                        <Col>
                            <p>&copy; 2024 Courses App. All rights reserved.</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default HomePage;
