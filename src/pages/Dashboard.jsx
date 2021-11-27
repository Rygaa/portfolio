import classes from "assets/6-pages/Dashboard.module.scss"

import logo from '../ressources/logo.png'
import DashboardConsole from "../componenets/Consoles/DashboardConsole";
import handWaving from "../ressources/hand-waving.png"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import NavButton from "../componenets/NavButton";
import navIMG from '../ressources/nav.png'
import navRemoveIMG from '../ressources/nav-remove.png'
import moreIMG from '../ressources/more.png'
import contactIMG from '../ressources/contact.png'
import projectsIMG from '../ressources/projects.png'
import pagesSlice, { pagesActions } from "../store/pages-slice";
const Dashboard = (props) => {
    const dispatch = useDispatch();
    const myRef = useRef();
    const projectsRef = useSelector((state) => state.pages.projectsRef)

    useEffect(() => {
        dispatch(pagesActions.setDashboardRef(myRef.current));
    }, [myRef])
    const cmd = [
        'Hello World!!!', 
        'This portfolio is made ',
        'Credits: ',
        'Nas',
        'Flaticon',
    ]
    const buttonOnClick = (e) => {
        projectsRef.scrollIntoView()
    }
    return (
        <section ref={myRef} className={classes['dashboard']}>
            <div>
                <img src={handWaving}></img>
                <div>
                    <p>Hello, I am</p>
                    <p>Aissa</p>
                </div>
            </div>
            <div>
                <p>And this is</p>
                <p>My portfolio</p>
                <p>I am passionate about computer science universe, especially about software engine bubbles and has been in it for more than 2 years.</p>
                <ul>
                    <li>React.js</li>
                    <li>Node.js</li>
                    <li>Electron.js</li>
                </ul>
                <p>challenges are never a burden for me.In fact, I am always ready to accept new one</p>
            </div>
            <div className={classes['div-nav-button-container']} onClick={buttonOnClick}>
                <img src={projectsIMG} />
                <button>View projects</button>
            </div>
            <DashboardConsole cmd={cmd} status='dashboard'></DashboardConsole>
        </section>
    );
}

export default Dashboard
