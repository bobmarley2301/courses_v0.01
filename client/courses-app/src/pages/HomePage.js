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

        // Apply styles to body for a black theme with neon text
        document.body.style.backgroundColor = '#121212';

        // Clear styles on component unmount
        return () => {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
        };
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <Container fluid className="p-5 text-center mt-0">
                <h1 className="display-3 mb-4" style={{ color: 'white' }}>Ласкаво просимо до Courses App</h1>
                <p className="lead mb-5" style={{ color: 'white' }}>Відкрийте для себе та запишіться на найкращі курси, щоб підвищити свої навички.</p>
                <ScrollLink
                    to="about-section"
                    smooth={true}
                    duration={500}
                    className="btn btn-outline-light btn-lg"
                >
                    Дізнатися більше
                </ScrollLink>
            </Container>

            {/* About Section */}
            <Element name="about-section">
                <Container className="py-5" data-aos="fade-up">
                    <Row className="mb-5">
                        <Col>
                            <h2 className="text-center mb-3" style={{ color: 'white' }}>Про нас</h2>
                            <p className="text-center mb-4" style={{ color: 'white' }}>
                                У Courses App ми прагнемо надати якісну освіту, щоб допомогти вам досягти своїх кар'єрних цілей. Наші курси ретельно розроблені та проводяться експертами галузі.
                            </p>
                            <Row className="justify-content-center">
                                <Col xs={12} md={10} className="d-flex align-items-center">
                                    <div style={{ flexShrink: 0, width: '150px', height: '150px', overflow: 'hidden', marginRight: '1rem' }}>
                                        <img src="https://via.placeholder.com/150" alt="Про нас" className="img-fluid rounded-circle shadow-sm" />
                                    </div>
                                    <div>
                                        <h5 className="mb-3" style={{ color: 'white' }}>Наша місія</h5>
                                        <p style={{ color: 'white' }}>Забезпечити людей навичками та знаннями, необхідними для успіху в кар'єрі, через доступну та доступну онлайн-освіту.</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="justify-content-center mt-4">
                                <Col xs={12} md={10} className="d-flex align-items-center">
                                    <div style={{ flexShrink: 0, width: '150px', height: '150px', overflow: 'hidden', marginRight: '1rem' }}>
                                        <img src="https://via.placeholder.com/150" alt="Про нас" className="img-fluid rounded-circle shadow-sm" />
                                    </div>
                                    <div>
                                        <h5 className="mb-3" style={{ color: 'white' }}>Наше бачення</h5>
                                        <p style={{ color: 'white' }}>Бути провідною платформою для онлайн-освіти, сприяючи створенню спільноти навчальних та професійних навичок.</p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Element>

            {/* Courses Section */}
            <Element name="courses-section">
                <Container fluid className="py-5" data-aos="fade-up">
                    <Container>
                        <Row className="mb-5">
                            <Col>
                                <h2 className="text-center mb-3" style={{ color: 'white' }}>Наші курси</h2>
                                <p className="text-center" style={{ color: 'white' }}>
                                    Досліджуйте наш широкий вибір курсів, адаптованих до ваших навчальних потреб.
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            {Array.from({ length: 3 }).map((_, idx) => (
                                <Col xs={12} md={4} key={idx}>
                                    <Card className="mb-5 shadow-sm" style={{ borderRadius: '15px', backgroundColor: '#333', border: 'none', color: 'white' }}>
                                        <Card.Img variant="top" src={`https://via.placeholder.com/300?text=Курс+${idx + 1}`} style={{ borderRadius: '15px 15px 0 0' }} />
                                        <Card.Body>
                                            <Card.Title>Курс {idx + 1}</Card.Title>
                                            <Card.Text>
                                                Це короткий опис Курсу {idx + 1}. Вивчайте основи та передові теми.
                                            </Card.Text>
                                            <Button variant="outline-light">Дізнатися більше</Button>
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
                    <Row className="mb-5">
                        <Col>
                            <h2 className="text-center mb-3" style={{ color: 'white' }}>Відгуки</h2>
                            <p className="text-center" style={{ color: 'white' }}>
                                Дізнайтеся, що наші студенти говорять про наші курси.
                            </p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={12} md={8}>
                            <Carousel>
                                {Array.from({ length: 3 }).map((_, idx) => (
                                    <Carousel.Item key={idx}>
                                        <div className="d-flex justify-content-center">
                                            <Card style={{ maxWidth: '600px', backgroundColor: '#333', border: 'none', color: 'white' }}>
                                                <Card.Body>
                                                    <blockquote className="blockquote mb-0">
                                                        <p>"Цей курс був дивовижним і дійсно допоміг мені покращити мої навички!"</p>
                                                        <footer className="blockquote-footer text-white">
                                                            Студент {idx + 1}
                                                        </footer>
                                                    </blockquote>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </Col>
                    </Row>
                </Container>
            </Element>
        </div>
    );
};

export default HomePage;
