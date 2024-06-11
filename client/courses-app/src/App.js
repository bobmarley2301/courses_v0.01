// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";

const App = () => {
    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Courses App</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/add-course">Add Course</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/add-course" element={<CoursesPage />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
