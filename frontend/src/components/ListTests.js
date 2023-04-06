import '../App.css';
import React, {useState, useEffect } from "react";
import HeaderCustomized from "./HeaderCustomized";
import { Table, Button, Container, Row, Col, Spinner } from "reactstrap";
import { RiDeleteBinLine } from 'react-icons/ri';
import useInterval from 'use-interval';
import useAxios from '../utils/useAxios';

export default function ListTests({handleClickNewTest, handleClickShowTest}){

    const api = useAxios();

    const [tests, setTests] = useState([]);
    const [refresh, setRefresh] = useState(true);

    // polling 
    const [delay, setDelay] = useState(1000);
    const [isPolling, setPolling] = useState(false);

    useEffect(() => {
        api
        .get("http://localhost:8000/api/tests/")
        .then(response => {
            // check - at least 1 test 
            if(response.data.length > 0){
                const len = response.data.length;
                const last = response.data[len-1];
                if(last.time_end == null && last.time_start == null){
                    setPolling(true);
                }
                setTests(response.data);
                setRefresh(false);
            } else {
                setTests([]);
                setRefresh(false);
            }
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
        api
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
        api
            .delete(`http://localhost:8000/api/tests/${id}/`)
            .then(response => setRefresh(true))
            .catch(err => console.log(err));
    };

    const list = tests.map((item, index) => ( 
        <>
        <tr key={index}>
            <th scope='row'>
                {index+1}
            </th> 
            
            {item.time_start && 
                <>
                    <td onClick={()=>handleClickShowTest(item)} className='pointer' style={{textDecoration:'underline'}}>
                        {item.name}  
                    </td>
                    <td>
                        {item.created_by.username}
                    </td>
                    <td>
                        {item.image_count}
                    </td>
                    <td>
                        {convert_time(item.time_start)}                        
                    </td>
                    <td>
                        {diff_time(item.time_start, item.time_end)} sec   
                    </td>
                    <td>
                        <RiDeleteBinLine color="red" onClick={()=>handleRemoveTest(item.id)} className='pointer'/>
                    </td> 
                </>
            }
            { item.time_start==null &&
                <>
                    <td>
                        {item.name}
                    </td>
                    <td>
                        {item.created_by.username}
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
            <Row>
                <Col></Col>
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
            <Row className="my-1">
                <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>
                            Name
                        </th>
                        <th>
                            Created by
                        </th>
                        <th>
                            Images
                        </th>
                        <th>
                            Start
                        </th>
                        <th>
                            Time
                        </th>
                        <th>
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