import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getCourse } from '../api';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const { courseId } = useParams();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await getCourse(courseId);
                console.log('Fetched course data:', data); // Логування отриманих даних
                if (data && data.videos) {
                    setVideos(data.videos);
                } else {
                    throw new Error('No videos found in the response');
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
        AOS.init({
            duration: 1000,
            once: true
        });
    }, [courseId]);

    return (
        <Container fluid className="py-5">
            <Row>
                <Col>
                    <h2 className="text-center mb-4" data-aos="fade-up">Відео курсу {courseId}</h2>
                    <Row>
                        {videos.map((video, idx) => (
                            <Col xs={12} md={6} lg={4} key={video._id} className="mb-4">
                                <Card className="h-100 shadow-sm" data-aos="fade-up" data-aos-delay={idx * 100}>
                                    <Card.Img variant="top" src={video.thumbnail || 'https://via.placeholder.com/150'} />
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
