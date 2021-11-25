import classes from "assets/6-pages/Projects.module.scss"

import hanasu from '../ressources/Hanasu.png'
import arrow from '../ressources/right-arrow.png'
import ProjectsConsole from "../componenets/Consoles/ProjectsConsole";
import { pagesActions } from "../store/pages-slice";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";


const Projects = (props) => {
    const dispatch = useDispatch();
    const myRef = useRef();
    useEffect(() => {
        dispatch(pagesActions.setProjectsRef(myRef.current));
    }, [myRef])
    const cmd = [
        'Project Hanasu',
        'Nodejs',
        'Nodejs',
    ]
    return (
        <section ref={myRef} className={classes['projects']}>
            <div className={classes['title-container']}>
                <p>Projects</p>
                <p>{'>'} Use the console to switch between projects</p>
            </div>
            <div className={classes['project-container']}>
                <ProjectsConsole cmd={cmd} status='projects'></ProjectsConsole>
                <div>
                    <div><img src={hanasu}></img></div>
                    <div><img src={arrow}></img></div>
                </div>
            </div>
            <div className={classes['projects-switch']}>
                <button></button>
                <button></button>
                <button></button>
            </div>

        </section>
    );
}

export default Projects
