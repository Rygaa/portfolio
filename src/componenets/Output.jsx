import { useEffect, useRef, useState } from "react";
import classes from "./Output.module.scss"
import { useTimer } from 'react-timer-hook';
import { useSelector } from "react-redux";
import { isMobile } from 'react-device-detect';
import * as EmailValidator from 'email-validator';
import { ToastProvider, useToasts } from 'react-toast-notifications';

const Output = (props) => {
    const myRef = useRef();
    const [counter, setCounter] = useState(0)
    const [timer, setTimer] = useState(null)
    const [pause, setPause] = useState(true);
    const [text, setText] = useState('')
    const [inputStatus, setInputStatus] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [rows, setRows] = useState(5);
    const { addToast } = useToasts();
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

    // useEffect(() => {
    //     if (!isEmailValid) {
    //         addToast(`Your email is not valid.\n Please provide a valid email`, { appearance: 'error' });
    //     }
    // }, [isEmailValid])
    const textOnEnter = (event) => {

        if (event.key === 'Enter' || isMobile) {
            const key = props.txt;
            const value = text.replace(key, '');
            if (key == 'Enter your email: ') {
                const isEmailValid = EmailValidator.validate(value)
                if (!isEmailValid) {
                    var element = myRef.current.getElementsByTagName("textarea")[0]
                    const x = element.value;
                    let y = '';
                    y = x.replace(/\n.*$/, '')
                    console.log(y);
                    y = y.slice(0, y.length)
                    element.value = y;
                    element.setSelectionRange(0, y.length)
                    console.log(y);
                    setIsEmailValid(false);
                    addToast(`Please provide a valid email`, { appearance: 'error', autoDismiss: true });
                    return;
                } else {
                    addToast(`Your email is valid`, { appearance: 'success', autoDismiss: true });

                }
            }
            event.preventDefault();
            event.stopPropagation();
            myRef.current.blur();
            setInputStatus(true);

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
                    // rows={1}
                    // style={{resize:"none"}}
                    // wrap="off"
                />
                {(isMobile && !props.readOnlyCommand) && 
                    <button onClick={textOnEnter}>enter</button>
                }
            </div>

    );
    
}

export default Output
