import '../App.css';
import React from "react";
import HeaderCustomized from "./HeaderCustomized";
import { Table, Button, Container, Row, Col, Spinner } from "reactstrap";
import { RiDeleteBinLine } from 'react-icons/ri';

export default function ListTests({handleClickNewTest, handleClickShowTest}){

    const TESTS = [
        {
            id: '1',
            name: 'Primo test',
            description: 'Prova della descrizione',
            date: new Date(),
            time: 200,
        }, 
        {
            id: '2',
            name: 'Secondo test',
            description: 'Altra prova della descrizione',
            date: new Date(),
            time: 321,
        }, 
    ];

    const list = TESTS.map((item) => (
        <>
        <tr key={item.id}>
            <th key={item.id} scope="row">
                {item.id}
            </th>
            <td key={item.name} >
                <a href='#'onClick={handleClickShowTest}>{item.name}</a>
            </td>
            <td key={item.description} >
                {item.description}
            </td>
            <td key={item.date.toDateString()} >
            {item.date.toLocaleDateString()} - {item.date.toLocaleTimeString()}
            </td>
            <td key={item.time} >
                {(item.id == 1) ? <Spinner color='primary' size='sm'></Spinner> :  <p>{item.time} s</p>}
            </td>
            <td key='cestino' >
                <RiDeleteBinLine color="red" />
            </td>
        </tr>
        </>
    ));

    return(
        <>
            <Container>
            <Row key='1'>
                <Col key='1'></Col>
                <Col className="text-center my-1">
                    <HeaderCustomized text={'Tests'}/>
                </Col>
                <Col key='2' className="text-right my-4">
                    <Button
                        color="primary"
                        outline
                        onClick={handleClickNewTest}
                    >
                        New test
                    </Button>
                </Col>
            </Row>
            <Row key='2' className="my-4">
                <Table>
                <thead>
                    <tr key="header">
                        <th key='id'>
                            Id
                        </th>
                        <th key='name'>
                            Name
                        </th>
                        <th key='desc'>
                            Description
                        </th>
                        <th key='date'>
                            Date
                        </th>
                        <th key='time'>
                            Time
                        </th>
                        <th key='canc'>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
                </Table>
            </Row>
        </Container>
        </>
    );
}