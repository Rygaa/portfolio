import classes from "./Dashboard.module.scss"
import logo from '../ressources/logo.png'
import DashboardConsole from "../componenets/Consoles/DashboardConsole";
import handWaving from "../ressources/hand-waving.png"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import pagesSlice, { pagesActions } from "../store/pages-slice";
const Dashboard = (props) => {
    const dispatch = useDispatch();
    const myRef = useRef();
    useEffect(() => {
        dispatch(pagesActions.setDashboardRef(myRef.current));
    }, [myRef])
    const cmd = [
        'Hello World!!!', 
        'This portfolio is made ',
        'Credits: ',
        'Nas',
        'Flaticon',
    ]
    return (
        <section ref={myRef} className={classes['dashboard']}>
            <div>
                <img src={handWaving}></img>
                <div>
                    <p>Hello, I am</p>
                    <p>Aissa</p>
                </div>
            </div>
            <div>
                <p>And this is</p>
                <p>My portfolio</p>
                <p>i am passionate about computer science universe <br></br> especialy about softwere enginer bubble and has been in it <br></br> for more than 2 years.</p>
                <ul>
                    <li>React.js</li>
                    <li>Node.js</li>
                    <li>Electron.js</li>
                </ul>
                <p>challenges are never a burden for me.In fact, I am always <br></br> ready to accept new one</p>
            </div>
            <button>View Project</button>
            <DashboardConsole cmd={cmd} status='dashboard'></DashboardConsole>
        </section>
    );
}

export default Dashboard
