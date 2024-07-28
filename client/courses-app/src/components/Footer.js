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
                        <button onClick={() => window.location.href = 'https://facebook.com'} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'underline', cursor: 'pointer', marginRight: '1rem', margin: '0.25rem' }}>
                            <i className="fab fa-facebook-f"></i>
                        </button>
                        <button onClick={() => window.location.href = 'https://twitter.com'} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'underline', cursor: 'pointer', marginRight: '1rem', margin: '0.25rem' }}>
                            <i className="fab fa-twitter"></i>
                        </button>
                        <button onClick={() => window.location.href = 'https://instagram.com'} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'underline', cursor: 'pointer', margin: '0.25rem' }}>
                            <i className="fab fa-instagram"></i>
                        </button>
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