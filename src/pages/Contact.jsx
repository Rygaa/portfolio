import ContactConsole from "../componenets/Consoles/ContactConsole";
import classes from "assets/6-pages/Contact.module.scss"
import { pagesActions } from "../store/pages-slice";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

const Contact = (props) => {
    const dispatch = useDispatch();
    const myRef = useRef();
    useEffect(() => {
        dispatch(pagesActions.setContactRef(myRef.current));
    }, [myRef])
    const cmd = [
        'The console will ask you to enter your email, name and message.' +
        'The SEND button will appear when you enter your message. (Click enter to start)',
        'Enter your email: ',
        'Enter your name: ',
        'Enter your message: ',
    ]
    return (
        <section ref={myRef} className={classes['background']}>
            <section className={classes['contact']}>
                <p>Contact us</p>
                <p>{'>'} Follow the step in the console to send an email</p>
                <ContactConsole
                    cmd={cmd}
                    // cmd={['Enter your email: ', 'Enter your name: ', 'Enter your message: ']} 
                    status="contact"
                >
                </ContactConsole>
            </section>
        </section>
        
    );
}

export default Contact
