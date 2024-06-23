import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col    } from 'react-bootstrap';
import YouTube from 'react-youtube';
import axios from 'axios';
import './VideoPlayer.css'; // Імпорт вашого CSS файлу

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

    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\/shorts\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    if (loading) {
        return <p>Завантаження...</p>;
    }

    if (error) {
        return <p>Помилка: {error}</p>;
    }

    if (!video) {
        return <p>Відео не знайдено.</p>;
    }

    const videoIdFromUrl = getYouTubeId(video.videoUrl);

    if (!videoIdFromUrl) {
        return <p>Невірний формат відео URL.</p>;
    }

    return (
        <Container fluid className="py-5 video-player-container">
            <Row>
                <Col md={8} className="mx-auto text-center">
                    <h2 className="text-center mb-4">{video.title}</h2>
                    <div className="video-wrapper mb-4">
                        <YouTube videoId={videoIdFromUrl} opts={{ playerVars: { 'autoplay': 1 } }} className="w-100" />
                    </div>
                    <div className="description mb-4">
                        <p className="mb-2">{video.description.split('\n')[0]}</p>  
                        <p className="mb-0">{video.description.split('\n')[1]}</p>  
                    </div>
                    <Link to={`/course/${courseId}`} className="back-link">
                        &larr; Назад до списку відео
                    </Link>
                </Col>
            </Row>
        </Container>
    )
};

export default VideoPlayer;
