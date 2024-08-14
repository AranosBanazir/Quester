import React from 'react';
import { Link } from 'react-router-dom';
import { ME} from '../../utils/queries';
import { useQuery } from '@apollo/client';

function Navbar() {
  const {loading, error, data} = useQuery(ME)
  const userType = data?.me.__typename || 'user'
 
  
  const isThereData = data && true
  //checking if the person is logged in

  let navItems = []
  //checking what nav items to display
  if (userType === 'Parent'){
    navItems = [
      "Rewards",
      "Tasks",
      "Kids",
      "Logout",
    ]
  }else if (userType === 'Child'){
    navItems = [
      "Rewards",
      "Tasks",
      "Logout",
    ]
  }else{
    navItems = [
      "Login",
      "Signup",
    ]
  }
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        {navItems.map(item=>{
          return (
            <li style={styles.navItem} key={item}>
              <Link to={`/${item}`} style={styles.link}>{item}</Link>
          </li>
          )
        })}
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
