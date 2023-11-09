import '../App.css';
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

function DataFetch() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/result');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // refresh data every second
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const messages = data?.messages;
  const bans = data?.bans;
  const timeouts = data?.timeouts;
  const kicks = data?.kicks;

  const item = {
    messages,
    bans,
    timeouts,
    kicks
  };

  return (
  <div className="App">
      <header className="App-header">
        <div className="topbar-status-container">
          <h2>Current status: offline/online</h2>
        </div>
        <div className="sidebar-container">
          <div className="sidebar-title">
            Coding Shelter
            <div className="sidebar-spacer-top"></div>
          </div>
          <ul className="sidebar-navigation">
            <li>
                <i className="fa fa-home" aria-hidden="true"></i> Dashboard
            </li>
            <li>
              <a href>
                <i className="fa fa-tachometer" aria-hidden="true"></i> Leveling
              </a>
            </li>
            <li>
              <a href>
                <i className="fa fa-cog" aria-hidden="true"></i> Configuration
              </a>
            </li>
          </ul>
        </div>
        <div className="dashboard-welcome">
          <h1>Welcome to the Dashboard</h1>
        </div>
        <div className="audit-container">
          <h3>Audit information</h3>
          <div className="timeouts-auditContainer">
            <h4>Time-outs</h4>
            <p>{<CountUp start={0} end={item.timeouts} duration={3}>users timed out</CountUp>}</p>
          </div>
          <div className="bans-auditContainer">
            <h4>Bans</h4>
            <p>{item.bans} users banned</p>
          </div>
          <div className="sentMsg-auditContainer">
            <h4>Total messages</h4>
            <p>{item.messages} messages sent</p>
          </div>
          <div className="kicks-auditContainer">
            <h4>Kicks</h4>
            <p>{item.kicks} users kicked</p>
          </div>
        </div>
        <div className="uptime-container">
          <h3>Uptime</h3>
        </div>
        <div className="recentActivity-container">
          <h3>Recent activity</h3>
        </div>
        <div className="upcoming-container">
          <h3>Upcoming</h3>
        </div>
      </header>
      <script src="script.js"></script>
    </div>
  );
}

export default DataFetch;
