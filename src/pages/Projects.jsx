import classes from "./Projects.module.scss"
import hanasu from '../ressources/Hanasu.png'
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
            <div>
                <p>Projects</p>
                <p>{'>'} Use the console to switch between projects</p>
            </div>
            <ProjectsConsole cmd={cmd} status='projects'></ProjectsConsole>
            <div></div>
            <img src={hanasu}></img>
        </section>
    );
}

export default Projects
