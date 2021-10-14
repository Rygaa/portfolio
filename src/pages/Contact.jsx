import ContactConsole from "../componenets/ContactConsole";
import classes from "./Contact.module.scss"


const Contact = (props) => {
    
    return (
        <section className={classes['contact']}>
            <p>Contact us</p>
            <p>{'>'} Use the console to send an email</p>
            <ContactConsole
                cmd={['Enter your email: ', 'Enter your name: ', 'Enter your message: ']} 
                status="contact"
                focus={false}
                >
            </ContactConsole>
        </section>
    );
}

export default Contact
