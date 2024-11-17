import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link as ScrollLink, Element } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { getCourses } from '../api';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [comments, setComments] = useState([]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });

        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#FFFFFF';

        fetchCourses();
        fetchComments();

        return () => {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
        };
    }, []);

    const fetchCourses = async () => {
        try {
            const data = await getCourses();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
            alert('There was an error fetching the courses. Please try again later.');
        }
    };

    const fetchComments = async () => {
        try {
            const response = await fetch('https://courses-v0-01-server.onrender.com/api/contact');
            const data = await response.json();
            if (data.length === 0) {
                setComments([{ _id: 'default', name: 'Anonymous', message: 'No comments yet.' }]);
            } else {
                setComments(data.slice(-3).reverse()); // Get the latest 3 comments and reverse to display the newest first
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            alert('There was an error fetching the comments. Please try again later.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data being submitted:', formData);

        try {
            const response = await fetch('https://courses-v0-01-server.onrender.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                setFormData({ name: '', email: '', message: '' });
                fetchComments(); // Refresh comments after new submission
            } else {
                console.error('Form submission failed:', response.statusText);
                alert('Form submission failed. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting the form. Please try again later.');
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="hero-section" data-aos="fade-up">
                <Container fluid className="p-5 text-center mt-0 d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#121212' }}>
                    <h1 className="display-3 mb-4" style={{ color: 'white', fontSize: '3rem' }}>Ласкаво просимо до step_v_it</h1>
                    <p className="lead mb-5" style={{ color: 'white', fontSize: '1.5rem' }}>Ми стартап, розроблений двома людьми, і ми чекаємо вашої підтримки.</p>
                    <ScrollLink
                        to="about-section"
                        smooth={true}
                        duration={500}
                        className="btn btn-outline-light btn-lg"
                    >
                        Дізнатися більше
                    </ScrollLink>
                </Container>
            </div>

            {/* About Section */}
            <Element name="about-section">
                <Container className="py-5" data-aos="fade-up" style={{ marginBottom: '150px', marginTop: '150px' }}>
                    <Row className="mb-5">
                        <Col>
                            <h2 className="text-center mb-5" style={{ color: 'white', fontSize: '2.5rem' }}>Про нас</h2>
                            <p className="text-center mb-5" style={{ color: 'white', fontSize: '1.25rem' }}>
                                Ми стартап, розроблений двома ентузіастами, які прагнуть створити якісну платформу для онлайн-освіти. Ми чекаємо вашої підтримки, щоб продовжувати розвиватися.
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h5 className="mb-3" style={{ color: 'white', fontSize: '1.5rem' }}>Наша місія <FontAwesomeIcon icon={faBook} /></h5>
                            <p style={{ color: 'white', fontSize: '1.25rem' }}>Забезпечити людей навичками та знаннями, необхідними для успіху в кар'єрі, через доступну та доступну онлайн-освіту.</p>
                        </Col>
                        <Col md={6}>
                            <h5 className="mb-3" style={{ color: 'white', fontSize: '1.5rem' }}>Наше бачення <FontAwesomeIcon icon={faLaptopCode} /></h5>
                            <p style={{ color: 'white', fontSize: '1.25rem' }}>Бути провідною платформою для онлайн-освіти, сприяючи створенню спільноти навчальних та професійних навичок.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 className="mb-3" style={{ color: 'white', fontSize: '1.5rem' }}>Хто створює наші курси</h5>
                            <p style={{ color: 'white', fontSize: '1.25rem' }}>Наші курси розробляються експертами галузі з багаторічним досвідом. Вони включають практичні завдання та реальні приклади, щоб забезпечити максимальну користь для наших студентів. Ми співпрацюємо з провідними професіоналами, щоб гарантувати, що наші курси відповідають найвищим стандартам якості.</p>
                        </Col>
                    </Row>
                </Container>
            </Element>

            {/* Courses Section */}
            <Element name="courses-section">
                <Container className="py-5" data-aos="fade-up" style={{ marginBottom: '150px', marginTop: '150px' }}>
                    <Row className="mb-5">
                        <Col>
                            <h2 className="text-center mb-5" style={{ color: 'white', fontSize: '2.5rem' }}>Наші курси</h2>
                            <p className="text-center mb-5" style={{ color: 'white', fontSize: '1.25rem' }}>Ознайомтесь з нашими найновішими курсами, створеними для вашого успіху.</p>
                        </Col>
                    </Row>
                    <Row>
                        {courses.map((course) => (
                            <Col md={4} key={course.id}>
                                <Card className="mb-4" style={{ backgroundColor: '#1f1f1f', color: 'white' }}>
                                    <Card.Body>
                                        <Card.Title>{course.title}</Card.Title>
                                        <Card.Text>{course.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Row className="justify-content-center">
                        <Col md={4} className="text-center">
                            <Button variant="outline-light" as={Link} to="/course">Переглянути всі курси</Button>
                        </Col>
                    </Row>
                </Container>
            </Element>

            {/* Reviews Section */}
            <Element name="reviews-section">
                <Container className="py-5" data-aos="fade-up" style={{ marginBottom: '150px', marginTop: '150px' }}>
                    <Row className="mb-5">
                        <Col>
                            <h2 className="text-center mb-5" style={{ color: 'white', fontSize: '2.5rem' }}>Відгуки</h2>
                            <p className="text-center mb-5" style={{ color: 'white', fontSize: '1.25rem' }}>Ознайомтесь з відгуками наших користувачів.</p>
                        </Col>
                    </Row>
                    <Row>
                        {comments.map((comment) => (
                            <Col md={4} key={comment._id}>
                                <Card className="mb-4" style={{ backgroundColor: '#1f1f1f', color: 'white' }}>
                                    <Card.Body>
                                        <Card.Title>{comment.name}</Card.Title>
                                        <Card.Text>{comment.message}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Element>

            <Element>
                <Container>
                    <Row className={"justify-content-center mb-5"}>
                        <h2 className="text-center mb-3 text-white">Підтримайте на Patreon</h2>
                        <p className="text-center mb-3 text-white">Для провадження нових проектів :)</p>
                    </Row>
                    <Row className="justify-content-center mb-5 text-center">
                        <a href="https://www.patreon.com/yourpage" target="_blank" rel="noopener noreferrer">
                            <button className="btn btn-lg btn-outline-light px-5 py-3 text-white border-0 shadow-lg">
                                Підтримати
                            </button>
                        </a>
                    </Row>
                </Container>
            </Element>



            {/* Contact Section */}
            <Element name="contact-section">
                <Container className="py-5" data-aos="fade-up" style={{ marginBottom: '150px', marginTop: '150px' }}>
                    <Row className="mb-5">
                        <Col>
                            <h2 className="text-center mb-3" style={{ color: 'white', fontSize: '2.5rem' }}>Напишіть відгук)</h2>
                            <p className="text-center mb-3" style={{ color: 'white', fontSize: '1.25rem' }}>Скарги або пропозиції все сюда:)</p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label style={{ color: 'white', fontSize: '1.25rem' }}>Ім'я</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ваше ім'я"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label style={{ color: 'white', fontSize: '1.25rem' }}>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Ваш email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formMessage" className="mb-3">
                                    <Form.Label style={{ color: 'white', fontSize: '1.25rem' }}>Повідомлення</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Ваше повідомлення"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="outline-light" type="submit">Надіслати</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Element>
        </div>
    );
};

export default HomePage;
