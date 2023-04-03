import React, {useState, useContext} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import AuthContext from "../context/AuthContext";

export default function DropdownCustomized(){
    const { user, logoutUser  } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return(
    <>
    <Dropdown  isOpen={dropdownOpen} toggle={toggle} direction="down">
        <DropdownToggle caret color="primary">Hi, {user.username} </DropdownToggle>
        <DropdownMenu>
        <DropdownItem onClick={logoutUser}>Logout</DropdownItem> 
        </DropdownMenu>
    </Dropdown>
    </>
    );
  
}
