import React, {useContext, useState } from 'react';
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
 import {FaBrain} from "react-icons/fa"
 import AuthContext from "../context/AuthContext";
 import Avatar from '@mui/material/Avatar';
 import {TbLogout} from "react-icons/tb"

const NavCustomized = () => {

  const { user, logoutUser  } = useContext(AuthContext);

  return(
  <>
  <Navbar color="primary"  dark expand="md">
    <div className='container'>
        {user && 
          <>
          <NavbarBrand className="text-monospace ">
            <FaBrain className='mr-3 mb-1'/>AI Training
          </NavbarBrand>
          <Nav navbar>
              <NavItem>
                <UncontrolledDropdown >
                    <DropdownToggle data-toggle="dropdown" tag="span" >
                        <Avatar sx={{ bgcolor: 'primary.light'}} className='btn btn-primary' >
                          {user.username.charAt(0).toUpperCase()}
                        </Avatar>                                     
                    </DropdownToggle>
                    <DropdownMenu style={{backgroundColor:'whitesmoke'}}>
                    <DropdownItem text style={{textAlign: 'center'}}>
                      <h6 style={{marginBottom:'0px'}}>{user.username} </h6>               
                    </DropdownItem> 
                    <DropdownItem text size='2' className='mb-2'>
                      {user.email}
                    </DropdownItem>
                    <DropdownItem style={{textAlign: 'center'}} onClick={logoutUser}>
                      <TbLogout className='mb-1 mr-1'/>  Logout
                    </DropdownItem>
                   </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
          </Nav> 
          </>
        }

        {!user &&
          <>
            <Link to='/'><NavbarBrand className="text-monospace"><FaBrain className='mr-3 mb-1'/>AI Training</NavbarBrand></Link>
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
