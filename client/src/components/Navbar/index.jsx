import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/create-task" style={styles.link}>Create Task</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/my-tasks" style={styles.link}>My Tasks</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/rewards-store" style={styles.link}>Rewards Store</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/me" style={styles.link}>Profile</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/login" style={styles.link}>Login</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/signup" style={styles.link}>Signup</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export default Navbar;
