import React, {Component} from 'react';
import { 
  Navbar,
  NavbarText,
  NavbarBrand,
 } from 'reactstrap'
 import DropdownCustomized from './DropdownCustomized';

export default class NavCustomized extends Component{

  render(){
    return(
    <>
    <Navbar color="primary"  dark expand="md">
      <div className='container'>
        <NavbarBrand href="/" >NOME PROGETTO</NavbarBrand> 
        <NavbarText ><DropdownCustomized >Account</DropdownCustomized></NavbarText>
      </div> 
    </Navbar>
    </>
    );
  }
}
