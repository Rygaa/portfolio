import logo from './logo.svg';
import './App.css';
import Header from './layout/Header';
import classes from "./App.module.scss"
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  return (
    <div className={classes['css-selector']}>
      <Header></Header>
      <main>
        <Dashboard></Dashboard>
        <Projects></Projects>
        <Contact></Contact>
      </main>
    </div>

      
  );
}

export default App;
