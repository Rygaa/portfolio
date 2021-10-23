import { useEffect } from "react"
import { useState } from "react"
import classes from "./DashboardConsole.module.scss"
import Output from "../Output"

const DashboardConsole = (props) => {
    
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


    const outputsList = outputs.map((output) => (
        <Output
            key={output.key}
            createNewInput={output.createNewInput}
            txt={output.txt}
            focus={output.focus}
            generateInputFromCMD={output.generateInputFromCMD}
            readOnlyCommand={output.readOnlyCommand}
        />
    ));

    return (
        <div className={filterClassName()}>
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
