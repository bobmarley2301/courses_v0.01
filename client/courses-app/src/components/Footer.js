import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-auto">
            <Container>
                <Row>
                    <Col md={4} className="text-center text-md-left mb-3 mb-md-0">
                        <h5>Про нас</h5>
                        <p>Ми пропонуємо найкращі аматорські онлайн-курси для вашого навчання.</p>
                    </Col>
                    <Col md={4} className="text-center mb-3 mb-md-0">
                        <h5>Контакти</h5>
                        <p>Email: <a href="mailto:aremcukdmitro240@gmail.com" className="text-white text-decoration-none">aremcukdmitro240@gmail.com</a></p>
                        <p>Телефон: <a href="tel:+380935321567" className="text-white text-decoration-none">+380 93 532 15 67</a></p>
                    </Col>
                    <Col md={4} className="text-center text-md-right">
                        <h5>Соціальні мережі</h5>
                        <div className="d-flex justify-content-center justify-content-md-end">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white me-3"
                                aria-label="Facebook"
                            >
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white me-3"
                                aria-label="Twitter"
                            >
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white"
                                aria-label="Instagram"
                            >
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="text-center">
                        <p>&copy; 2024 Courses App. Всі права захищені.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
