import { useEffect } from "react"
import { useState } from "react"
import classes from "./Console.module.scss"
import Output from "./Output"


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
  
    const createNewInput = (focus) => {
        setOutputs(outputs => {
            return [
                ...outputs,
                {
                    key: Math.random(),
                    createNewInput: createNewInput,
                    txt: props.cmd.length > 0 ? props.cmd.splice(0, 1)[0] : '',
                    focus: focus ? focus : props.focus,
                    readCommand: readCommand,
                }
            ]
        })
    }
    

    useEffect(() => {
        createNewInput();
    }, [])
    useEffect(() => {
        console.log(message);
    }, [message])

    const outputsList = outputs.map((output) => (
        <Output
            key={output.key}
            createNewInput={output.createNewInput}
            txt={output.txt}
            focus={output.focus}
            readCommand={readCommand}
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
                <input name="_redirect" type="hidden" value="https://www.nasykh.com/" />
                <input name="name" hidden style={{display:"none"}} type="text" id="name" value={name}/>
                <input name="email" hidden style={{ display: "none" }} type="email" id="email" value={email}/>
                <textarea name="comment" id="comment" rows="3" value={message} hidden/>
                <input name="_formsubmit_id" type="text" hidden style={{display:"none"}} />
                <input value="Submit" type="submit" />
            </form>
        </div>
    );
}

export default ContactConsole
