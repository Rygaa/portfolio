import { useEffect, useState } from "react";
import classes from "./Nav.module.scss"
import nav from '../ressources/nav.png'
import NavButton from "../componenets/NavButton";
import { useSelector } from "react-redux";

const Nav = (props) => {
    const [clicked, setClicked] = useState(false);
    const dashboardRef = useSelector((state) => state.pages.dashboardRef)
    const projectsRef = useSelector((state) => state.pages.projectsRef)
    const contactRef = useSelector((state) => state.pages.contactRef)
    useEffect(() => {

    }, [dashboardRef, projectsRef, contactRef])
    return (
        <nav className={classes['nav']}>
            {clicked && 
                <div></div>
            }
            {!clicked &&
                <div>
            
                </div>
                // <img src={nav}></img>
            }
        </nav>
    );
}

export default Nav