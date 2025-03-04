import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTelegram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-white border-top py-5"
      style={{
        boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container>
        <Row className="g-4">
          {/* Про нас */}
          <Col xs={12} md={4}>
            <div className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="text-primary me-2"
                  style={{ fontSize: "1.5rem" }}
                />
                <h5 className="mb-0" style={{ color: "#2D3748" }}>
                  Про нас
                </h5>
              </div>
              <p
                style={{
                  color: "#718096",
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                }}
              >
                Ми надаємо якісну освіту та професійні курси для розвитку ваших
                навичок. Наша місія - зробити освіту доступною та ефективною.
              </p>
            </div>
          </Col>

          {/* Контакти */}
          <Col xs={12} md={4}>
            <div className="mb-4">
              <h5 className="mb-3" style={{ color: "#2D3748" }}>
                Контакти
              </h5>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-primary me-2"
                  />
                  <a
                    href="mailto:info@example.com"
                    style={{
                      color: "#718096",
                      textDecoration: "none",
                      fontSize: "0.95rem",
                      transition: "color 0.3s ease",
                    }}
                    className="hover-link"
                  >
                    info@example.com
                  </a>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-primary me-2"
                  />
                  <a
                    href="tel:+380123456789"
                    style={{
                      color: "#718096",
                      textDecoration: "none",
                      fontSize: "0.95rem",
                      transition: "color 0.3s ease",
                    }}
                    className="hover-link"
                  >
                    +38 (012) 345-67-89
                  </a>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-primary me-2"
                  />
                  <span style={{ color: "#718096", fontSize: "0.95rem" }}>
                    м. Київ, вул. Прикладна, 1
                  </span>
                </div>
              </div>
            </div>
          </Col>

          {/* Соціальні мережі */}
          <Col xs={12} md={4}>
            <div className="mb-4">
              <h5 className="mb-3" style={{ color: "#2D3748" }}>
                Соціальні мережі
              </h5>
              <div className="d-flex gap-3">
                <a
                  href="#"
                  className="social-link"
                  style={{
                    color: "#718096",
                    fontSize: "1.5rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  href="#"
                  className="social-link"
                  style={{
                    color: "#718096",
                    fontSize: "1.5rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="#"
                  className="social-link"
                  style={{
                    color: "#718096",
                    fontSize: "1.5rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FontAwesomeIcon icon={faTelegram} />
                </a>
                <a
                  href="#"
                  className="social-link"
                  style={{
                    color: "#718096",
                    fontSize: "1.5rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </div>
            </div>
          </Col>
        </Row>

        {/* Нижня частина футера */}
        <div
          className="border-top pt-4 mt-4"
          style={{ borderColor: "rgba(0,0,0,0.1)" }}
        >
          <Row className="align-items-center">
            <Col xs={12} md={6}>
              <p
                className="mb-0"
                style={{ color: "#718096", fontSize: "0.9rem" }}
              >
                © {currentYear} Всі права захищено
              </p>
            </Col>
            <Col xs={12} md={6}>
              <div className="d-flex justify-content-md-end gap-3 mt-3 mt-md-0">
                <Link
                  to="/privacy-policy"
                  style={{
                    color: "#718096",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "color 0.3s ease",
                  }}
                  className="hover-link"
                >
                  Політика конфіденційності
                </Link>
                <Link
                  to="/terms"
                  style={{
                    color: "#718096",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "color 0.3s ease",
                  }}
                  className="hover-link"
                >
                  Умови використання
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      <style>
        {`
          .hover-link:hover {
            color: #3182CE !important;
          }
          
          .social-link:hover {
            color: #3182CE !important;
            transform: translateY(-2px);
          }
          
          @media (max-width: 767.98px) {
            footer {
              text-align: center;
            }
            
            .d-flex {
              justify-content: center;
            }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
