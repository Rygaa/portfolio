import { useEffect } from "react"
import { useState } from "react"
import classes from "./ContactConsole.module.scss"
import Output from "../Output"


const ContactConsole = (props) => {

    const [outputs, setOutputs] = useState([])
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

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

    const outputsList = outputs.map((output) => (
        <Output
            key={output.key}
            generateInputFromCMD = {generateInputFromCMD}
            generateInputFromARG = {generateInputFromARG}
            txt={output.txt}
            focus={output.focus}
            readCommand={readCommand}
            readOnlyCommand={output.readOnlyCommand}

        />
    ));


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
            <form className={classes['send-form']}  id="contactform" action="https://formsubmit.io/send/0c3f15b7-499e-45dd-a589-03995b63d04d" method="POST">
                <input name="_redirect" type="hidden" value="https://www.aissaben.com/" onClick={console.log('clicked')} />
                <input name="name" hidden style={{display:"none"}} type="text" id="name" value={name} readOnly/>
                <input name="email" hidden style={{ display: "none" }} type="email" id="email" value={email} readOnly/>
                <textarea name="comment" id="comment" rows="3" value={message} hidden readOnly/>
                <input name="_formsubmit_id" type="text" hidden style={{display:"none"}} />
                <input value="Submit" type="submit" />
            </form>
        </div>
    );
}

export default ContactConsole
