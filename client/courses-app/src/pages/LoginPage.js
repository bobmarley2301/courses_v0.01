import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginUser } from '../api';
import { AuthContext } from '../context/AuthContext';
// import './App.css';  // Додайте свій CSS файл з стилями

const LoginPage = () => {
    const { login } = useContext(AuthContext);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await loginUser(formData);
            login(userData);
            setModalMessage('Ви увійшли до системи');
            setShowModal(true);
        } catch (error) {
            alert('Помилка входу: ' + error.message);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/');
    };

    return (
        <>
            <CSSTransition classNames="login-page" timeout={300} in={true} appear>
                <Container fluid className="d-flex flex-column justify-content-center min-vh-100">
                    <Row className="justify-content-md-center" data-aos="fade-up">
                        <Col xs={12} md={6}>
                            <h2 className="text-center mb-4">Вхід</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Введіть ваш email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Введіть пароль"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="outline-dark" type="submit" className="w-100">
                                    Увійти
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </CSSTransition>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Повідомлення</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        ОК
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default LoginPage;
