import * as React from 'react';
import { Link } from 'react-router-dom';
import RevLogo from '../assets/rev-logo.png';


export const NavUserComponent: React.StatelessComponent<{}> = () => {
  return (
    <div>
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
        <div className="navbar-header c-pointer shift-left">
          <Link to="/home" className="unset-anchor">
            <img className="img-adjust-position rev-logo" src={RevLogo} alt="revature" />
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            <li className="nav-item active">
              <Link to="/request-table" className="unset-anchor nav-link">Admin Table</Link>
            </li>
            <li className="nav-item active">
              <Link to="/request-form" className="unset-anchor nav-link">Reimbursement Form</Link>
            </li>
            <li className="nav-item active">
              <Link to="/view-table" className="unset-anchor nav-link">View Requests</Link>
            </li>
            <li className="nav-item active">
              <Link to="/sign-in" className="unset-anchor nav-link">Sign Out</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div >
  );
}