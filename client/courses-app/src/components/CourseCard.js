// frontend/src/components/CourseCard.js
import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClock,
  faUsers,
  faChevronRight,
  faCalendarAlt,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  // Функція для форматування дати
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Функція для форматування ціни
  const formatPrice = (price) => {
    return new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency: "UAH",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card
      className="h-100"
      data-aos="fade-up"
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "15px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-10px)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(49, 130, 206, 0.2)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      }}
    >
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <Card.Img
          variant="top"
          src={course.image || "https://via.placeholder.com/300?text=Курс"}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            display: "flex",
            gap: "5px",
          }}
        >
          <Badge
            bg="primary"
            style={{
              backgroundColor: "#3182ce",
              padding: "8px 12px",
              borderRadius: "20px",
              fontSize: "0.9rem",
            }}
          >
            {course.level === "beginner" && "Початковий"}
            {course.level === "intermediate" && "Середній"}
            {course.level === "advanced" && "Просунутий"}
          </Badge>
        </div>
      </div>
      <Card.Body
        style={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Card.Title
          style={{
            color: "#2b6cb0",
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          <FontAwesomeIcon
            icon={faBook}
            style={{
              marginRight: "10px",
              color: "#3182ce",
            }}
          />
          {course.title}
        </Card.Title>
        <Card.Text
          style={{
            color: "#4a5568",
            fontSize: "1.1rem",
            lineHeight: "1.6",
            flex: "1 1 auto",
          }}
        >
          {course.description}
        </Card.Text>

        {course.technologies && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
              marginTop: "10px",
            }}
          >
            {course.technologies.map((tech, index) => (
              <Badge
                key={index}
                bg="light"
                style={{
                  backgroundColor: "#EDF2F7",
                  color: "#4A5568",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  fontSize: "0.9rem",
                }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "10px 0",
            borderTop: "1px solid #e2e8f0",
            color: "#4a5568",
          }}
        >
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <FontAwesomeIcon icon={faClock} style={{ marginRight: "5px" }} />
              {course.duration}
            </span>
            <span>
              <FontAwesomeIcon icon={faUsers} style={{ marginRight: "5px" }} />
              {course.students} студентів
            </span>
          </div> */}

          {course.startDate && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{ marginRight: "5px" }}
              />
              Початок: {formatDate(course.startDate)}
            </div>
          )}

          {course.price && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon icon={faTag} style={{ marginRight: "5px" }} />
              Вартість: {formatPrice(course.price)}
            </div>
          )}
        </div>

        <Button
          as={Link}
          to={`/course/${course._id}`}
          style={{
            backgroundColor: "transparent",
            border: "2px solid #3182ce",
            color: "#3182ce",
            padding: "12px 25px",
            borderRadius: "30px",
            fontSize: "1.1rem",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginTop: "10px",
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
          Переглянути курс
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
