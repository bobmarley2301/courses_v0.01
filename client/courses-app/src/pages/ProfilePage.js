import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faKey,
  faSave,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setIsLoading(true);

    try {
      // Тут буде логіка оновлення профілю
      setMessage({
        type: "success",
        text: "Профіль успішно оновлено!",
      });
    } catch (error) {
      setMessage({
        type: "danger",
        text: "Помилка при оновленні профілю. Спробуйте ще раз.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Будь ласка, увійдіть в систему для доступу до профілю.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card
            className="border-0 shadow-sm"
            data-aos="fade-up"
            style={{ borderRadius: "15px" }}
          >
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  style={{ fontSize: "4rem", color: "#3182ce" }}
                />
                <h2 className="mt-3 mb-2" style={{ color: "#2d3748" }}>
                  Мій профіль
                </h2>
                <p className="text-muted">Керуйте своїм обліковим записом</p>
              </div>

              {message.text && (
                <Alert
                  variant={message.type}
                  className="mb-4"
                  dismissible
                  onClose={() => setMessage({ type: "", text: "" })}
                >
                  {message.text}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <div className="position-relative">
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        position: "absolute",
                        left: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#718096",
                      }}
                    />
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ваше ім'я"
                      style={{
                        paddingLeft: "3rem",
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                      }}
                      disabled={isLoading}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <div className="position-relative">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{
                        position: "absolute",
                        left: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#718096",
                      }}
                    />
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Електронна пошта"
                      style={{
                        paddingLeft: "3rem",
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                      }}
                      disabled={isLoading}
                    />
                  </div>
                </Form.Group>

                <div className="mb-4">
                  <h5 className="mb-3" style={{ color: "#4a5568" }}>
                    Змінити пароль
                  </h5>
                  <Form.Group className="mb-3">
                    <div className="position-relative">
                      <FontAwesomeIcon
                        icon={faKey}
                        style={{
                          position: "absolute",
                          left: "15px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#718096",
                        }}
                      />
                      <Form.Control
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Поточний пароль"
                        style={{
                          paddingLeft: "3rem",
                          borderRadius: "10px",
                          border: "1px solid #e2e8f0",
                        }}
                        disabled={isLoading}
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Новий пароль"
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                      }}
                      disabled={isLoading}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Підтвердіть новий пароль"
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                      }}
                      disabled={isLoading}
                    />
                  </Form.Group>
                </div>

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
                  disabled={isLoading}
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
                      Зберегти зміни
                    </>
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
