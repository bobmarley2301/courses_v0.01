import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import VideoList from "./pages/VideoList";
import VideoPlayer from "./pages/VideoPlayer";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoginPage from "./pages/LoginPage";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import AdminPage from "./pages/AdminPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProfilePage from "./pages/ProfilePage";
import CodeEditorPage from "./pages/CodeEditorPage";

const AppNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    // Очищаємо всі дані автентифікації
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");

    // Викликаємо функцію logout з контексту
    logout();

    // Перенаправляємо на головну сторінку
    window.location.href = "/";
  };

  return (
    <Navbar
      bg="white"
      variant="light"
      expand="lg"
      className="mb-4 shadow-sm fixed-top"
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        padding: "0.5rem 0",
        zIndex: 1000,
      }}
    >
      <Container>
        <Navbar.Brand>
          <img
            src="/image_2024-07-13_12-10-54.png"
            height={35}
            alt="Logo"
            style={{
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarNav"
          style={{
            border: "none",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            transition: "background-color 0.3s ease",
          }}
          className="hover-effect"
        />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              style={{
                color: "#2D3748",
                fontWeight: "500",
                padding: "0.5rem 1rem",
                transition: "all 0.3s ease",
                borderRadius: "0.5rem",
                fontSize: "0.95rem",
              }}
              className="hover-effect"
            >
              Головна
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/course"
              style={{
                color: "#2D3748",
                fontWeight: "500",
                padding: "0.5rem 1rem",
                transition: "all 0.3s ease",
                borderRadius: "0.5rem",
                fontSize: "0.95rem",
              }}
              className="hover-effect"
            >
              Курси
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/code-editor"
              style={{
                color: "#2D3748",
                fontWeight: "500",
                padding: "0.5rem 1rem",
                transition: "all 0.3s ease",
                borderRadius: "0.5rem",
                fontSize: "0.95rem",
              }}
              className="hover-effect"
            >
              Редактор коду
            </Nav.Link>
            {isAuthenticated ? (
              <NavDropdown
                title={
                  <div className="d-flex align-items-center">
                    <i
                      className="fas fa-user-circle me-2"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <span style={{ color: "#2D3748", fontWeight: "500" }}>
                      {userName || "Користувач"}
                    </span>
                  </div>
                }
                id="user-nav-dropdown"
                style={{
                  color: "#2D3748",
                  fontWeight: "500",
                  padding: "0.5rem 1rem",
                  transition: "all 0.3s ease",
                  borderRadius: "0.5rem",
                  fontSize: "0.95rem",
                }}
                className="hover-effect"
              >
                <div
                  className="px-3 py-2"
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}
                >
                  <div style={{ color: "#718096", fontSize: "0.9rem" }}>
                    {userEmail}
                  </div>
                  <div style={{ color: "#4A5568", fontSize: "0.85rem" }}>
                    {userRole === "admin" ? "Адміністратор" : "Користувач"}
                  </div>
                </div>
                <NavDropdown.Item
                  as={Link}
                  to="/profile"
                  style={{
                    color: "#2D3748",
                    fontWeight: "500",
                    padding: "0.5rem 1.5rem",
                    transition: "all 0.3s ease",
                    fontSize: "0.95rem",
                  }}
                  className="hover-effect"
                >
                  <i className="fas fa-user me-2"></i>
                  Мій профіль
                </NavDropdown.Item>
                {userRole === "admin" && (
                  <NavDropdown.Item
                    as={Link}
                    to="/admin"
                    style={{
                      color: "#2D3748",
                      fontWeight: "500",
                      padding: "0.5rem 1.5rem",
                      transition: "all 0.3s ease",
                      fontSize: "0.95rem",
                    }}
                    className="hover-effect"
                  >
                    <i className="fas fa-cog me-2"></i>
                    Панель адміністратора
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item
                  onClick={handleLogout}
                  style={{
                    color: "#E53E3E",
                    fontWeight: "500",
                    padding: "0.5rem 1.5rem",
                    transition: "all 0.3s ease",
                    fontSize: "0.95rem",
                  }}
                  className="hover-effect"
                >
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Вийти
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                title={
                  <span style={{ color: "#2D3748", fontWeight: "500" }}>
                    Увійти
                  </span>
                }
                id="auth-nav-dropdown"
                style={{
                  color: "#2D3748",
                  fontWeight: "500",
                  padding: "0.5rem 1rem",
                  transition: "all 0.3s ease",
                  borderRadius: "0.5rem",
                  fontSize: "0.95rem",
                }}
                className="hover-effect"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/login"
                  style={{
                    color: "#2D3748",
                    fontWeight: "500",
                    padding: "0.5rem 1.5rem",
                    transition: "all 0.3s ease",
                    fontSize: "0.95rem",
                  }}
                  className="hover-effect"
                >
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Увійти
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/register"
                  style={{
                    color: "#2D3748",
                    fontWeight: "500",
                    padding: "0.5rem 1.5rem",
                    transition: "all 0.3s ease",
                    fontSize: "0.95rem",
                  }}
                  className="hover-effect"
                >
                  <i className="fas fa-user-plus me-2"></i>
                  Реєстрація
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Оновлюємо стилі для навбара
const styles = `
  .hover-effect:hover {
    background-color: #F7FAFC;
    color: #3182CE !important;
  }
  
  .nav-link {
    position: relative;
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background-color: #3182CE;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  .nav-link:hover::after {
    width: 80%;
  }
  
  .dropdown-menu {
    border: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .dropdown-item:hover {
    background-color: #F7FAFC;
    color: #3182CE !important;
  }

  @media (max-width: 991.98px) {
    .navbar-collapse {
      padding: 1rem;
      border-radius: 0.5rem;
      margin-top: 0.5rem;
    }

    .nav-link::after {
      display: none;
    }

    .nav-link {
      padding: 0.75rem 1rem !important;
    }

    .dropdown-menu {
      border: none;
      box-shadow: none;
      padding-left: 1rem;
    }
  }

  @media (min-width: 992px) {
    .navbar {
      padding: 0.8rem 0;
    }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <header>
            <AppNavbar />
          </header>
          <main className="flex-grow-1" style={{ marginTop: "80px" }}>
            <Container>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/course" element={<CoursesPage />} />
                <Route path="/course/:courseId" element={<VideoList />} />
                <Route
                  path="/course/:courseId/video/:videoId"
                  element={<VideoPlayer />}
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/code-editor" element={<CodeEditorPage />} />
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
