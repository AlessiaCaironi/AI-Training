import '../App.css';
import React, {useState, useEffect } from "react";
import HeaderCustomized from "./HeaderCustomized";
import { Table, Button, Container, Row, Col, Spinner } from "reactstrap";
import { RiDeleteBinLine } from 'react-icons/ri';
import axios from "axios";
import useInterval from 'use-interval'


export default function ListTests({handleClickNewTest, handleClickShowTest}){

    const [tests, setTests] = useState([]);
    const [refresh, setRefresh] = useState(true);

    // polling 
    const [delay, setDelay] = useState(2000);
    const [isPolling, setPolling] = useState(false);

    useEffect(() => {
        axios
        .get("http://localhost:8000/api/tests/")
        .then(response => {
            const len = response.data.length;
            const last = response.data[len-1];
            if(last.time_end == null && last.time_start == null){
                setPolling(true);
            }
            setTests(response.data);
            setRefresh(false);
        })
        .catch(err => console.log(err))
    }, [refresh]); 

    // POLLING
    useInterval(
        () => {
            checkTimeStart(tests[tests.length-1].id)
        },
        // delay in milliseconds or null to stop it
        isPolling ? delay : null,
    )

    // func called during polling
    const checkTimeStart = (id) => {
        axios
            .get("http://localhost:8000/api/tests/"+id+"/")
            .then((response) => {
                const item = response.data;
                if(item.time_end !== null && item.time_start !== null){
                    setPolling(false);
                    // setRefresh(true);
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(()=>{
        setRefresh(true);
    }, [isPolling]);
    
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
            .then(response => setRefresh(true))
            .catch(err => console.log(err));
    };
    

    const list = tests.map((item, index) => ( 
        <>
        <tr key={item.id}>
            <th key={index} scope='row'>
                {index+1}
            </th> 
            
            {item.time_start && 
                <>
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
                </>
            }
            { item.time_start==null &&
                <>
                    <td key={item.name}>
                        {item.name}
                    </td>
                    <td key={item.description} >
                        {item.description}
                    </td>
                    <td><Spinner color='primary' size='sm'></Spinner></td>
                    <td></td>
                    <td></td>
                </>   
            }
        </tr>
        </>
    ));


    return(
        <>
            <Container>
            <Row >
                <Col ></Col>
                <Col className="text-center my-1">
                    <HeaderCustomized text={'Tests'}/>
                </Col>
                <Col className="text-right my-4">
                    <Button
                        color="primary"
                        outline
                        onClick={handleClickNewTest}
                    >
                        New test
                    </Button>
                </Col>
            </Row>
            <Row className="my-2">
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