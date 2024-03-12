import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { TbGridDots } from "react-icons/tb";
import { TbDeviceAnalytics } from "react-icons/tb";
import { MdOutlineAppSettingsAlt } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

const DashContent = () => {
  const [data, setData] = useState([]);
  const [totalWaterDispensed, setTotalWaterDispensed] = useState(0);
  const [currentSoilMoisture, setCurrentSoilMoisture] = useState(0);
  const [currentNPK, setCurrentNPK] = useState({});
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [currentHumidity, setCurrentHumidity] = useState(0);
  const [uptime, setUptime] = useState("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/analytics');
        const jsonData = response.data;
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 10000); // Refresh data every 10 seconds
    return () => clearInterval(intervalId);
  }, [data]);
  
  const fetchUptime = async () => {
    try {
      const response = await axios.get('http://localhost:3001/uptime');
      const uptimeString = response.data;
      setUptime(uptimeString);
    } catch (error) {
      console.error('Error fetching uptime:', error);
      setUptime('Error');
    }
  };
  
  useEffect(() => {
    const uptimeIntervalId = setInterval(() => {
      fetchUptime();
    }, 1000); // Refresh uptime every 1 second

    return () => {
      clearInterval(uptimeIntervalId);
    };
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const lastEntry = data[data.length - 1];
      const last15Entries = data.slice(-15);
      const total = last15Entries.reduce((acc, entry) => acc + parseFloat(entry.Water_Dispensed), 0);
      setTotalWaterDispensed(total);
      setCurrentSoilMoisture(parseFloat(lastEntry.Soil_Moisture));
      setCurrentNPK({
        nitrogen: parseFloat(lastEntry.Nitrogen),
        phosphorus: parseFloat(lastEntry.Phosphorus),
        potassium: parseFloat(lastEntry.Potassium),
      });
      setCurrentTemperature(parseFloat(lastEntry.Temperature));
      setCurrentHumidity(parseFloat(lastEntry.Humidity));
    }
  }, [data]);

  return (
    <div className='wrapper-dash'>
      <div className='nav-holder'>
        <div className='fixed-content'>
          <h1><Link to='/'>AquaAI</Link></h1>
          <ul>
            <li><Link to='/'><TbGridDots />Dashboard</Link></li>
            <li><Link to='/analytics'><TbDeviceAnalytics />Analytics</Link></li>
            <li><Link to='/system-settings'><MdOutlineAppSettingsAlt />System Settings</Link></li>
            <li><Link to='/wifi-settings'><FaWifi />Wifi Settings</Link></li>
          </ul>
          <h2 className='sys-up'><FaGlobe />Uptime: {uptime}</h2>
        </div>
      </div>
      <div className="dash-cover">
        <div className='dash-container'>
          <div className='head-space-between'>
            <h1>System Statistics:</h1>
            <div className='select'>
              <select name="Crop" id="Crop">
                <option value="Select Crop">Select Crop</option>
                <option value="Pomogranate">Pomogranate</option>
                <option value="Tomato">Tomato</option>
                <option value="Wheat">Wheat</option>
                <option value="Brinjal">Brinjal</option>
              </select>
            </div>
          </div>
          <div className='metric-wrapper'>
            <div className='metric-cont'>
              <h1>Water Dispensed Today: {totalWaterDispensed}mL</h1>
            </div>
            <div className='metric-cont'>
              <h1>Current Soil Moisture: {currentSoilMoisture}bar</h1>
            </div>
            <div className='metric-cont'>
              <h1>Current N, P, K Values: {currentNPK.nitrogen}, {currentNPK.phosphorus}, {currentNPK.potassium}</h1>
            </div>
          </div>
          <div className='metric-wrapper'>
            <div className='metric-cont'>
              <h1>Current Temperature: {currentTemperature}°C</h1>
            </div>
            <div className='metric-cont'>
              <h1>Current Humidity: {currentHumidity}%</h1>
            </div>
          </div>
          <div className='recommendation-wrapper'>
            <div className='reco-cont'>
              <h1>Recommendations:</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashContent;
