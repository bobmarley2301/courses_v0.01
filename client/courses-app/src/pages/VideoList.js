// frontend/src/pages/VideoList.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const VideoList = () => {
    const { courseId } = useParams();
    const videos = [
        { id: 1, title: 'Відео 1', description: 'Опис відео 1', thumbnail: 'https://via.placeholder.com/300?text=Відео+1' },
        { id: 2, title: 'Відео 2', description: 'Опис відео 2', thumbnail: 'https://via.placeholder.com/300?text=Відео+2' },
        { id: 3, title: 'Відео 3', description: 'Опис відео 3', thumbnail: 'https://via.placeholder.com/300?text=Відео+3' }
    ];

    React.useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    return (
        <Container fluid className="py-5">
            <Row>
                <Col>
                    <h2 className="text-center mb-4" data-aos="fade-up">Відео курсу {courseId}</h2>
                    <Row>
                        {videos.map((video, idx) => (
                            <Col xs={12} md={6} lg={4} key={idx} className="mb-4">
                                <Card className="h-100 shadow-sm" data-aos="fade-up" data-aos-delay={idx * 100}>
                                    <Card.Img variant="top" src={video.thumbnail} />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{video.title}</Card.Title>
                                        <Card.Text>{video.description}</Card.Text>
                                        <Button
                                            as={Link}
                                            to={`/course/${courseId}/video/${video.id}`}
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
