import React from 'react'; 
import './Navbar.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate=useNavigate();
  const res = localStorage.getItem("user");
  const user =JSON.parse(res);
  const handleLogout=()=>{
   localStorage.clear();
  }
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <a href="#Quiz">Gk Quiz App</a>
        </li>
        <div>
        { user?.name ? (
            <h4 className="welcome5">Welcome:{user.name}</h4>
          ):(
            navigate("/")
          )}
          </div>
        <li className="navbar-item">
        {/* <img  src={`http://localhost:7000${user.profilepic}`}></img> */}
        <Link className="navbar-item2" to='/' onClick={handleLogout}> Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;