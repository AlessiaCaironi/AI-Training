import '../App.css';
import React, {useState, useEffect} from "react";
import HeaderCustomized from "./HeaderCustomized";
import { Table, Button, Container, Row, Col } from "reactstrap";
import { RiDeleteBinLine } from 'react-icons/ri';
import axios from "axios";


// <Spinner color='primary' size='sm'></Spinner>

export default function ListTests({handleClickNewTest, handleClickShowTest}){

    const [tests, setTests] = useState([]);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        axios
        .get("http://localhost:8000/api/tests/")
        .then(response => {
            setTests(response.data);
            setRefresh(false);
        })
    }, [refresh]); 
    
    const convert_time = (time) => {
        var newtime = new Date(time).toLocaleString();
        return newtime;
    }

    const diff_time = (time1, time2) => {
        const newdate1 = new Date(time1).getTime();
        const newdate2 = new Date(time2).getTime();
        return (newdate2 - newdate1)/1000;
    }

    const handleRemoveTest = (id) => {
        axios
            .delete(`http://localhost:8000/api/tests/${id}/`)
            .then(response => setRefresh(true));
    };
    

    const list = tests.map((item, index) => ( 
        <>
        <tr key={index}>
            <th key={index} scope='row'>
                {index+1}
            </th> 
            <td key={item.name}>
                <a 
                    href='#'
                    onClick={()=>handleClickShowTest(item)}
                >
                    {item.name}
                </a>
            </td>
            <td key={item.description} >
                {item.description}
            </td>
            <td>
                {convert_time(item.time_start)}
            </td>
            <td>
            {diff_time(item.time_start, item.time_end)} sec
                
            </td>
            <td key='cestino' >
                <a href='#' onClick={()=>handleRemoveTest(item.id)}>
                    <RiDeleteBinLine color="red" />
                </a>
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
                        <th></th>
                        <th key='name'>
                            Name
                        </th>
                        <th key='desc'>
                            Description
                        </th>
                        <th key='start'>
                            Start
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