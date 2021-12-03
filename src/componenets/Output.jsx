import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import classes from "assets/5-components/Output.module.scss"
import { isMobile } from 'react-device-detect';
import * as EmailValidator from 'email-validator';
import { useToasts } from 'react-toast-notifications';

const Output = forwardRef((props, ref) => {
    const myRef = useRef();
    const textareaRef = useRef();
    useImperativeHandle(ref, () => ({
        textOnEnterFromParent: textOnEnterFromParent,
        // ref: ref
    }));
    const [counter, setCounter] = useState(0)
    const [timer, setTimer] = useState(null)
    const [pause, setPause] = useState(true);
    const [text, setText] = useState('')
    const [inputStatus, setInputStatus] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const { addToast } = useToasts();

    // textarea scroll to last text
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    }

    useEffect(() => {
        if (counter != props.txt.length - 1) {
            clearInterval(timer);
            const interval = setInterval(() => {
                if (!props.pause)
                    setCounter(counter => counter + 1)
            }, 30)
            setTimer(interval);
        }
    }, [props.pause])

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

    const textOnEnterFromParent = (e) => {
        if (isMobile) {
            const key = props.txt;
            console.log(key);
            const value = text.replace(key, '');
            if (key == 'Enter your email: ') {
                const isEmailValid = EmailValidator.validate(value)
                if (!isEmailValid) {
                    var element = myRef.current.getElementsByTagName("textarea")[0]
                    let y = element.value.replace(/\n.*$/, '');
                    y = y.slice(0, y.length)
                    element.value = y;
                    element.setSelectionRange(0, y.length)
                    setIsEmailValid(false);
                    addToast(`Please provide a valid email`, { appearance: 'error', autoDismiss: true });
                    return;
                } else {
                    addToast(`Your email is valid`, { appearance: 'success', autoDismiss: true });
                }
            }
            e.preventDefault();
            e.stopPropagation();
            myRef.current.blur();
            setInputStatus(true);

            props.readCommand(key, value);
            if (key == 'Enter your message: ' || key == 'Add more to your message (facultatif): ') {
                props.generateInputFromARG(false, true, 'Add more to your message (facultatif): ');
            } else {
                props.generateInputFromCMD(false, true);
            }
        }
    }


    const textOnEnter = (event) => {
        if (event.key === 'Enter' || (event.key === 'Enter' && isMobile)) {
            const key = props.txt;
            const value = text.replace(key, '');
            if (key == 'Enter your email: ') {
                const isEmailValid = EmailValidator.validate(value)
                if (!isEmailValid) {
                    var element = myRef.current.getElementsByTagName("textarea")[0]
                    let y = element.value.replace(/\n.*$/, '');
                    y = y.slice(0, y.length)
                    element.value = y;
                    element.setSelectionRange(0, y.length)
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
            if (key == 'Enter your message: ' || key == 'Add more to your message (facultatif): ') {
                props.generateInputFromARG(false, true, 'Add more to your message (facultatif): ');


            } else {
                props.generateInputFromCMD(false, true);
            }
        }
    }

    return (
        <div className={classes['Output']} ref={myRef} id={'fdfsdf'}>
            <p className={classes['arrow']}>{'>'}</p>
            <textarea ref={textareaRef}
                className={classes['text']}
                value={text}
                disabled={inputStatus}
                onChange={textOnChange}
                onSubmit={textOnSubmit}
                onKeyDown={textOnEnter}
                autoFocus={props.focus}
                onFocus={textOnFocus}
                style={{}}
            />
        </div>

    );
    
})

export default Output


// {
//     (isMobile && !props.readOnlyCommand) &&
//     <button onClick={textOnEnter}>enter</button>
// }