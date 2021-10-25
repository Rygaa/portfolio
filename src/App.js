import logo from './logo.svg';
import './App.css';
import Header from './layout/Header';
import classes from "./App.module.scss"
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { useRef } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { DefaultToast } from 'react-toast-notifications';

export const MyCustomToast = ({ children, ...props }) => (
  <DefaultToast {...props} style={{ float: "left", backgroundColor: "rgba(0,0,0,0.3)"}}>
    <div style={{color:"white"}}>{children}</div>
  </DefaultToast>
);

function App() {
  const dashboardRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)

  return (
    <ToastProvider components={{ Toast: MyCustomToast }} autoDismissTimeout={'3000'} placement={'top-left'}>
      <div className={classes['css-selector']}>
        <Header></Header>
        <main>
          <Dashboard></Dashboard>
          <Projects></Projects>
          <Contact></Contact>
        </main>
      </div>
    </ToastProvider>

      
  );
}

export default App;
