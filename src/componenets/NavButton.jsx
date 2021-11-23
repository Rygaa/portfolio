import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "assets/5-components/NavButton.module.scss"


const NavButton = (props) => {
  const dashboardRef = useSelector((state) => state.pages.dashboardRef)
  const buttonOnClick = (e) => {
    props.pageRef.scrollIntoView()
    if (props.pageRef == dashboardRef) {
      window.scrollTo(0, 0);
    }
  }

  return(
      <div className={classes['div-nav-button-container']} onClick={buttonOnClick}>
        <img src={props.img}/>
        <button>{props.name}</button>
      </div>
    );
}

export default NavButton
