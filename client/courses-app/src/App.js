import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import VideoList from './pages/VideoList';
import VideoPlayer from './pages/VideoPlayer';
import RegisterPage from './pages/RegisterPage';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoginPage from "./pages/LoginPage";
import AuthProvider, { AuthContext } from './context/AuthContext';
import AdminMenu from './pages/AdminMenu';
import PrivacyPolicy from './pages/PrivacyPolicy';

const AppNavbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand>
                    <img src='/image_2024-07-13_12-10-54.png' height={40} alt='Logo' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/">Головна</Nav.Link>
                        <Nav.Link as={Link} to="/course">Курси</Nav.Link>
                        {user ? (
                            <>
                                <NavDropdown title={user.name} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={logout}>Вийти</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <NavDropdown title="Користувач" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/register">Реєстрація</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/login">Увійти</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="d-flex flex-column min-vh-100">
                    <header>
                        <AppNavbar />
                    </header>
                    <main className="flex-grow-1">
                        <Container>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/course" element={<CoursesPage />} />
                                <Route path="/course/:courseId" element={<VideoList />} />
                                <Route path="/course/:courseId/video/:videoId" element={<VideoPlayer />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/admin/*" element={<AdminMenu />} />
                                <Route path="/privacy-policy" element="PrivacyPolicy"></Route>
                            </Routes>
                        </Container>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;