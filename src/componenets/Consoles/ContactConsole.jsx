import React, { useEffect, useRef } from "react"
import { useState } from "react"
import classes from "assets/5-components/Consoles/ContactConsole.module.scss"
import Output from "../Output"
import { isMobile } from 'react-device-detect';


const ContactConsole = (props) => {

    const [outputs, setOutputs] = useState([])
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [isReadyToSend, setIsReadyToSend] = useState(false)

    const readCommand = (command, value) => {
        switch(command) {
            case 'Enter your email: ':
                setEmail(value)
                break;
            case 'Enter your name: ':
                setName(value)
                break;
            case 'Enter your message: ':
                setMessage(value)
                setIsReadyToSend(true);
                break;
            default:
                setMessage(`${message} \n ${value}`);
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
                    generateInputFromARG: generateInputFromARG,
                    txt: text,
                    focus,
                    readCommand: readCommand,
                    readOnlyCommand: readOnly
                }
            ] : [...outputs]
        })
    }
    const generateInputFromARG = (readOnly, focus, text) => {
        setOutputs(outputs => {
            return [
                ...outputs,
                {
                    key: Math.random(),
                    generateInputFromCMD: generateInputFromCMD,
                    generateInputFromARG: generateInputFromARG,
                    txt: text,
                    focus: focus ? focus : props.focus,
                    readCommand: readCommand,
                    readOnlyCommand: readOnly

                }
            ]
        })
    }

  
    useEffect(() => {
    }, outputs)

    useEffect(() => {
        generateInputFromCMD(false, false)

    }, [])
    useEffect(() => {
    }, [message])
    useEffect(() => {
    }, [props.cmd])
    const nextLine = (e) => {
        
    }

    // const URLS = [1, 2, 3, 4, 5];
    // const refs = useRef({});
    // const refs = outputs.map(x => useRef(null))

    const inputRef = useRef([]);
    // const handler = idx => e => {
    //     const next = inputRef.current[idx + 1];
    //     if (next) {
    //         next.focus()
    //     }
    // };
    const outputsList = outputs.map((output, index) => (
        <Output
            ref={el => inputRef.current[index] = el}
            key={output.key}
            generateInputFromCMD = {generateInputFromCMD}
            generateInputFromARG={generateInputFromARG}
            txt={output.txt}
            focus={output.focus}
            readCommand={readCommand}
            readOnlyCommand={output.readOnlyCommand}
        />
    ));

    const nextLineOnClick = (e) => {
        inputRef.current[outputsList.length - 1].textOnEnterFromParent(e);
    }

    return (
        <div className={classes['console-contact']}>
            <div className={classes['top-buttons']}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={classes['line']}></div>
            <div className={classes['commands-container']}>
            {
                outputsList
            }
            </div>
            {isMobile &&
                <button onClick={nextLineOnClick} className={classes['next-line-button']}>Next Line</button>
            }
            {isReadyToSend &&
                <form className={classes['send-form']} id="contactform" action="https://formsubmit.io/send/0c3f15b7-499e-45dd-a589-03995b63d04d" method="POST">
                    <input name="_redirect" type="hidden" value="https://www.aissaben.com/" onClick={console.log('clicked')} />
                    <input name="name" hidden style={{ display: "none" }} type="text" id="name" value={name} readOnly />
                    <input name="email" hidden style={{ display: "none" }} type="email" id="email" value={email} readOnly />
                    <textarea name="comment" id="comment" rows="3" value={message} hidden readOnly />
                    <input name="_formsubmit_id" type="text" hidden style={{ display: "none" }} />
                    <input value="Submit" type="submit" />
                </form>
            }

        </div>
    );
}

export default ContactConsole
