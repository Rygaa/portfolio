import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./NavButton.module.scss"


const NavButton = (props) => {

  const buttonOnClick = (e) => {
    props.pageRef.scrollIntoView()
  }

  return(
      <div className={classes['div-nav-button-container']} onClick={buttonOnClick}>
        <img src={props.img}/>
        <button>{props.name}</button>
      </div>
    );
}

export default NavButton
