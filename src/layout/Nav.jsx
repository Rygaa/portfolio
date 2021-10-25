import { useEffect, useState } from "react";
import classes from "./Nav.module.scss"
import NavButton from "../componenets/NavButton";
import { useSelector } from "react-redux";
import navIMG from '../ressources/nav.png'
import navRemoveIMG from '../ressources/nav-remove.png'
import moreIMG from '../ressources/more.png'
import contactIMG from '../ressources/contact.png'
import projectsIMG from '../ressources/projects.png'
const Nav = (props) => {
    const [clicked, setClicked] = useState(false);
    const dashboardRef = useSelector((state) => state.pages.dashboardRef)
    const projectsRef = useSelector((state) => state.pages.projectsRef)
    const contactRef = useSelector((state) => state.pages.contactRef)
    useEffect(() => {

    }, [dashboardRef, projectsRef, contactRef])
    const openMenu = (e) => {
        setClicked(!clicked)
    }
    // <div onClick={openMenu}><img src={navIMG}/></div>
    return (clicked ? <nav className={classes['nav-open']} >
        <div>        
            <NavButton pageRef={dashboardRef} img={moreIMG} name={'Dashboard'}></NavButton>
            <NavButton pageRef={projectsRef} img={projectsIMG} name={'Projects'}></NavButton>
            <NavButton pageRef={contactRef} img={contactIMG} name={'Contact'}></NavButton>
        </div>
        <img onClick={openMenu} src={navRemoveIMG}/>


    </nav> 
    : 
    <nav className={classes['nav-close']} >
            <img onClick={openMenu} src={navIMG} />
    </nav>

    );
}

export default Nav

