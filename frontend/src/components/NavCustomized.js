import React, {useContext } from 'react';
import { Link } from "react-router-dom";
import { 
  Navbar,
  NavItem,
  NavbarBrand,
  Nav, 
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Button,
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
              <NavItem>
                <UncontrolledDropdown group>
                  <Button color="primary" >
                    Hi, {user.username}
                  </Button>
                    <DropdownToggle
                      caret
                      color="primary"
                    />
                   <DropdownMenu>
                    <DropdownItem header>
                      {user.email}
                    </DropdownItem> 
                    <DropdownItem onClick={logoutUser} style={{cursor:'pointer'}}>
                      Logout
                    </DropdownItem>
                   </DropdownMenu>
                </UncontrolledDropdown>
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
