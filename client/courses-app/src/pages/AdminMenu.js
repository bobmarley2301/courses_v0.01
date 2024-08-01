import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createCourse, createUser } from '../api.js';

const AdminMenu = () => {
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [courseData, setCourseData] = useState({ title: '', description: '', image: '' });
    const [userData, setUserData] = useState({ username: '', email: '', password: '' });

    const handleShowCourseModal = () => setShowCourseModal(true);
    const handleCloseCourseModal = () => setShowCourseModal(false);

    const handleShowUserModal = () => setShowUserModal(true);
    const handleCloseUserModal = () => setShowUserModal(false);

    const handleCourseChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleCreateCourse = async () => {
        try {
            await createCourse(courseData);
            handleCloseCourseModal();
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    const handleCreateUser = async () => {
        try {
            await createUser(userData);
            handleCloseUserModal();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Admin Panel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/admin/courses">Courses</Nav.Link>
                            <Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
                        </Nav>
                        <Button variant="outline-success" onClick={handleShowCourseModal}>Create Course</Button>
                        <Button variant="outline-info" onClick={handleShowUserModal} className="ms-2">Create User</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Create Course Modal */}
            <Modal show={showCourseModal} onHide={handleCloseCourseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={courseData.title}
                                onChange={handleCourseChange}
                                placeholder="Enter course title"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={courseData.description}
                                onChange={handleCourseChange}
                                placeholder="Enter course description"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={courseData.image}
                                onChange={handleCourseChange}
                                placeholder="Enter course image URL"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCourseModal}>Close</Button>
                    <Button variant="primary" onClick={handleCreateCourse}>Create Course</Button>
                </Modal.Footer>
            </Modal>

            {/* Create User Modal */}
            <Modal show={showUserModal} onHide={handleCloseUserModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={handleUserChange}
                                placeholder="Enter username"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleUserChange}
                                placeholder="Enter email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={userData.password}
                                onChange={handleUserChange}
                                placeholder="Enter password"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUserModal}>Close</Button>
                    <Button variant="primary" onClick={handleCreateUser}>Create User</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminMenu;
