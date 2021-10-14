import classes from "./Dashboard.module.scss"
import logo from '../ressources/logo.png'
import DashboardConsole from "../componenets/DashboardConsole";
import handWaving from "../ressources/hand-waving.png"
const Dashboard = (props) => {
    return (
        <section className={classes['dashboard']}>
            <div>
                <img src={handWaving}></img>
                <div>
                    <p>Hello, I am</p>
                    <p>Rygaa</p>
                </div>
            </div>
            <div>
                <p>And this is</p>
                <p>My portfolio</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br></br> In vestibulum enim a arcu sagittis facilisis.</p>
                <ul>
                    <li>Frontend developer.</li>
                    <li>Frontend developer.</li>
                    <li>Frontend developer.</li>
                </ul>
                <p>I have been 5 month, 2 years, 3 years respectevly In <br></br> vestibulum enim a arcu sagittis facilisis.</p>
            </div>
            <button>View Project</button>
            <DashboardConsole cmd={[]} status='dashboard' focus={true}></DashboardConsole>
        </section>
    );
}

export default Dashboard
