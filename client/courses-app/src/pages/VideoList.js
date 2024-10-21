import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getCourse } from '../api';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [course, setCourse] = useState(null);
    const [error, setError] = useState(null);
    const { courseId } = useParams();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await getCourse(courseId);
                console.log('Fetched course data:', data);
                if (data) {
                    setCourse(data);
                    if (data.videos) {
                        setVideos(data.videos);
                    } else {
                        throw new Error('No videos found in the response');
                    }
                } else {
                    throw new Error('Course not found');
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
        AOS.init({
            duration: 1000,
            once: true
        });
    }, [courseId]);

    if (error) {
        return (
            <Container className="py-5">
                <p className="text-center text-danger">{error}</p>
            </Container>
        );
    }

    if (!course) {
        return (
            <Container className="py-5 d-flex justify-content-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container fluid className="py-5 min-vh-100">
            <Row>
                <Col>
                    <Link to="/course" className="text-dark mb-4 d-block" data-aos="fade-up">
                        &larr; Назад до списку курсів
                    </Link>
                    <h2 className="text-center mb-4" data-aos="fade-up">
                        Відео курсу {course.title}
                    </h2>
                    <Row>
                        {videos.map((video, idx) => (
                            <Col xs={12} key={video._id} className="mb-4">
                                <Card className="h-100 shadow-sm" data-aos="fade-up" data-aos-delay={idx * 100}>
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{video.title}</Card.Title>
                                        <Card.Text>{video.description}</Card.Text>
                                        <Button
                                            as={Link}
                                            to={`/course/${courseId}/video/${video._id}`}
                                            variant="outline-dark"
                                            className="mt-auto align-self-start"
                                        >
                                            Переглянути відео
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

export default VideoList;
