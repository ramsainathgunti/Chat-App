import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

const Home = () => {
  return (
    <Row>
      <Col
        md={6}
        className="d-flex flex-direction-column justify-content-center align-items-center"
      >
        <div>
          <h2>Share the world with your friends</h2>
          <p>Chat App lets you connect with the world</p>
          <LinkContainer to="/chat">
            <Button variant="success">
              Get Started <i className="fas fa-comments home-message-icon"></i>
            </Button>
          </LinkContainer>
        </div>
      </Col>
      <Col md={6} className="home__bg"></Col>
    </Row>
  );
};

export default Home;
