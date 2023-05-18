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
} from 'reactstrap'
 import {FaBrain} from "react-icons/fa"
 import AuthContext from "../context/AuthContext";
 import Avatar from '@mui/material/Avatar';
 import LogoutIcon from '@mui/icons-material/Logout';
 import { IconButton } from '@mui/material';

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
                    <DropdownItem style={{textAlign: 'center'}} onClick={logoutUser} >
                      <IconButton size='small' color='error' style={{padding:0}}>
                        <LogoutIcon fontSize="inherit" className="mr-2 mb-1"/>
                      </IconButton>
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
