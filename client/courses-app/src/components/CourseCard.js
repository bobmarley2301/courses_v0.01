// frontend/src/components/CourseCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CourseCard = ({ course }) => {
    return (
        <Card className="mb-4 shadow-sm" style={{ borderRadius: '15px' }}>
            <Card.Img variant="top" src={course.image} style={{ borderRadius: '15px 15px 0 0' }} />
            <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Button variant="outline-dark">Дізнатися більше</Button>
            </Card.Body>
        </Card>
    );
};

export default CourseCard;
