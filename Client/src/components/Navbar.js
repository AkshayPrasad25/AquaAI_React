import { Link } from "react-router-dom"
import "./Navbar.css"
import React, { useState } from 'react'
import {FaBars, FaTimes} from "react-icons/fa"
import { TbGridDots } from "react-icons/tb";
import { TbDeviceAnalytics } from "react-icons/tb";
import { MdOutlineAppSettingsAlt } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
const Navbar = () => {

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [color, setColor] = useState(false);
  const changeColor = () => {
    if(window.scrollY>=90){
      setColor(true);
    }
    else{
      setColor(false);
    }
  }

  window.addEventListener("scroll", changeColor);

  return (
    <div className="container">
      <div className={color ? "header header-bg" : "header"}>
        <Link to="/">
            <h1>AquaAI</h1>
        </Link>
        <ul className={click ? ("NavMenu active") : ("NavMenu")}>
            <li><Link to='/'><TbGridDots />Dashboard</Link></li>
            <li><Link to='/analytics'><TbDeviceAnalytics />Analytics</Link></li>
            <li><Link to='/system-settings'><MdOutlineAppSettingsAlt />System Settings</Link></li>
            <li><Link to='/wifi-settings'><FaWifi />Wifi Settings</Link></li>
            <li><Link><FaGlobe />Uptime: 45mins</Link></li>
        </ul>
        <div className="dropdown" onClick={handleClick}>
            {click ? (<FaTimes size={20} style={{color: "#fff"}} />) : (<FaBars size={20} style={{color: "rgb(161, 140, 209)"}} />)}
        </div>
      </div>
    </div>
    
  )
}

export default Navbar