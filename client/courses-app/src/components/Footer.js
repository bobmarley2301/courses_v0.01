// frontend/src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-auto">
            <Container>
                <Row>
                    <Col md={4} className="text-center text-md-left mb-3 mb-md-0">
                        <h5>Про нас</h5>
                        <p>Ми пропонуємо найкращі онлайн курси для вашого навчання.</p>
                    </Col>
                    <Col md={4} className="text-center mb-3 mb-md-0">
                        <h5>Контакти</h5>
                        <p>Email: info@coursesapp.com</p>
                        <p>Телефон: +380 123 456 789</p>
                    </Col>
                    <Col md={4} className="text-center text-md-right">
                        <h5>Соціальні мережі</h5>
                        <a href="#" className="text-white mr-3 m-1">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-white mr-3 m-1">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-white m-1">
                            <i className="fab fa-instagram"></i>
                        </a>
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
