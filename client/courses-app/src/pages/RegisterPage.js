import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUser } from '../api';

const RegisterPage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        const { name, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            alert('Паролі не співпадають');
            return;
        }

        try {
            await createUser({ name, email, password });
            setModalMessage('Реєстрація успішна');
            setShowModal(true);
        } catch (error) {
            alert('Помилка реєстрації: ' + error.message);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/login');
    };

    return (
        <>
            <CSSTransition classNames="register-page" timeout={300} in={true} appear>
                <Container className="py-5">
                    <Row className="justify-content-md-center" data-aos="fade-up">
                        <Col xs={12} md={6}>
                            <h2 className="text-center mb-4">Реєстрація</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label>Ім'я</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Введіть ваше ім'я"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

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

                                <Form.Group controlId="formConfirmPassword" className="mb-3">
                                    <Form.Label>Підтвердіть пароль</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Підтвердіть пароль"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="outline-dark" type="submit" className="w-100">
                                    Зареєструватися
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

export default RegisterPage;