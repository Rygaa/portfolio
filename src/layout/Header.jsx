import classes from "assets/4-layouts/Header.module.scss"
import Nav from "./Nav";
import logo from '../ressources/logo.png'

const Header = (props) => {
    return (
        <header className={classes['header']}>
            <img src={logo} className={classes['logo']}></img>
            <Nav></Nav>
        </header>
    );
}

export default Header
