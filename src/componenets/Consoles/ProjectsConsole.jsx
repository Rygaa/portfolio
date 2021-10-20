import { useEffect } from "react"
import { useState } from "react"
import classes from "./ProjectsConsole.module.scss"
import Output from "../Output"

const DashboardConsole = (props) => {

    const [outputs, setOuputs] = useState([])

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
    const runNextLine = () => {
        createNewInput();

    }
    const createNewInput = () => {
        if (props.cmd.length == 0) {
            // setArr(arr => [...arr])
        } else {
            setOuputs(outputs => {
                const x = props.cmd.splice(0, 1);
                return [...outputs, {
                    key: Math.random(),
                    createNewInput: createNewInput,
                    txt: x[0],
                    focus: props.focus,
                    runNextLine: runNextLine,
                    readOnlyCommand: true
                }]
            });
        }
    }


    useEffect(() => {
        createNewInput();
    }, [])


    const outputsList = outputs.map((output) => (
        <Output
            key={output.key}
            createNewInput={output.createNewInput}
            txt={output.txt}
            focus={output.focus}
            // readCommand={readCommand}
            runNextLine={runNextLine}
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
