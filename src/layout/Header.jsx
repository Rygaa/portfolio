import classes from "./Header.module.scss"
import Nav from "./Nav";
import logo from '../ressources/logo.png'

const Header = (props) => {
    return (
        <header className={classes['header']}>
            <img src={logo}></img>
            <Nav></Nav>
        </header>
    );
}

export default Header
