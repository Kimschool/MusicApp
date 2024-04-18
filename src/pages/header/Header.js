
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import "./Header.css";
const Header = () => {
    return(
        <>
            <Navbar bg="dark" variant="light">
                <Container>
                <Navbar.Brand as={Link} to="/">
                    <strong className="mochiy-pop-one-regular">🌕 ダルビッマル</strong>
                </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;