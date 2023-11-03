import './App.css';

function App() {
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
              <a href>
                <i className="fa fa-home" aria-hidden="true"></i> Dashboard
              </a>
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
            <p>30 timed out</p>
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
    </div>
  );
}

export default App;
