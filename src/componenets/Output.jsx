import { useEffect, useState } from "react";
import classes from "./Output.module.scss"

const Output = (props) => {
    const [text, setText] = useState(props.txt)
    const [inputStatus, setInputStatus] = useState(false);
    const textOnChange = (e) => {
        // const newText = e.target.value
        // console.log('props.txt:', props.txt);
        // console.log('newText:', newText);
        // if (props.txt != undefined && newText.includes(props.txt)) {
            setText(e.target.value)
        // }
    }

    useEffect(()=>{
        const tx = document.getElementsByTagName("textarea");
        for (let i = 0; i < tx.length; i++) {
            tx[i].selectionStart = tx[i].selectionEnd = tx[i].value.length;
          
        }
    }, [])
    const textOnSubmit = (e) => {

    }
    const textOnEnter = (event) => {

        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            setInputStatus(true);
            props.createNewInput(true);
            const x = text.replace(props.txt, '');
            props.readCommand(props.txt, x);
        }
    }
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
        tx[i].addEventListener("input", OnInput, false);
        // tx[i].focus()
    }
    function OnInput() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    }


    return (
        <div className={classes['Output']}>
            <p className={classes['arrow']}>{'>'}</p>
            <textarea
                className={classes['text']} 
                value={text} 
                disabled={inputStatus} 
                onChange={textOnChange} 
                onSubmit={textOnSubmit}
                onKeyDown={textOnEnter}
                autoFocus={props.focus}
            />


        </div>
    );
}

export default Output
