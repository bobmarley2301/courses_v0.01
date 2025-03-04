import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../api";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginUser(formData);
      console.log("Login response:", response);

      if (response && response._id) {
        // Викликаємо функцію login з контексту
        login(response);

        // Перенаправляємо на сторінку курсів
        navigate("/course");
      } else {
        throw new Error("Помилка отримання даних користувача");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.status === 401) {
        setError("Невірний email або пароль");
      } else if (error.status === 404) {
        setError("Сервіс тимчасово недоступний");
      } else if (error.status === 400) {
        setError("Будь ласка, перевірте правильність введених даних");
      } else {
        setError("Помилка входу. Спробуйте ще раз пізніше.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    backgroundColor: "#f8f9fa",
    border: "1px solid #e2e8f0",
    color: "#2d3748",
    borderRadius: "12px",
    padding: "0.8rem 1rem 0.8rem 3rem",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    height: "auto",
    "&::placeholder": {
      color: "#a0aec0",
    },
  };

  const iconStyle = {
    position: "absolute",
    top: "50%",
    left: "15px",
    transform: "translateY(-50%)",
    color: "#3182ce",
    fontSize: "1.1rem",
    transition: "all 0.3s ease",
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5">
      <Container className="px-4" style={{ maxWidth: "450px" }}>
        <Card
          className="border-0 p-4 p-md-5"
          data-aos="fade-up"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          <div className="text-center mb-4">
            <h2
              className="mb-2"
              style={{
                color: "#2d3748",
                fontSize: "2.2rem",
                fontWeight: "600",
                letterSpacing: "0.5px",
              }}
            >
              Вхід
            </h2>
            <p className="text-muted mb-4">
              Увійдіть у свій обліковий запис для доступу до курсів
            </p>
          </div>

          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <Form.Group>
              <div className="position-relative">
                <FontAwesomeIcon icon={faUser} style={iconStyle} />
                <Form.Control
                  type="email"
                  placeholder="Електронна пошта"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  style={inputStyle}
                  disabled={isLoading}
                />
              </div>
            </Form.Group>

            <Form.Group>
              <div className="position-relative">
                <FontAwesomeIcon icon={faLock} style={iconStyle} />
                <Form.Control
                  type="password"
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  style={inputStyle}
                  disabled={isLoading}
                />
              </div>
            </Form.Group>

            <Button
              type="submit"
              className="w-100 mt-2"
              style={{
                background: "linear-gradient(45deg, #3182ce, #2c5282)",
                border: "none",
                padding: "12px",
                borderRadius: "12px",
                fontSize: "1.1rem",
                fontWeight: "500",
                letterSpacing: "0.5px",
                boxShadow: "0 4px 15px rgba(49, 130, 206, 0.2)",
                transition: "all 0.3s ease",
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
                  Вхід...
                </span>
              ) : (
                <>
                  Увійти
                  <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                </>
              )}
            </Button>

            <div className="text-center mt-4">
              <p className="text-muted mb-0">
                Немає акаунту?{" "}
                <Link
                  to="/register"
                  className="text-primary text-decoration-none"
                  style={{
                    fontWeight: "500",
                    transition: "color 0.3s ease",
                  }}
                >
                  Зареєструватися
                </Link>
              </p>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default LoginPage;
