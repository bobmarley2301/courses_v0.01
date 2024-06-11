// frontend/src/pages/VideoPlayer.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import YouTube from 'react-youtube';

const VideoPlayer = () => {
    const { courseId, videoId } = useParams();
    const video = {
        id: videoId,
        title: `Відео ${videoId}`,
        description: `Опис відео ${videoId}`,
        youtubeId: 'dQw4w9WgXcQ'
    };

    return (
        <Container fluid className="py-5">
            <Row>
                <Col md={8} className="mx-auto">
                    <h2 className="text-center mb-4">{video.title}</h2>
                    <YouTube videoId={video.youtubeId} className="w-100 mb-4" />
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
