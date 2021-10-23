import { useEffect, useRef, useState } from "react";
import classes from "./Output.module.scss"
import { useTimer } from 'react-timer-hook';
import { useSelector } from "react-redux";
import * as rdd from 'react-device-detect';

const Output = (props) => {
    const myRef = useRef();
    const [counter, setCounter] = useState(0)
    const [timer, setTimer] = useState(null)
    const [pause, setPause] = useState(true);
    const [text, setText] = useState('')
    const [inputStatus, setInputStatus] = useState(false);

    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    }
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

    useEffect(() => {
        if (counter != props.txt.length - 1) {
            clearInterval(timer);
            const interval = setInterval(() => {
                if (!pause)
                    setCounter(counter => counter + 1)
            }, 85)
            setTimer(interval);
        }
    }, [pause])

    useEffect(() => {
        if (counter == props.txt.length) {
            clearInterval(timer)
            setTimer(null)
            if (props.readOnlyCommand) 
                props.generateInputFromCMD(true, false)
        } else if (counter < props.txt.length) {
            setText(text + props.txt[counter]);
        }
    }, [counter])


    const textOnChange = (e) => {
        if (props.txt != undefined && e.target.value.includes(props.txt))
            setText(e.target.value)
    }
    const textOnSubmit = (e) => {
    }
    const textOnFocus = (e) => {
        if (props.readOnlyCommand) {
            setInputStatus(true);
        }
    }
    const textOnEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            myRef.current.blur();
            setInputStatus(true);
            const key = props.txt;
            const value = text.replace(key, '');
            props.readCommand(key, value);
            if (key == 'Enter your message: ' || key == 'Continue your message: ') {
                props.generateInputFromARG(false, true, 'Continue your message: ');

            } else {
                props.generateInputFromCMD(false, true);
            }
        }
    }

    return (
        <div className={classes['Output']} ref={myRef} id={'fdfsdf'}>
            <p className={classes['arrow']}>{'>'}</p>
            <textarea
                className={classes['text']} 
                value={text} 
                disabled={inputStatus} 
                onChange={textOnChange} 
                onSubmit={textOnSubmit}
                onKeyDown={textOnEnter}
                autoFocus={props.focus}
                onFocus={textOnFocus}
            />
        </div>
    );
    
}

export default Output
