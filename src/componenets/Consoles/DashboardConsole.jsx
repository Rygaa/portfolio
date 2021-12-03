import { useEffect, useRef } from "react"
import { useState } from "react"
import classes from "assets/5-components/Consoles/DashboardConsole.module.scss"

import Output from "../Output"

const DashboardConsole = (props) => {
    const myRef = useRef();
    const [pause, setPause] = useState(false);

    // Pause writing if the output is not in view
    useEffect(() => {
        window.addEventListener("scroll", scrollEventFunction);
        isInViewport(myRef.current) ? setPause(false) : setPause(true);
    }, [])
    const scrollEventFunction = (e) => {
        isInViewport(myRef.current) ? setPause(false) : setPause(true);
    }
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    const [outputs, setOutputs] = useState([])
    const filterClassName = () => {
        switch (props.status) {
            case 'projects':
                return classes['console-projects'];
            case 'contact':
                return classes['console-contact'];
            default:
                return classes['console'];
        }
    }


    const generateInputFromCMD = (readOnly, focus) => {
        const length = props.cmd.length;
        const text = length > 0 ? props.cmd.splice(0, 1)[0] : '';
        setOutputs(outputs => {
            return length > 0 ? [
                ...outputs,
                {
                    key: Math.random(),
                    generateInputFromCMD: generateInputFromCMD,
                    txt: text,
                    focus,
                    readOnlyCommand: readOnly
                }
            ] : [...outputs]
        })
    }

    useEffect(() => {
        generateInputFromCMD(true, false);
    }, [])

    useEffect(() => {
    }, [outputs])
    useEffect(() => {

    }, [pause])
    const outputsList = outputs.map((output) => (
        <Output
            pause={pause}
            key={output.key}
            createNewInput={output.createNewInput}
            txt={output.txt}
            generateInputFromCMD={output.generateInputFromCMD}
            readOnlyCommand={output.readOnlyCommand}
        />
    ));

    return (
        <div ref={myRef} className={filterClassName()}>
            <div className={classes['top-buttons']}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={classes['line']}></div>
            <div className={classes['commands-container']}>{outputsList}</div>
        
        </div>
    );
}

export default DashboardConsole
