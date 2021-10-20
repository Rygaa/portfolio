import { useEffect, useRef, useState } from "react";
import classes from "./Output.module.scss"
import { useTimer } from 'react-timer-hook';
import { useSelector } from "react-redux";
const Output = (props) => {
    const [text, setText] = useState('')
    const [inputStatus, setInputStatus] = useState(false);
    const [counter, setCounter] = useState(0)
    const [timer, setTimer] = useState(null)
    const [pause, setPause] = useState(true);
    const [isFocus, setIsFocus] = useState(false);
    const myRef = useRef();
    const textOnChange = (e) => {
        const newText = e.target.value
        // console.log('props.txt:', props.txt);
        // console.log('newText:', newText);
        if (props.txt != undefined && newText.includes(props.txt)) {
            setText(e.target.value)
        }
    }

    // useEffect(() => {
    //     setTimer(setInterval(() => {
    //         if (isInViewport(myRef.current)) {
    //             console.log('running');
    //             setCounter(counter => counter + 1)
    //         }
    //     }, 75))
    // }, [])
    const speed01 = 75;
    const speed02 = 85;
    useEffect(() => {
        if (!(counter == props.txt.length - 1)) {
            clearInterval(timer);
            setTimer(setInterval(() => {
                if (!pause) {
                    setCounter(counter => counter + 1)
                }
            }, speed02))
        }
   

    }, [pause])
    useEffect(() => {
        if (counter == props.txt.length) {
            clearInterval(timer)
            setTimer(null)
            if (props.readOnlyCommand) {
                props.runNextLine()
            }
        } else if (counter < props.txt.length) {
            setText(text + props.txt[counter]);

        }

    }, [counter])

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    useEffect(()=>{
        window.addEventListener("scroll", function (evt) {
            console.log(isInViewport(myRef.current));
            if (isInViewport(myRef.current)) {
                setPause(false);
            }
            if (!isInViewport(myRef.current)) {
                setPause(true);
            }
            if (!props.readOnlyCommand) {
                console.log('ff');
                // setIsFocus(true);
            }
         });

        const tx = document.getElementsByTagName("textarea");
        for (let i = 0; i < tx.length; i++) {
            tx[i].selectionStart = tx[i].selectionEnd = tx[i].value.length;
          
        }
        if (isInViewport(myRef.current)) {
            setPause(false);
        }
        if (!isInViewport(myRef.current)) {
            setPause(true);
        }
    }, [])
    const textOnSubmit = (e) => {

    }
    const textOnEnter = (event) => {

        if (event.key === 'Enter') {
            event.preventDefault();
            myRef.current.blur();
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
        // tx[i].blur()
        // tx[i].focus()
    }
    function OnInput() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
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
                autoFocus={isFocus}
            />
        </div>
    );
    
}

export default Output
