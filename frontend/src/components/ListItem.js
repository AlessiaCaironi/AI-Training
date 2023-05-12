import '../App.css';
import React, {useState, useEffect, useContext } from "react";
import HeaderCustomized from "./HeaderCustomized";
import { Table, Button, Container, Row, Col, Spinner } from "reactstrap";
import { RiDeleteBinLine } from 'react-icons/ri';
import useInterval from 'use-interval';
import useAxios from '../utils/useAxios';

import AuthContext from "../context/AuthContext";

export default function ListItems({handleClickNewItem, handleClickShowItem}){

    const { user } = useContext(AuthContext);
    const api = useAxios();

    const [items, setItems] = useState([]);
    const [refresh, setRefresh] = useState(true);

    // polling 
    const [delay, setDelay] = useState(1000);
    const [isPolling, setPolling] = useState(false);

    useEffect(() => {
        api
        .get("/items/")
        .then(response => {
            // check - at least 1 test 
            if(response.data.length > 0){
                const len = response.data.length;
                const last = response.data[len-1];
                if(last.time_end == null && last.time_start == null){
                    setPolling(true);
                }
                setItems(response.data);
                setRefresh(false);
            } else {
                setItems([]);
                setRefresh(false);
            }
        })
        .catch(err => console.log(err))
    }, [refresh]); 

    // POLLING
    useInterval(
        () => {
            checkTimeStart(items[items.length-1].id)
        },
        // delay in milliseconds or null to stop it
        isPolling ? delay : null,
    )

    // func called during polling
    const checkTimeStart = (id) => {
        api
            .get("/items/"+id+"/")
            .then((response) => {
                const res = response.data;
                if(res.time_end !== null && res.time_start !== null){
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

    const handleRemoveItem = (id) => {
        api
            .delete(`/items/${id}/`)
            .then(response => setRefresh(true))
            .catch(err => console.log(err));
    };

    const list = items.map((elem, index) => (  
        <>
        <tr key={elem.pk}>
            <th scope='row'>
                {index+1}
            </th> 
            
            {elem.time_start && 
                <>
                    <td onClick={()=>handleClickShowItem(elem)} className='pointer' style={{textDecoration:'underline'}}>
                        {elem.name}  
                    </td>
                    <td>
                        {elem.created_by.username}
                    </td>
                    <td>
                        {elem.image_count}
                    </td>
                    <td>
                        {convert_time(elem.time_start)}                        
                    </td>
                    <td>
                        {diff_time(elem.time_start, elem.time_end)} sec   
                    </td>
                    <td>
                        {
                        (user.username == elem.created_by.username) &&
                        <RiDeleteBinLine color="red" onClick={()=>handleRemoveItem(elem.id)} className='pointer'key={index}/>
                        }
                    </td> 
                </>
            }
            { elem.time_start==null &&
                <>
                    <td>
                        {elem.name}
                    </td>
                    <td>
                        {elem.created_by.username}
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
            <Row key='titolo'>
                <Col key='titolo_c1'></Col>
                <Col className="text-center my-1" key='titolo_c2'>
                    <HeaderCustomized text={'Dataset'}/>
                </Col>
                <Col className="text-right my-4" key='titolo_c3'>
                    <Button
                        color="primary"
                        outline
                        onClick={handleClickNewItem}
                    >
                        New item
                    </Button>
                </Col>
            </Row>
            <Row className="my-1" key='tabella'>
                <Table>
                <thead>
                    <tr id='tabella_intestazione'>
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
                            Created on
                        </th>
                        <th>
                            Processing time
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