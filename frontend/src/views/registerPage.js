import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Container, Row, Col, Form, Label, Input, FormGroup, Button } from 'reactstrap'
import HeaderCustomized from "../components/HeaderCustomized";
import ModalAlert from "../components/ModalAlert";
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);

  const [ passwordMatch, setPasswordMatch ] = useState(false);
  const [ errorPassword, setErrorPassword ] = useState(false);
  const [ msgErrorPassword, setMsgErrorPassword ] = useState(null);
  // tutti gli altri errori (compreso user già esistente)
  const [ errorRegister, setErrorRegister ] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if(password !== password2){
      setPasswordMatch(true);
      return
    }
    if(password.length < 8){
      setErrorPassword(true);
      setMsgErrorPassword('This password is too short. It must contain at least 8 characters.');
      return
    }
    if(!(/[A-Z]/.test(password))){
      setErrorPassword(true);
      setMsgErrorPassword('Passowrd must contain at least 1 uppercase character');
      return
    }
    if(!(/[a-z]/.test(password))){
      setErrorPassword(true);
      setMsgErrorPassword('Passowrd must contain at least 1 lowercase character');
      return
    }
    if(!(/\d/.test(password))){
      setErrorPassword(true);
      setMsgErrorPassword('Passowrd must contain at least 1 number');
      return
    }
    if(!(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(password))){
      setErrorPassword(true);
      setMsgErrorPassword('Passowrd must contain at least 1 special character');
      return
    }

    registerUser(username, email, password, password2, setErrorRegister);
  };

  return (
    <>
    <Container>
      <Row className="my-2">
        <Col>
          <Link to='/' >
              <h4 className="my-4 pointer"><IoArrowBackOutline /></h4>
          </Link>
        </Col>
        <Col className="text-center my-1">
          <HeaderCustomized text={'Register'}></HeaderCustomized>
        </Col>
        <Col></Col>
      </Row>
      <Row className="mt-3">
        <Form onSubmit={handleSubmit} className='container'>
          <Row>
            <Col md={6} >
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  autoComplete="off"
                />
              </FormGroup>
            </Col>
            <Col md={6} >
              <FormGroup>
                <Label htmlFor="username">Email</Label>
                <Input
                  type="text"
                  id="email"
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter e-mail"
                  required
                  autoComplete="off"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={6} >
              <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="off"
              />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirm-password"
                  onChange={e => setPassword2(e.target.value)}
                  placeholder="Confirm Password"
                  required
                  autoComplete="off"
                />
              </FormGroup>
            </Col>
            <Col className='text-right mt-4'>
             <Button color='primary' type="submit" className="mt-2">Register</Button>
            </Col>
            </Row>
        </Form>
      </Row>
    </Container>
    {passwordMatch ? 
      <ModalAlert setShowAlert={setPasswordMatch} msgAlert={'Passwords do not match'}/>
      : null
    }
    {errorPassword ? 
      <ModalAlert setShowAlert={setErrorPassword} msgAlert={msgErrorPassword}/>
      : null
    }
     {errorRegister ? 
      <ModalAlert setShowAlert={setErrorRegister} msgAlert={'Registration failed'}/>
      : null
    }
    </>
    
  );
}

export default Register;