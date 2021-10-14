import { useState } from "react";
import classes from "./Nav.module.scss"
import nav from '../ressources/nav.png'

const Nav = () => {
    const [clicked, setClicked] = useState(false);

    return (
        <nav className={classes['nav']}>
            {clicked && 
                <div></div>
            }
            {!clicked &&
                <img src={nav}></img>
            }
        </nav>
    );
}

export default Nav