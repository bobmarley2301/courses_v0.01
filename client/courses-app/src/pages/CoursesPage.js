import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { getCourses } from '../api.js';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });

        // Fetch courses from API
        const fetchCourses = async () => {
            try {
                const data = await getCourses();
                console.log(data); // Log the fetched data
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <Container fluid className="py-5">
            <Row>
                <Col md={9} data-aos="fade-left">
                    <Row className="mb-4">
                        <Col>
                            <h2 className="text-center mb-3">Наші курси</h2>
                            <p className="text-center">
                                Досліджуйте наш широкий вибір курсів, адаптованих до ваших навчальних потреб.
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        {courses.map((course, idx) => (
                            <Col xs={12} md={6} lg={4} key={idx} className="mb-4">
                                <Card className="h-100 shadow-sm">
                                    <Card.Img variant="top" src={course.image || 'https://via.placeholder.com/300?text=Курс'} />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{course.title}</Card.Title>
                                        <Card.Text>{course.description}</Card.Text>
                                        <Button
                                            as={Link}
                                            to={`/course/${course._id}`}
                                            variant="outline-dark"
                                            className="mt-auto align-self-start"
                                        >
                                            Переглянути курс
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default CoursesPage;
