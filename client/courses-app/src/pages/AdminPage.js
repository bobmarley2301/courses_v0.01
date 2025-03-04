import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Alert,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faLock,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      fetchCourses();
    } else {
      setError("Невірний пароль");
    }
  };

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://courses-v0-01-server.onrender.com/api/course"
      );
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        throw new Error("Помилка завантаження курсів");
      }
    } catch (error) {
      setError("Помилка при отриманні курсів");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title || "",
        description: course.description || "",
        imageUrl: course.imageUrl || "",
      });
    } else {
      setEditingCourse(null);
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCourse(null);
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const url = editingCourse
        ? `https://courses-v0-01-server.onrender.com/api/course/${editingCourse._id}`
        : "https://courses-v0-01-server.onrender.com/api/course";
      const method = editingCourse ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          editingCourse ? "Курс успішно оновлено" : "Курс успішно створено"
        );
        handleCloseModal();
        fetchCourses();
      } else {
        throw new Error(data.message || "Помилка при збереженні курсу");
      }
    } catch (error) {
      setError(error.message || "Помилка при збереженні курсу");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Ви впевнені, що хочете видалити цей курс?")) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://courses-v0-01-server.onrender.com/api/course/${courseId}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          setSuccess("Курс успішно видалено");
          fetchCourses();
        } else {
          const data = await response.json();
          throw new Error(data.message || "Помилка при видаленні курсу");
        }
      } catch (error) {
        setError(error.message || "Помилка при видаленні курсу");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <FontAwesomeIcon
                    icon={faLock}
                    style={{ fontSize: "3rem", color: "#3182ce" }}
                  />
                  <h2 className="mt-3">Вхід в адмін панель</h2>
                </div>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                      placeholder="Введіть пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        borderRadius: "10px",
                        padding: "12px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100"
                    style={{
                      background: "linear-gradient(45deg, #3182ce, #2c5282)",
                      border: "none",
                      padding: "12px",
                      borderRadius: "10px",
                      fontSize: "1rem",
                      fontWeight: "500",
                    }}
                  >
                    Увійти
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Управління курсами</h2>
        <Button
          onClick={() => handleShowModal()}
          style={{
            background: "linear-gradient(45deg, #3182ce, #2c5282)",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Додати курс
        </Button>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="mb-4">
          {success}
        </Alert>
      )}

      <Card className="border-0 shadow-sm">
        <Card.Body>
          {isLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Завантаження...</span>
              </div>
            </div>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Назва</th>
                  <th>Опис</th>
                  <th>Зображення</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>{course.description}</td>
                    <td>
                      {course.imageUrl && (
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowModal(course)}
                        disabled={isLoading}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(course._id)}
                        disabled={isLoading}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingCourse ? "Редагувати курс" : "Додати новий курс"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Назва курсу</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={isLoading}
                style={{
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Опис</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                disabled={isLoading}
                style={{
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL зображення</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                disabled={isLoading}
                style={{
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                }}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                disabled={isLoading}
                style={{
                  borderRadius: "10px",
                  padding: "8px 20px",
                }}
              >
                Скасувати
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                style={{
                  background: "linear-gradient(45deg, #3182ce, #2c5282)",
                  border: "none",
                  borderRadius: "10px",
                  padding: "8px 20px",
                }}
              >
                {isLoading ? (
                  <span>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Збереження...
                  </span>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSave} className="me-2" />
                    Зберегти
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminPage;
