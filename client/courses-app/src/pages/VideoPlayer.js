import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faVideo,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import YouTube from "react-youtube";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  const { courseId, videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `https://courses-v0-01-server.onrender.com/api/course/${courseId}/video/${videoId}`
        );
        setVideo(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVideo();
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, [courseId, videoId]);

  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\/shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "3rem", height: "3rem" }}
          />
          <p className="mt-3 text-muted">Завантаження відео...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 min-vh-100">
        <div
          className="text-center p-5 rounded-3"
          style={{
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <h3 className="text-danger mb-3">Помилка</h3>
          <p className="text-danger mb-4">{error}</p>
          <Button as={Link} to={`/course/${courseId}`} variant="outline-danger">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Повернутися до курсу
          </Button>
        </div>
      </Container>
    );
  }

  if (!video) {
    return (
      <Container className="py-5 min-vh-100">
        <div className="text-center">
          <h3 className="text-muted mb-4">Відео не знайдено</h3>
          <Button as={Link} to={`/course/${courseId}`} variant="primary">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Повернутися до курсу
          </Button>
        </div>
      </Container>
    );
  }

  const videoIdFromUrl = getYouTubeId(video.videoUrl);

  if (!videoIdFromUrl) {
    return (
      <Container className="py-5 min-vh-100">
        <div className="text-center">
          <h3 className="text-muted mb-4">Невірний формат відео URL</h3>
          <Button as={Link} to={`/course/${courseId}`} variant="primary">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Повернутися до курсу
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-vh-100">
      <Container className="py-4 py-md-5">
        <Button
          as={Link}
          to={`/course/${courseId}`}
          variant="link"
          className="text-decoration-none mb-4 d-inline-flex align-items-center"
          style={{ color: "#3182CE" }}
          data-aos="fade-right"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          <span className="d-none d-sm-inline">Повернутися до курсу</span>
          <span className="d-sm-none">Назад</span>
        </Button>

        <Row className="g-4">
          <Col lg={8} className="mx-auto" data-aos="fade-up">
            <div className="rounded-3 shadow-sm overflow-hidden">
              <div
                className="video-wrapper position-relative"
                style={{ paddingBottom: "56.25%" }}
              >
                <YouTube
                  videoId={videoIdFromUrl}
                  opts={{
                    height: "100%",
                    width: "100%",
                    playerVars: {
                      autoplay: 1,
                      modestbranding: 1,
                      rel: 0,
                    },
                  }}
                  className="position-absolute top-0 start-0 w-100 h-100"
                />
              </div>

              <div className="p-4">
                <h1
                  className="h3 mb-4"
                  style={{ color: "#2D3748", wordBreak: "break-word" }}
                >
                  <FontAwesomeIcon
                    icon={faVideo}
                    className="me-2 text-primary"
                  />
                  {video.title}
                </h1>

                <div className="description-section">
                  <h2 className="h5 mb-3 d-flex align-items-center">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="me-2 text-primary"
                    />
                    Опис
                  </h2>
                  <p
                    className="text-muted mb-0"
                    style={{
                      fontSize: "calc(0.9rem + 0.1vw)",
                      lineHeight: "1.6",
                    }}
                  >
                    {video.description}
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VideoPlayer;
