import React from 'react'
import './wifi.css'
import { TbGridDots } from "react-icons/tb";
import { TbDeviceAnalytics } from "react-icons/tb";
import { MdOutlineAppSettingsAlt } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Wifi = () => (
  <div className='wifi-wrapper'>
    <div className='nav-holder1'>
      <div className='fixed-content'>
        <h1><Link to='/'>AquaAI</Link></h1>
        <ul>
          <li><Link to='/'><TbGridDots />Dashboard</Link></li>
          <li><Link to='/analytics'><TbDeviceAnalytics />Analytics</Link></li>
          <li><Link to='/system-settings'><MdOutlineAppSettingsAlt />System Settings</Link></li>
          <li><Link to='/wifi-settings'><FaWifi />Wifi Settings</Link></li>
        </ul>
        <h2 className='sys-up'><FaGlobe />Uptime: 45mins</h2>
      </div>
    </div>
    <div className='wifi-cover'>
      <div className='wifi-container'>
        <div className='wifi-box'>
          <FaWifi size={150} color='rgb(161, 140, 209)'/>
          <div className='no-flex'>
            <div className='wifibox-flex'>
              <h3 className='move'>SSID: </h3>
              <input type='text' placeholder='Enter SSID' />
            </div>
            <div className='wifibox-flex'>
              <h3>Password: </h3>
              <input type='text' placeholder='Enter Password' />
            </div>
            <div className='wifibox-flex'>
              <h3>Channel: </h3>
                <select name="Channel" id="Channel">
                  <option value="Select Channel">Select Channel</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                </select>
            </div>
            <div className='wifibox-flex1'>
              <button className='btn-sys'>Reset</button>
              <button className='btn-sys'>Save</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
)

export default Wifi