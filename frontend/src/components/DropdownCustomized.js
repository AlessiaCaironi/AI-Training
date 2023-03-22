import React, {useState} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export default function DropdownCustomized(){

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return(
    <>
    <Dropdown  isOpen={dropdownOpen} toggle={toggle} direction="down">
        <DropdownToggle caret color="primary">Account </DropdownToggle>
        <DropdownMenu>
        <DropdownItem>Logout</DropdownItem> 
        </DropdownMenu>
    </Dropdown>
    </>
    );
  
}
