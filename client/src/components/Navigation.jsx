import { Nav, Container, Navbar, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { useUserLogoutMutation } from "../store/stateApi";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const [userLogout] = useUserLogoutMutation();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    await userLogout(user);
    navigate("/");
  };
  return (
    <Navbar bg="light">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" style={{ width: 65, height: 65 }} />
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle id="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            {!user && (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}

            <LinkContainer to="/chat">
              <Nav.Link>Chat</Nav.Link>
            </LinkContainer>

            {user && (
              <NavDropdown
                title={
                  <>
                    <img
                      src={`http://localhost:3500/uploads/${user.picturePath}`}
                      alt=""
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    />
                    {user.username}
                  </>
                }
              >
                <NavDropdown.Item>
                  <Button onClick={handleLogout} variant="danger">
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
