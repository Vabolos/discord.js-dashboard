import '../App.css';
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

function DataFetch() {
  const [data, setData] = useState(null);

  // fetch db data
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/bot-status');
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

  // audit data
  const messages = data?.messages;
  const bans = data?.bans;
  const timeouts = data?.timeouts;
  const kicks = data?.kicks;
  // recent activity data
  // recent message
  const recentMessageContent = data?.recentMessage;
  const recentMessageUser = data?.recentMessageUser;
  // recent ban
  const recentBanUser = data?.recentBannedUser;
  const recentBanReason = data?.recentBannedReason;
  // recent kick
  const recentKickUser = data?.recentKickedUser;
  const recentKickReason = data?.recentKickedReason;
  // recent timeout
  const recentTimeoutUser = data?.recentTimedOutUser;
  const recentTimeoutReason = data?.recentTimedOutReason;
  // recent join
  const recentJoinUser = data?.recentJoinedUser;

  const item = {
    messages,
    bans,
    timeouts,
    kicks,
    recentMessageContent,
    recentMessageUser,
    recentBanUser,
    recentBanReason,
    recentKickUser,
    recentKickReason,
    recentTimeoutUser,
    recentTimeoutReason,
    recentJoinUser
  };

  return (
  <div className="App">
      <header className="App-header">
        <div className="topbar-status-container">
          {/* {botStatus} */}
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
            <p>{<CountUp start={0} end={item.timeouts} duration={3}></CountUp>} users timed out</p>
          </div>
          <div className="bans-auditContainer">
            <h4>Bans</h4>
            <p>{<CountUp start={0} end={item.bans} duration={3}></CountUp>} users banned</p>
          </div>
          <div className="sentMsg-auditContainer">
            <h4>Total messages</h4>
            <p>{<CountUp start={0} end={item.messages} duration={3}></CountUp>} messages sent</p>
          </div>
          <div className="kicks-auditContainer">
            <h4>Kicks</h4>
            <p>{<CountUp start={0} end={item.kicks} duration={3}></CountUp>} users kicked</p>
          </div>
        </div>
        <div className="uptime-container">
          <h3>Uptime</h3>
        </div>
        <div className="recentActivity-container">
          <h3>Recent activity</h3>
            <div className="recentActivity-content">
              <div className="recentFun">
                <p className="truncate"> {item.recentMessageUser} - {item.recentMessageContent}</p>
                <p className="truncate"> {item.recentJoinUser}</p>
              </div>
              <div className="recentAudit">
                <p className="truncate"> {item.recentBanUser} - {item.recentBanReason}</p>
                <p className="truncate"> {item.recentKickUser} - {item.recentKickReason}</p>
                <p className="truncate"> {item.recentTimeoutUser} - {item.recentTimeoutReason}</p>
              </div>
            </div>
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
