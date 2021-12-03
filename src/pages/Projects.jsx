import classes from "assets/6-pages/Projects.module.scss"

import hanasuImage from '../ressources/Hanasu.png'
import hanasuImage01 from '../ressources/Hanasu01.png'
import MedTutoImage from '../ressources/Hanasu01.png'
import MaktabaImage from '../ressources/maktaba.png'
import arrow from '../ressources/right-arrow.png'
import ProjectsConsole from "../componenets/Consoles/ProjectsConsole";
import { pagesActions } from "../store/pages-slice";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { AnimateOnChange } from 'react-animation'
import Button from "componenets/Button"

const hanasu = {
    picture: hanasuImage, 
    cmd: [
        'Name: Hanasu',
        'Backend: Nodejs',
        'Frontend: React',
        'Designed: Figma',
        'Database: MongoDB',
        'npms: socket.io \n\xa0\xa0\xa0\xa0\xa0 react-redux' + '\n\xa0\xa0\xa0\xa0\xa0\xa0' + 
        'axios \n\xa0\xa0\xa0\xa0\xa0 react-redux' 

    ],
    website: 'https://hanasu.me',
    github: '//github.com/Rygaa/hanasu-react-frontend',
}

const tutorat = {
    picture: MedTutoImage,
    cmd: [
        'Name: Med-Tutorat',
        'Backend: Nodejs',
        'Frontend: React',
        'Designed: Figma',
        'Database: MongoDB',
        'npms: socket.io \n\xa0\xa0\xa0\xa0\xa0 react-redux' + '\n\xa0\xa0\xa0\xa0\xa0\xa0' +
        'react-toastify \n\xa0\xa0\xa0\xa0\xa0 react-tabs' + '\n\xa0\xa0\xa0\xa0\xa0\xa0' +
        'axios \n\xa0\xa0\xa0\xa0\xa0 radix-ui'
    ],
    website: 'https://medtuto.com/',
    github: 'https://github.com/Rygaa/medtuto-react-frontend',
}

// const [switches, setSwitches] = useState([
//     'switch-on',
//     'switch-off',
// ])
        // const switchesArr = switches;
        // if (imageIndex == switchesArr.length - 1) {
        //     const tempo = switchesArr[0];
        //     switchesArr[0] = switchesArr[imageIndex];
        //     switchesArr[imageIndex] = tempo;
        // } else {
        //     const tempo = switchesArr[imageIndex + 1];
        //     switchesArr[imageIndex + 1] = switchesArr[imageIndex];
        //     switchesArr[imageIndex] = tempo;
        // }
        // setSwitches(switchesArr);
    // const [cmd, setCmd] = useState(pictures[0])

const Projects = (props) => {
    const dispatch = useDispatch();
    const myRef = useRef();
    const [selectedProject, setSelectedProject] = useState(0);
    const projects = [hanasu, tutorat];
    const [switches, setSwitches] = useState([
        'switch-on',
        'switch-off',
    ])
    const rightArrowOnClick = (e) => {
        const newValue = (selectedProject != projects.length - 1 ? selectedProject + 1 : 0)
        setSelectedProject(newValue)

        const switchesArr = switches;
        if (selectedProject == switchesArr.length - 1) {
            const tempo = switchesArr[0];
            switchesArr[0] = switchesArr[selectedProject];
            switchesArr[selectedProject] = tempo;
        } else {
            const tempo = switchesArr[selectedProject + 1];
            switchesArr[selectedProject + 1] = switchesArr[selectedProject];
            switchesArr[selectedProject] = tempo;
        }
        setSwitches(switchesArr);
  
    }

    useEffect(() => {
        dispatch(pagesActions.setProjectsRef(myRef.current));
    }, [myRef])

    let print = 
    <ProjectsConsole 
        cmd={[...projects[selectedProject].cmd]}
        github={projects[selectedProject].github}
        website={projects[selectedProject].website}
        status='projects'
    ></ProjectsConsole>
    
    return (
        <section ref={myRef} className={classes['background']}>
            <section className={classes['projects']}>
                <div className={classes['title-container']}>
                    <p>Projects</p>
                    <p>{'>'} Use the console to switch between projects</p>
                </div>
                <div className={classes['project-container']}>
                    {print}
                    <div className={classes['project']}>
                        <div><AnimateOnChange durationOut="500"><img src={projects[selectedProject].picture}></img></AnimateOnChange></div>
                        <Button rightArrowOnClick={rightArrowOnClick} />
                    </div>
                </div>
                <div className={classes['projects-switch']}>
                    <button className={classes[switches[0]]} onClick={rightArrowOnClick}></button>
                    <button className={classes[switches[1]]} onClick={rightArrowOnClick}></button>
                </div>
            </section>
        </section>
    );
}

export default Projects
