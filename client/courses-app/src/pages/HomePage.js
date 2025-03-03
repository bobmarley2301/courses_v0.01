import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link as ScrollLink, Element } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faLaptopCode,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { getCourses } from "../api";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#1a365d";

    fetchCourses();
    fetchComments();

    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    };
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      alert("There was an error fetching the courses. Please try again later.");
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        "https://courses-v0-01-server.onrender.com/api/contact"
      );
      const data = await response.json();
      if (data.length === 0) {
        setComments([
          { _id: "default", name: "Anonymous", message: "No comments yet." },
        ]);
      } else {
        setComments(data.slice(-3).reverse()); // Get the latest 3 comments and reverse to display the newest first
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      alert(
        "There was an error fetching the comments. Please try again later."
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data being submitted:", formData);

    try {
      const response = await fetch(
        "https://courses-v0-01-server.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        setFormData({ name: "", email: "", message: "" });
        fetchComments(); // Refresh comments after new submission
      } else {
        console.error("Form submission failed:", response.statusText);
        alert("Form submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again later.");
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      {/* Hero Section */}
      <div className="hero-section position-relative" data-aos="fade-up">
        <Container
          fluid
          className="p-5 text-center mt-0 d-flex flex-column justify-content-center align-items-center"
          style={{
            height: "100vh",
            backgroundColor: "#ffffff",
            position: "relative",
          }}
        >
          <h1
            className="display-3 mb-4"
            style={{
              color: "#2b6cb0",
              fontSize: "4rem",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Ласкаво просимо до step_v_it
          </h1>
          <p
            className="lead mb-5"
            style={{
              color: "#4a5568",
              fontSize: "1.8rem",
              maxWidth: "800px",
            }}
          >
            Ми стартап, розроблений двома людьми, і ми чекаємо вашої підтримки.
          </p>
          <ScrollLink
            to="about-section"
            smooth={true}
            duration={500}
            className="btn btn-outline-primary btn-lg"
            style={{
              backgroundColor: "transparent",
              border: "2px solid #3182ce",
              color: "#3182ce",
              padding: "15px 40px",
              borderRadius: "30px",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#3182ce";
              e.target.style.color = "#ffffff";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#3182ce";
            }}
          >
            Дізнатися більше
          </ScrollLink>
          <div
            className="scroll-indicator"
            style={{
              position: "absolute",
              bottom: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              animation: "bounce 2s infinite",
            }}
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ color: "#3182ce", fontSize: "2rem" }}
            />
          </div>
        </Container>
      </div>

      {/* About Section */}
      <Element name="about-section">
        <Container
          className="py-5"
          data-aos="fade-up"
          style={{
            marginBottom: "150px",
            marginTop: "150px",
            backgroundColor: "#f7fafc",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Row className="mb-5">
            <Col>
              <h2
                className="text-center mb-5"
                style={{
                  color: "#2b6cb0",
                  fontSize: "3rem",
                  fontWeight: "bold",
                }}
              >
                Про нас
              </h2>
              <p
                className="text-center mb-5"
                style={{
                  color: "#4a5568",
                  fontSize: "1.4rem",
                  lineHeight: "1.8",
                }}
              >
                Ми стартап, розроблений двома ентузіастами, які прагнуть
                створити якісну платформу для онлайн-освіти.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div
                className="feature-card"
                style={{
                  padding: "30px",
                  borderRadius: "15px",
                  backgroundColor: "#ffffff",
                  height: "100%",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(49, 130, 206, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px rgba(0, 0, 0, 0.1)";
                }}
              >
                <h5
                  className="mb-3"
                  style={{ color: "#2b6cb0", fontSize: "1.8rem" }}
                >
                  Наша місія{" "}
                  <FontAwesomeIcon
                    icon={faBook}
                    style={{ marginLeft: "10px", color: "#3182ce" }}
                  />
                </h5>
                <p
                  style={{
                    color: "#4a5568",
                    fontSize: "1.3rem",
                    lineHeight: "1.6",
                  }}
                >
                  Забезпечити людей навичками та знаннями, необхідними для
                  успіху в кар'єрі.
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div
                className="feature-card"
                style={{
                  padding: "30px",
                  borderRadius: "15px",
                  backgroundColor: "#ffffff",
                  height: "100%",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(49, 130, 206, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px rgba(0, 0, 0, 0.1)";
                }}
              >
                <h5
                  className="mb-3"
                  style={{ color: "#2b6cb0", fontSize: "1.8rem" }}
                >
                  Наше бачення{" "}
                  <FontAwesomeIcon
                    icon={faLaptopCode}
                    style={{ marginLeft: "10px", color: "#3182ce" }}
                  />
                </h5>
                <p
                  style={{
                    color: "#4a5568",
                    fontSize: "1.3rem",
                    lineHeight: "1.6",
                  }}
                >
                  Бути провідною платформою для онлайн-освіти.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Element>

      {/* Courses Section */}
      <Element name="courses-section">
        <Container className="py-5" data-aos="fade-up">
          <Row className="mb-5">
            <Col>
              <h2
                className="text-center mb-5"
                style={{
                  color: "#2b6cb0",
                  fontSize: "3rem",
                  fontWeight: "bold",
                }}
              >
                Наші курси
              </h2>
              <p
                className="text-center mb-5"
                style={{ color: "#4a5568", fontSize: "1.4rem" }}
              >
                Ознайомтесь з нашими найновішими курсами.
              </p>
            </Col>
          </Row>
          <Row>
            {courses.map((course) => (
              <Col md={4} key={course._id || `course-${course.title}`}>
                <Card
                  className="mb-4"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "15px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(49, 130, 206, 0.2)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <Card.Body>
                    <Card.Title
                      style={{
                        color: "#2b6cb0",
                        fontSize: "1.5rem",
                        marginBottom: "15px",
                      }}
                    >
                      {course.title}
                    </Card.Title>
                    <Card.Text style={{ color: "#4a5568", fontSize: "1.1rem" }}>
                      {course.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="justify-content-center mt-4">
            <Col md={4} className="text-center">
              <Button
                variant="outline-primary"
                as={Link}
                to="/course"
                style={{
                  backgroundColor: "transparent",
                  border: "2px solid #3182ce",
                  color: "#3182ce",
                  padding: "12px 30px",
                  borderRadius: "30px",
                  fontSize: "1.2rem",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#3182ce";
                  e.target.style.color = "#ffffff";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#3182ce";
                }}
              >
                Переглянути всі курси
              </Button>
            </Col>
          </Row>
        </Container>
      </Element>

      {/* Reviews Section */}
      <Element name="reviews-section">
        <Container
          className="py-5"
          data-aos="fade-up"
          style={{
            marginBottom: "150px",
            marginTop: "150px",
            backgroundColor: "#f7fafc",
            borderRadius: "20px",
            padding: "40px",
          }}
        >
          <Row className="mb-5">
            <Col>
              <h2
                className="text-center mb-5"
                style={{
                  color: "#2b6cb0",
                  fontSize: "3rem",
                  fontWeight: "bold",
                }}
              >
                Відгуки
              </h2>
              <p
                className="text-center mb-5"
                style={{ color: "#4a5568", fontSize: "1.4rem" }}
              >
                Ознайомтесь з відгуками наших користувачів.
              </p>
            </Col>
          </Row>
          <Row>
            {comments.map((comment) => (
              <Col
                md={4}
                key={comment._id || `comment-${Date.now()}-${Math.random()}`}
              >
                <Card
                  className="mb-4"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "15px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Card.Body>
                    <Card.Title
                      style={{ color: "#2b6cb0", fontSize: "1.3rem" }}
                    >
                      {comment.name}
                    </Card.Title>
                    <Card.Text style={{ color: "#4a5568" }}>
                      {comment.message}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Element>

      {/* Patreon Section */}
      <Element>
        <Container>
          <Row className={"justify-content-center mb-5"}>
            <h2
              className="text-center mb-3"
              style={{ color: "#2b6cb0", fontSize: "3rem", fontWeight: "bold" }}
            >
              Підтримайте на Patreon
            </h2>
            <p
              className="text-center mb-3"
              style={{ color: "#4a5568", fontSize: "1.4rem" }}
            >
              Для провадження нових проектів :)
            </p>
          </Row>
          <Row className="justify-content-center mb-5 text-center">
            <a
              href="https://www.patreon.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="btn btn-lg px-5 py-3"
                style={{
                  backgroundColor: "#3182ce",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "30px",
                  fontSize: "1.2rem",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 6px rgba(49, 130, 206, 0.2)",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#2b6cb0";
                  e.target.style.boxShadow =
                    "0 6px 8px rgba(49, 130, 206, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#3182ce";
                  e.target.style.boxShadow =
                    "0 4px 6px rgba(49, 130, 206, 0.2)";
                }}
              >
                Підтримати
              </button>
            </a>
          </Row>
        </Container>
      </Element>

      {/* Contact Section */}
      <Element name="contact-section">
        <Container
          className="py-5"
          data-aos="fade-up"
          style={{
            marginBottom: "150px",
            marginTop: "150px",
            backgroundColor: "#f7fafc",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Row className="mb-5">
            <Col>
              <h2
                className="text-center mb-3"
                style={{
                  color: "#2b6cb0",
                  fontSize: "3rem",
                  fontWeight: "bold",
                }}
              >
                Напишіть відгук
              </h2>
              <p
                className="text-center mb-3"
                style={{ color: "#4a5568", fontSize: "1.4rem" }}
              >
                Скарги або пропозиції все сюда :)
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-4">
                  <Form.Label style={{ color: "#2b6cb0", fontSize: "1.2rem" }}>
                    Ім'я
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ваше ім'я"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      color: "#4a5568",
                      padding: "12px",
                      borderRadius: "10px",
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-4">
                  <Form.Label style={{ color: "#2b6cb0", fontSize: "1.2rem" }}>
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ваш email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      color: "#4a5568",
                      padding: "12px",
                      borderRadius: "10px",
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formMessage" className="mb-4">
                  <Form.Label style={{ color: "#2b6cb0", fontSize: "1.2rem" }}>
                    Повідомлення
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Ваше повідомлення"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      color: "#4a5568",
                      padding: "12px",
                      borderRadius: "10px",
                    }}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button
                    variant="outline-primary"
                    type="submit"
                    style={{
                      backgroundColor: "transparent",
                      border: "2px solid #3182ce",
                      color: "#3182ce",
                      padding: "12px 40px",
                      borderRadius: "30px",
                      fontSize: "1.2rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#3182ce";
                      e.target.style.color = "#ffffff";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#3182ce";
                    }}
                  >
                    Надіслати
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </Element>
    </div>
  );
};

export default HomePage;
