import React, {useContext } from 'react';
import { Link } from "react-router-dom";
import { 
  Navbar,
  NavItem,
  NavbarBrand,
  Nav, 
  NavLink
 } from 'reactstrap'
 import AuthContext from "../context/AuthContext";

const NavCustomized = () => {
  const { user, logoutUser  } = useContext(AuthContext);
  
  return(
  <>
  <Navbar color="primary"  dark expand="md">
    <div className='container'>
      
      
        {user && 
          <>
          <NavbarBrand >NOME PROGETTO</NavbarBrand>
          <Nav navbar>
            <NavItem >
              <NavLink onClick={logoutUser} style={{cursor:'pointer'}} >
                Logout
              </NavLink>
              </NavItem>
          </Nav> 
          </>
        }

        {!user &&
          <>
            <Link to='/'><NavbarBrand >NOME PROGETTO</NavbarBrand></Link>
            <Nav navbar>
              <NavItem>
                <NavLink href='/register'>
                  Register
                </NavLink>
              </NavItem>
            </Nav> 
          </>
        }
      
    </div> 
  </Navbar>
  </>
  );
  
}

export default NavCustomized;
