import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  ProgressBar,
  Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faArrowLeft,
  faClock,
  faCheckCircle,
  faLock,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import { getCourse } from "../api";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { courseId } = useParams();

  // Функція для отримання прогресу з localStorage
  const getVideoProgress = (videoId) => {
    const progress = localStorage.getItem("videoProgress");
    if (progress) {
      const progressData = JSON.parse(progress);
      return progressData[videoId] || false;
    }
    return false;
  };

  // Функція для збереження прогресу в localStorage
  const saveVideoProgress = (videoId, completed) => {
    const progress = localStorage.getItem("videoProgress") || "{}";
    const progressData = JSON.parse(progress);
    progressData[videoId] = completed;
    localStorage.setItem("videoProgress", JSON.stringify(progressData));

    // Оновлюємо стан відео
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video._id === videoId ? { ...video, completed } : video
      )
    );
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const data = await getCourse(courseId);
        console.log("Fetched course data:", data);
        if (data) {
          setCourse(data);
          if (data.videos) {
            // Додаємо інформацію про прогрес до кожного відео
            const videosWithProgress = data.videos.map((video) => ({
              ...video,
              completed: getVideoProgress(video._id),
            }));
            setVideos(videosWithProgress);
          } else {
            throw new Error("Відео не знайдено");
          }
        } else {
          throw new Error("Курс не знайдено");
        }
      } catch (error) {
        setError(error.message);
        console.error("Помилка при завантаженні відео:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, [courseId]);

  // Функція для перемикання стану відео
  const toggleVideoCompletion = (videoId) => {
    const video = videos.find((v) => v._id === videoId);
    if (video) {
      saveVideoProgress(videoId, !video.completed);
    }
  };

  if (isLoading) {
    return (
      <Container className="py-5 d-flex flex-column align-items-center justify-content-center min-vh-100">
        <Spinner
          animation="border"
          variant="primary"
          style={{ width: "3rem", height: "3rem" }}
        />
        <p className="mt-3 text-muted">Завантаження відео курсу...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 min-vh-100">
        <div
          className="text-center p-5 rounded-3"
          style={{
            backgroundColor: "#FEE2E2",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <h3 className="text-danger mb-3">Помилка</h3>
          <p className="text-danger mb-4">{error}</p>
          <Button as={Link} to="/courses" variant="outline-danger">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Повернутися до курсів
          </Button>
        </div>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container className="py-5 min-vh-100">
        <div className="text-center">
          <h3 className="text-muted mb-4">Курс не знайдено</h3>
          <Button as={Link} to="/courses" variant="primary">
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Повернутися до курсів
          </Button>
        </div>
      </Container>
    );
  }

  const completedVideos = videos.filter((video) => video.completed).length;
  const progress = (completedVideos / videos.length) * 100;

  return (
    <div style={{ minHeight: "100vh" }}>
      <Container className="py-3 py-md-5">
        {/* Хедер курсу */}
        <div className="mb-4 mb-md-5" data-aos="fade-down">
          <Link
            to="/courses"
            className="text-decoration-none d-inline-flex align-items-center mb-3 mb-md-4"
            style={{ color: "#3182CE" }}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            <span className="d-none d-sm-inline">Повернутися до курсів</span>
            <span className="d-sm-none">Назад</span>
          </Link>

          <div className="bg-white p-3 p-md-4 rounded-3 shadow-sm">
            <h1
              className="mb-3 mb-md-4"
              style={{
                color: "#2D3748",
                fontSize: "calc(1.5rem + 1vw)",
                wordBreak: "break-word",
              }}
            >
              {course.title}
            </h1>
            <p
              className="text-muted mb-4"
              style={{
                fontSize: "calc(0.9rem + 0.2vw)",
                lineHeight: "1.6",
              }}
            >
              {course.description}
            </p>

            <div className="mb-4">
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2">
                <h6 className="mb-2 mb-sm-0">Прогрес курсу:</h6>
                <span className="text-muted">
                  {completedVideos} з {videos.length} відео
                </span>
              </div>
              <ProgressBar
                now={progress}
                label={`${Math.round(progress)}%`}
                style={{ height: "10px" }}
                variant="success"
              />
            </div>

            <Row className="g-3 g-md-4">
              <Col xs={6} md={4}>
                <div className="p-3 bg-light rounded-3">
                  <small className="text-muted d-block mb-1">
                    Всього відео:
                  </small>
                  <h5 className="mb-0">{videos.length}</h5>
                </div>
              </Col>
              <Col xs={6} md={4}>
                <div className="p-3 bg-light rounded-3">
                  <small className="text-muted d-block mb-1">
                    Переглянуто:
                  </small>
                  <h5 className="mb-0">{completedVideos}</h5>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="p-3 bg-light rounded-3">
                  <small className="text-muted d-block mb-1">Залишилось:</small>
                  <h5 className="mb-0">{videos.length - completedVideos}</h5>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* Список відео */}
        <div className="video-list">
          {videos.map((video, idx) => (
            <Card
              key={video._id}
              className="mb-3 border-0 shadow-sm"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <Card.Body className="p-3 p-md-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
                  <div className="flex-grow-1">
                    <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                      <h5
                        className="mb-0"
                        style={{
                          fontSize: "calc(1.1rem + 0.2vw)",
                          wordBreak: "break-word",
                        }}
                      >
                        {video.title}
                      </h5>
                      {video.completed && (
                        <Badge
                          bg="success"
                          className="d-inline-flex align-items-center"
                        >
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="me-1"
                          />
                          <span className="d-none d-sm-inline">
                            Переглянуто
                          </span>
                        </Badge>
                      )}
                      {video.locked && (
                        <Badge
                          bg="warning"
                          className="d-inline-flex align-items-center"
                        >
                          <FontAwesomeIcon icon={faLock} className="me-1" />
                          <span className="d-none d-sm-inline">
                            Заблоковано
                          </span>
                        </Badge>
                      )}
                    </div>
                    <p
                      className="text-muted mb-3"
                      style={{
                        fontSize: "calc(0.9rem + 0.1vw)",
                        lineHeight: "1.5",
                      }}
                    >
                      {video.description}
                    </p> 
                  </div>

                  <div className="d-flex gap-2 w-100 w-md-auto justify-content-between justify-content-md-start">
                    <Button
                      onClick={() => toggleVideoCompletion(video._id)}
                      variant={
                        video.completed
                          ? "outline-success"
                          : "outline-secondary"
                      }
                      className="px-3 d-inline-flex align-items-center justify-content-center"
                      style={{ minWidth: "44px", height: "44px" }}
                      title={
                        video.completed
                          ? "Позначити як непереглянуте"
                          : "Позначити як переглянуте"
                      }
                    >
                      <FontAwesomeIcon
                        icon={video.completed ? faTimes : faCheck}
                        className={video.completed ? "text-success" : ""}
                      />
                    </Button>

                    <Button
                      as={Link}
                      to={`/course/${courseId}/video/${video._id}`}
                      variant={video.locked ? "secondary" : "primary"}
                      className="px-3 px-md-4 flex-grow-1 flex-md-grow-0 d-inline-flex align-items-center justify-content-center"
                      style={{ minWidth: "140px" }}
                      disabled={video.locked}
                    >
                      <FontAwesomeIcon icon={faPlay} className="me-2" />
                      <span>{video.locked ? "Заблоковано" : "Дивитися"}</span>
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default VideoList;
