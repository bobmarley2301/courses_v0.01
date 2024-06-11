// frontend/src/components/CourseListSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

const CourseListSidebar = ({ courses }) => {
    return (
        <ListGroup variant="flush" className="shadow-sm rounded">
            {courses.map((course, idx) => (
                <ListGroup.Item
                    key={idx}
                    action
                    as={Link}
                    to={`/course/${course.id}`}
                    className="d-flex justify-content-between align-items-center"
                >
                    {course.title}
                    <i className="fas fa-chevron-right"></i>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default CourseListSidebar;

