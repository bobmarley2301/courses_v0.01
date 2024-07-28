import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link as ScrollLink, Element } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { getCourses, getCourse } from '../api.js'; // Import the function to get courses
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState([]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });

        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#FFFFFF';

        fetchCourses();

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
    const fetchCourse = async (courseId) => {
        try {
            const data = await getCourse(courseId);
            setCourse(data);
        } catch (error) {
            console.error('Error fetching course:', error);
            alert('There was an error fetching the course. Please try again later.');
        }
    }
        

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
                                Ми стар, розроблений двома ентузіастами, які прагнуть створити якісну платформу для онлайн-освіти. Ми чекаємо вашої підтримки, щоб продовжувати розвиватися.
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
                            <h2 className="text-center mb-3" style={{ color: 'white', fontSize: '2.5rem' }}>Наші курси</h2>
                            <p className="text-center mb-3" style={{ color: 'white', fontSize: '1.25rem' }}>Обирайте курс, який вас цікавить, і розпочніть навчання вже сьогодні!</p>
                        </Col>
                    </Row>
                    <Row>
                        {courses.map((course, index) => (
                            <Col md={4} key={index} className="mb-4">
                                <Card className="h-100" style={{ backgroundColor: '#333', color: 'white' }}>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '1.5rem' }}>{course.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{course.duration}</Card.Subtitle>
                                        <Card.Text style={{ fontSize: '1.25rem' }}>{course.description}</Card.Text>
                                        <Link to={`/course/${course.id}`} className="btn btn-outline-light">
                                            Переглянути курс
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Element>

            {/* Contact Section */}
            <Element name="contact-section">
                <Container className="py-5" data-aos="fade-up" style={{ marginBottom: '150px', marginTop: '150px' }}>
                    <Row className="mb-5">
                        <Col>
                            <h2 className="text-center mb-3" style={{ color: 'white', fontSize: '2.5rem' }}>Зв'язатися з нами</h2>
                            <p className="text-center mb-3" style={{ color: 'white', fontSize: '1.25rem' }}>Маєте питання? Залиште свої дані, і ми зв'яжемося з вами якомога швидше.</p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Form>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label style={{ color: 'white', fontSize: '1.25rem' }}>Ім'я</Form.Label>
                                    <Form.Control type="text" placeholder="Ваше ім'я" />
                                </Form.Group>
                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label style={{ color: 'white', fontSize: '1.25rem' }}>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Ваш email" />
                                </Form.Group>
                                <Form.Group controlId="formMessage" className="mb-3">
                                    <Form.Label style={{ color: 'white', fontSize: '1.25rem' }}>Повідомлення</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Ваше повідомлення" />
                                </Form.Group>
                                <Button variant="outline-light" type="submit">Відправити</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Element>

        </div>
    );
};

export default HomePage;