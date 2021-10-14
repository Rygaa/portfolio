import classes from "./Projects.module.scss"
import hanasu from '../ressources/Hanasu.png'
import ProjectsConsole from "../componenets/ProjectsConsole";


const Projects = () => {
    return (
        <section className={classes['projects']}>
            <div>
                <p>Projects</p>
                <p>{'>'} Use the console to switch between projects</p>
            </div>
            <ProjectsConsole cmd={[]} status='projects' focus={false}></ProjectsConsole>
            <div></div>
            <img src={hanasu}></img>
        </section>
    );
}

export default Projects
