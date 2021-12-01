import classes from "assets/6-pages/Projects.module.scss"

import hanasuImage from '../ressources/Hanasu.png'
import MedTutoImage from '../ressources/MedTuto.png'
import MaktabaImage from '../ressources/maktaba.png'
import arrow from '../ressources/right-arrow.png'
import ProjectsConsole from "../componenets/Consoles/ProjectsConsole";
import { pagesActions } from "../store/pages-slice";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { AnimateOnChange } from 'react-animation'




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

    ]
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
    ]
}

const maktaba = {
    picture: MaktabaImage,
    cmd: [
        'Project tutorat',
        'Nodejs',
        'Nodejs',
    ]
}


const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

const Projects = (props) => {
    const dispatch = useDispatch();
    const myRef = useRef();
    const [imageIndex, setImageIndex] = useState(1);
    const pictures = [hanasu, tutorat]
    const [switches, setSwitches] = useState([
        'switch-on',
        'switch-off',
    ])

    const [cmd, setCmd] = useState([...pictures[0].cmd])

    const rightArrowOnClick = (e) => {
        const newValue = (imageIndex != pictures.length - 1 ? imageIndex + 1 : 0)
        setImageIndex(newValue)
        setCmd([...pictures[newValue].cmd])
        const switchesArr = switches; 
        if (imageIndex == switchesArr.length - 1) {
            const tempo = switchesArr[0];
            switchesArr[0] = switchesArr[imageIndex];
            switchesArr[imageIndex] = tempo;
        } else {
            const tempo = switchesArr[imageIndex + 1];
            switchesArr[imageIndex + 1] = switchesArr[imageIndex];
            switchesArr[imageIndex] = tempo;
        }

        setSwitches(switchesArr);
        
    }

    const print = <ProjectsConsole cmd={cmd} status='projects'></ProjectsConsole>
    useEffect(() => {

    }, [])


    useEffect(() => {
        dispatch(pagesActions.setProjectsRef(myRef.current));
        
    }, [myRef])

  

    const testttt = () => {
        rightArrowOnClick();

    }

    return (
        <section ref={myRef} className={classes['projects']}>
            <div className={classes['title-container']}>
                <p>Projects</p>
                <p>{'>'} Use the console to switch between projects</p>
            </div>
            <div className={classes['project-container']}>
                {print}
                <div className={classes['project']}>
                    <div><AnimateOnChange durationOut="500"><img src={pictures[imageIndex].picture}></img></AnimateOnChange></div>
                    <div onClick={rightArrowOnClick}><img src={arrow}></img></div>
                </div>
                
            </div>
            <div className={classes['projects-switch']}>
                <button className={classes[switches[0]]} onClick={testttt}></button>
                <button className={classes[switches[1]]} onClick={testttt}></button>
            </div>

        </section>
    );
}

export default Projects
