import '../App.css';
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

// main data fetch function
function DataFetch() {
  const [data, setData] = useState(null);

  // fetch db data on port 5000
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

  // fetch status of bot on port 4000 (and display it)
  const [online, setOnline] = useState(true); // Initialize data as false

  const checkDiscordBotStatus = async () => {
    try {
      const response = await fetch('http://localhost:4000/bot-status');
      if (response.ok) {
        console.log('Bot is online!');
        setOnline(true);
      } else {
        console.log('Bot is offline!');
        setOnline(false);
      }
    } catch (error) {
      console.error('Error while fetching data', error);
      setOnline(false);
    }
  };

    // refresh data every second
    useEffect(() => {
      const checkBotStatusInterval = setInterval(() => {
        checkDiscordBotStatus();
      }, 1000);
  
      // Clean up the interval when the component unmounts
      return () => clearInterval(checkBotStatusInterval);
    }, []);

  // linking data to variables
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
  // new upcoming item
  const upcomingItem = data?.upcomingItems;
  const upcomingCount = data?.upcomingCount;

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
    recentJoinUser,
    upcomingItem,
    upcomingCount
  };

  return (
  <div className="App">
      <header className="App-header">
        <div className="topbar-status-container">
          {online ? (
                <h2>The bot is currently online!</h2>
              ) : (
                <h2>The bot is currently offline!</h2>
                
              )}
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
              <i class="fa fa-trophy" aria-hidden="true"></i> Leveling
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
                <div className="truncate">
                  <i class="fa fa-comment"></i> <strong>{item.recentMessageUser}</strong> sent: {item.recentMessageContent} <br />
                  <i class="fa fa-door-open"></i> <strong>{item.recentJoinUser}</strong> joined the server <br /><br />
                </div>
              </div>
              <div className="recentAudit">
                <div className="truncate">
                  <i class="fa fa-ban"></i> <strong>{item.recentBanUser}</strong> was banned for: {item.recentBanReason} <br />
                  <i class="fa fa-hammer"></i> <strong>{item.recentKickUser}</strong> was kicked for: {item.recentKickReason} <br />
                  <i class="fa fa-clock"></i> <strong>{item.recentTimeoutUser}</strong> was timed out for: {item.recentTimeoutReason} 
                </div>
              </div>
            </div>
          </div>
        <div className="upcoming-container">
          <h3>Upcoming </h3><h6>({item.upcomingCount})</h6>
          <div className="upcoming-content">
            <div className="truncate">
              {item.upcomingItem}
            </div>
          </div>
        </div>
      </header>
      <script src="script.js"></script>
    </div>
  );
}

export default DataFetch;
