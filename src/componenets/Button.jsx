import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import classes from "assets/5-components/Button.module.scss"


const Button = (props) => {
    const [enable, setEnable] = useState(true);
    const myRef = useRef();
    // const [height, setHeight] = useState(5);
    var height = 100;

    const buttonOnClick = (e) => {
        setEnable(false);
        if (!enable) {
            return;
        }
        props.rightArrowOnClick();
        height = 0;
        myRef.current.style.height = height + '%';
        var y
        var id = setTimeout(() => {y = setInterval(frame, 50)}, 700);
        function frame() {
            console.log(myRef.current.style.height);
            if (myRef.current.style.height == "100%") {
                console.log(true);
                clearInterval(y);
            } else {
                if ((height + 15) > 100) {
                    height = 100
                    setEnable(true);

                } else {
                    height += 15;
                }
                myRef.current.style.height = height + '%';
            }
        }
    }
 
    return (
        <div className={classes['Button']} onClick={buttonOnClick} >
            <div style={{ height: `${height}%` }} ref={myRef}></div>
        </div>
    );
}
export default Button
