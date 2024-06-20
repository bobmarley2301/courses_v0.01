import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import YouTube from 'react-youtube';
import axios from 'axios';

const VideoPlayer = () => {
    const { courseId, videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`http://localhost:4441/api/course/${courseId}/video/${videoId}`);
                setVideo(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchVideo();
    }, [courseId, videoId]);

    if (loading) {
        return <p>Завантаження...</p>;
    }

    if (error) {
        return <p>Помилка: {error}</p>;
    }

    if (!video) {
        return <p>Відео не знайдено.</p>;
    }

    return (
        <Container fluid className="py-5">
            <Row>
                <Col md={8} className="mx-auto">
                    <h2 className="text-center mb-4">{video.title}</h2>
                    <YouTube videoId={video.videoUrl} className="w-100 mb-4" />
                    <p>{video.description}</p>
                    <Button as={Link} to={`/course/${courseId}`} variant="outline-dark">
                        Назад до списку відео
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default VideoPlayer;
