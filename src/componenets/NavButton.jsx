import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Output.module.scss"


const NavButton = (props) => {

  const buttonOnClick = (e) => {
    props.pageRef.scrollIntoView()
  }

  return(
      <div onClick={buttonOnClick}>
        <img />
        <p>Button</p>
      </div>
    );
}

export default NavButton
