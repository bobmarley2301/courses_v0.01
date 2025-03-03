import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  createCourse,
  createUser,
  getCourses,
  deleteCourse,
  deleteVideo,
  createVideo,
  updateUser,
} from "../api.js";

const AdminMenu = () => {
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [videoData, setVideoData] = useState({
    title: "",
    videoUrl: "",
    description: "",
  });
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchCourses();
  }, [navigate]);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://courses-v0-01-server.onrender.com/api/course",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Помилка при завантаженні курсів");
    }
  };

  const handleShowCourseModal = () => {
    setError("");
    setShowCourseModal(true);
  };
  const handleCloseCourseModal = () => setShowCourseModal(false);

  const handleShowUserModal = () => {
    setError("");
    setShowUserModal(true);
  };
  const handleCloseUserModal = () => setShowUserModal(false);

  const handleShowVideoModal = (courseId) => {
    setError("");
    setSelectedCourseId(courseId);
    setShowVideoModal(true);
  };
  const handleCloseVideoModal = () => setShowVideoModal(false);

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleVideoChange = (e) => {
    const { name, value } = e.target;
    setVideoData({ ...videoData, [name]: value });
  };

  const handleCreateCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://courses-v0-01-server.onrender.com/api/course",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(courseData),
        }
      );

      if (response.ok) {
        handleCloseCourseModal();
        setCourseData({ title: "", description: "", imageUrl: "" });
        await fetchCourses();
      } else {
        const data = await response.json();
        setError(data.message || "Помилка при створенні курсу");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      setError("Помилка при створенні курсу");
    }
  };

  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://courses-v0-01-server.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        handleCloseUserModal();
        setUserData({ name: "", email: "", password: "", role: "user" });
      } else {
        const data = await response.json();
        setError(data.message || "Помилка при створенні користувача");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Помилка при створенні користувача");
    }
  };

  const handleCreateVideo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://courses-v0-01-server.onrender.com/api/course/${selectedCourseId}/video`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(videoData),
        }
      );

      if (response.ok) {
        handleCloseVideoModal();
        setVideoData({ title: "", videoUrl: "", description: "" });
        await fetchCourses();
      } else {
        const data = await response.json();
        setError(data.message || "Помилка при додаванні відео");
      }
    } catch (error) {
      console.error("Error creating video:", error);
      setError("Помилка при додаванні відео");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://courses-v0-01-server.onrender.com/api/course/${courseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchCourses();
      } else {
        const data = await response.json();
        setError(data.message || "Помилка при видаленні курсу");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      setError("Помилка при видаленні курсу");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>Адмін панель</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Button variant="outline-primary" onClick={handleShowCourseModal}>
                Створити курс
              </Button>
              <Button
                variant="outline-info"
                onClick={handleShowUserModal}
                className="ms-2"
              >
                Створити користувача
              </Button>
            </Nav>
            <Button variant="outline-danger" onClick={handleLogout}>
              Вийти
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <Row>
          {courses.map((course) => (
            <Col xs={12} md={6} lg={4} key={course._id} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={
                    course.imageUrl ||
                    "https://via.placeholder.com/300?text=Курс"
                  }
                  alt={course.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <div className="d-flex gap-2">
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteCourse(course._id)}
                    >
                      Видалити курс
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleShowVideoModal(course._id)}
                    >
                      Додати відео
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Create Course Modal */}
      <Modal show={showCourseModal} onHide={handleCloseCourseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Створити курс</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Назва</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={courseData.title}
                onChange={handleCourseChange}
                placeholder="Введіть назву курсу"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Опис</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={courseData.description}
                onChange={handleCourseChange}
                placeholder="Введіть опис курсу"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL зображення</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={courseData.imageUrl}
                onChange={handleCourseChange}
                placeholder="Введіть URL зображення"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCourseModal}>
            Закрити
          </Button>
          <Button variant="primary" onClick={handleCreateCourse}>
            Створити курс
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create User Modal */}
      <Modal show={showUserModal} onHide={handleCloseUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Створити користувача</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ім'я</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userData.name}
                onChange={handleUserChange}
                placeholder="Введіть ім'я"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userData.email}
                onChange={handleUserChange}
                placeholder="Введіть email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={userData.password}
                onChange={handleUserChange}
                placeholder="Введіть пароль"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Роль</Form.Label>
              <Form.Select
                name="role"
                value={userData.role}
                onChange={handleUserChange}
              >
                <option value="user">Користувач</option>
                <option value="admin">Адміністратор</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUserModal}>
            Закрити
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Створити користувача
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Video Modal */}
      <Modal show={showVideoModal} onHide={handleCloseVideoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Додати відео</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Назва</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={videoData.title}
                onChange={handleVideoChange}
                placeholder="Введіть назву відео"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL відео</Form.Label>
              <Form.Control
                type="text"
                name="videoUrl"
                value={videoData.videoUrl}
                onChange={handleVideoChange}
                placeholder="Введіть URL відео"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Опис</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={videoData.description}
                onChange={handleVideoChange}
                placeholder="Введіть опис відео"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseVideoModal}>
            Закрити
          </Button>
          <Button variant="primary" onClick={handleCreateVideo}>
            Додати відео
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminMenu;
