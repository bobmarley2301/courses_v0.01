import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Modal, Form, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createCourse, createUser, getCourses, deleteCourse, deleteVideo, createVideo, updateUser } from '../api.js';

const AdminMenu = () => {
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [courses, setCourses] = useState([]);
    const [courseData, setCourseData] = useState({ title: '', description: '', image: '' });
    const [userData, setUserData] = useState({ username: '', email: '', password: '', isAdmin: false });
    const [videoData, setVideoData] = useState({ title: '', url: '' });
    const [selectedCourseId, setSelectedCourseId] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleShowCourseModal = () => setShowCourseModal(true);
    const handleCloseCourseModal = () => setShowCourseModal(false);

    const handleShowUserModal = () => setShowUserModal(true);
    const handleCloseUserModal = () => setShowUserModal(false);

    const handleShowVideoModal = (courseId) => {
        setSelectedCourseId(courseId);
        setShowVideoModal(true);
    };
    const handleCloseVideoModal = () => setShowVideoModal(false);

    const handleCourseChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleVideoChange = (e) => {
        const { name, value } = e.target;
        setVideoData({ ...videoData, [name]: value });
    };

    const handleCreateCourse = async () => {
        try {
            await createCourse(courseData);
            handleCloseCourseModal();
            setCourseData({ title: '', description: '', image: '' });
            const updatedCourses = await getCourses();
            setCourses(updatedCourses);
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    const handleCreateUser = async () => {
        try {
            await createUser(userData);
            handleCloseUserModal();
            setUserData({ username: '', email: '', password: '', isAdmin: false });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleUpdateUser = async (userId, isAdmin) => {
        try {
            await updateUser(userId, { isAdmin });
            // Update users list or notify success
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleCreateVideo = async () => {
        try {
            await createVideo(selectedCourseId, videoData);
            handleCloseVideoModal();
            setVideoData({ title: '', url: '' });
            // Optionally, refresh course list or videos
        } catch (error) {
            console.error('Error creating video:', error);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            await deleteCourse(courseId);
            const updatedCourses = await getCourses();
            setCourses(updatedCourses);
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handleDeleteVideo = async (courseId, videoId) => {
        try {
            await deleteVideo(courseId, videoId);
            // Optionally, refresh course list or videos
        } catch (error) {
            console.error('Error deleting video:', error);
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

            <Container className="mt-4">
                <Row>
                    {courses.map((course) => (
                        <Col xs={12} md={6} lg={4} key={course._id} className="mb-4">
                            <Card className="h-100">
                                <Card.Img variant="top" src={course.image || 'https://via.placeholder.com/300?text=Курс'} />
                                <Card.Body>
                                    <Card.Title>{course.title}</Card.Title>
                                    <Card.Text>{course.description}</Card.Text>
                                    <Button variant="danger" onClick={() => handleDeleteCourse(course._id)}>Delete Course</Button>
                                    <Button variant="primary" onClick={() => handleShowVideoModal(course._id)} className="ms-2">Add Video</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

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
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                name="isAdmin"
                                label="Is Admin"
                                checked={userData.isAdmin}
                                onChange={() => setUserData({ ...userData, isAdmin: !userData.isAdmin })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUserModal}>Close</Button>
                    <Button variant="primary" onClick={handleCreateUser}>Create User</Button>
                </Modal.Footer>
            </Modal>

            {/* Add Video Modal */}
            <Modal show={showVideoModal} onHide={handleCloseVideoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={videoData.title}
                                onChange={handleVideoChange}
                                placeholder="Enter video title"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Video URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="url"
                                value={videoData.url}
                                onChange={handleVideoChange}
                                placeholder="Enter video URL"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseVideoModal}>Close</Button>
                    <Button variant="primary" onClick={handleCreateVideo}>Add Video</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminMenu;
