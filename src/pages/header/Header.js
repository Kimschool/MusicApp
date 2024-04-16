
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import "./Header.css";
const Header = () => {
    return(
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="/image/images.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="달빛마루 로고"
                    />{' '}
                    <strong>달빛마루</strong>
                </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;