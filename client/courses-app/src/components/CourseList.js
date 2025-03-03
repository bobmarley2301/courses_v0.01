// frontend/src/components/CourseList.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CourseCard from "./CourseCard";

const CourseList = ({ courses }) => {
  return (
    <Container>
      <Row>
        {courses.map((course, idx) => (
          <Col xs={12} md={4} key={idx}>
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CourseList;
