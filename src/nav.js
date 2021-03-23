import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router-dom'

function Nav() {
  const navStyle = {
    color:'white'
  }
  return (
    <nav>
      <h3> Fantasy </h3>
        <ul className={"nav-links"}>
          <Link style={navStyle} to={"/"}>
            <li>Match List</li>
          </Link>
          <Link style={navStyle} to={"/about"}>
            <li>About</li>
          </Link>
          <Link style={navStyle} to={"/login"}>
            <li>Login</li>
          </Link>
        </ul>
    </nav>
  );
}

export default Nav;
