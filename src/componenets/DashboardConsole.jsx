import { useEffect } from "react"
import { useState } from "react/cjs/react.development"
import classes from "./Console.module.scss"
import Output from "./Output"

const DashboardConsole = (props) => {
    
    const [arr, setArr] = useState([])
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

    const createNewInput = () => {
        if (props.cmd.length == 0) {
            setArr(arr => [...arr, <Output key={Math.random()} createNewInput={createNewInput} txt={''} focus={props.focus}></Output>])
        } else {
            setArr(arr => {
                const x = props.cmd.splice(0, 1);
                return [...arr, <Output key={Math.random()} createNewInput={createNewInput} txt={x[0]} focus={props.focus}></Output>]
            });
            
        }
    }

    useEffect(() => {
        createNewInput();
    }, [])

    

    return (
        <div className={filterClassName()}>
            <div className={classes['top-buttons']}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={classes['line']}></div>
            <div className={classes['commands-container']}>{arr}</div>
        
        </div>
    );
}

export default DashboardConsole
