import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Container, Row, Col, Form, Label, Input, FormGroup, Button } from 'reactstrap'
import HeaderCustomized from "../components/HeaderCustomized";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <>
    <Container>
      <Row className="my-2">
        <Col></Col>
        <Col className="text-center my-1">
          <HeaderCustomized text={'Please login to proceed'}></HeaderCustomized>
        </Col>
        <Col></Col>
      </Row>
      <Row className="mt-3">
        <Form onSubmit={handleSubmit} className='container'>
          <Row>
            <Col md={5} >
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" placeholder="Enter Username" />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="Enter Password" />
              </FormGroup>
            </Col>
            <Col md={2} className='text-right mt-4'>
             <Button color='primary' type="submit" className="mt-2">Login</Button>
            </Col>
            </Row>
        </Form>
      </Row>
    </Container>
    </>
  );
};

export default LoginPage;