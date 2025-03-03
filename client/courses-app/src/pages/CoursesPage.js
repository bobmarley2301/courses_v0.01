import React, { useEffect, useState } from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import CourseList from "../components/CourseList";
import { getCourses } from "../api";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userId = localStorage.getItem("userId");
    setIsAuthenticated(isAuthenticated && userId);

    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const apiCourses = await getCourses();
        console.log("Отримані курси:", apiCourses);

        if (Array.isArray(apiCourses)) {
          const coursesWithProgress = apiCourses.map((course) => {
            const progress = localStorage.getItem(
              `courseProgress_${course._id}`
            );
            const completedVideos = progress
              ? JSON.parse(progress).completedCount
              : 0;
            return {
              ...course,
              completedVideos,
              totalVideos: course.videos?.length || 0,
              progress: course.videos?.length
                ? Math.round((completedVideos / course.videos.length) * 100)
                : 0,
            };
          });

          const sortedCourses = coursesWithProgress.sort(
            (a, b) => b.students - a.students
          );
          setCourses(sortedCourses);
        } else {
          console.error("Неправильний формат даних курсів:", apiCourses);
          setError("Помилка формату даних курсів");
        }
      } catch (error) {
        console.error("Помилка при отриманні курсів:", error);
        setError("Не вдалося завантажити курси. Спробуйте пізніше.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && userId) {
      fetchCourses();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          minHeight: "100vh",
          paddingTop: "2rem",
        }}
      >
        <Container>
          <div className="text-center mb-5" data-aos="fade-down">
            <FontAwesomeIcon
              icon={faGraduationCap}
              style={{
                fontSize: "3rem",
                color: "#3182ce",
                marginBottom: "1rem",
              }}
            />
            <h1
              style={{
                color: "#2d3748",
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Наші курси
            </h1>
            <Alert
              variant="info"
              className="mx-auto"
              style={{ maxWidth: "600px" }}
            >
              <h4>Для перегляду курсів необхідно увійти в систему</h4>
              <p className="mb-3">
                Будь ласка, увійдіть в свій акаунт або зареєструйтеся, щоб
                отримати доступ до всіх курсів
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button as={Link} to="/login" variant="primary">
                  Увійти
                </Button>
                <Button as={Link} to="/register" variant="outline-primary">
                  Зареєструватися
                </Button>
              </div>
            </Alert>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        paddingTop: "2rem",
      }}
    >
      <Container>
        <div className="text-center mb-5" data-aos="fade-down">
          <FontAwesomeIcon
            icon={faGraduationCap}
            style={{
              fontSize: "3rem",
              color: "#3182ce",
              marginBottom: "1rem",
            }}
          />
          <h1
            style={{
              color: "#2d3748",
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Наші курси
          </h1>
          <p
            style={{
              color: "#718096",
              fontSize: "1.2rem",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            Досліджуйте наш широкий вибір курсів, створених для розвитку ваших
            навичок та досягнення професійних цілей. Кожен курс розроблений
            експертами галузі.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Завантаження...</span>
            </div>
            <p className="mt-3" style={{ color: "#718096" }}>
              Завантаження курсів...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-5">
            <p style={{ color: "#E53E3E", fontSize: "1.1rem" }}>{error}</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-5">
            <p style={{ color: "#718096", fontSize: "1.1rem" }}>
              На даний момент курси відсутні. Будь ласка, завітайте пізніше.
            </p>
          </div>
        ) : (
          <CourseList courses={courses} />
        )}
      </Container>
    </div>
  );
};

export default CoursesPage;
