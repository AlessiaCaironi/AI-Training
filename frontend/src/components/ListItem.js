import '../App.css';
import React, {useState, useEffect, useContext } from "react";
import HeaderCustomized from "./HeaderCustomized";
import { Table, Container, Row, Col, Spinner } from "reactstrap";
import useInterval from 'use-interval';
import useAxios from '../utils/useAxios';
import ModalConfirmDelete from "./ModalConfirmDelete";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import AuthContext from "../context/AuthContext";

export default function ListItems({handleClickNewItem, handleClickShowItem}){

    const { user } = useContext(AuthContext);
    const api = useAxios();

    const [items, setItems] = useState([]);
    const [refresh, setRefresh] = useState(true);

    // polling 
    const [delay, setDelay] = useState(1000);
    const [isPolling, setPolling] = useState(false);

    // confirm delete item
    const [showConfirm, setShowConfirm] = useState(false);
    const [itemDeleteId, setItemDeleteId] = useState(null);

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
        setItemDeleteId(id);
        setShowConfirm(true);
    };

    const list = items.map((elem, index) => (  
        <>
        <tr key={elem.pk} >
            <th scope='row' onClick={()=>handleClickShowItem(elem)} style={{color:'black'}} className='pointer'>
                {index+1}
            </th> 
            
            {elem.time_start && 
                <>
                    <td onClick={()=>handleClickShowItem(elem)} style={{color:'black'}} className='pointer'>
                        {elem.name}  
                    </td>
                    <td onClick={()=>handleClickShowItem(elem)} style={{color:'black'}} className='pointer'>
                        {elem.created_by.username}
                    </td>
                    <td onClick={()=>handleClickShowItem(elem)} style={{color:'black'}} className='pointer'>
                        {elem.image_count}
                    </td>
                    <td onClick={()=>handleClickShowItem(elem)} style={{color:'black'}} className='pointer'>
                        {convert_time(elem.time_start)}                        
                    </td>
                    <td onClick={()=>handleClickShowItem(elem)} style={{color:'black'}} className='pointer'>
                        {diff_time(elem.time_start, elem.time_end)} sec   
                    </td>
                    <td>
                        {
                        (user.username == elem.created_by.username) &&
                            <>
                                <IconButton size='small' color='error' onClick={()=>handleRemoveItem(elem.id)}>
                                    <DeleteIcon                                          
                                        key={index}
                                        fontSize="inherit"
                                    />
                                </IconButton>
                            </>
                            
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
            <Container >
            <Row key='titolo'>
                <Col key='titolo_c1'></Col>
                <Col className="text-center" key='titolo_c2'>
                    <HeaderCustomized text={'Dataset'}/>
                </Col>
                <Col className="text-right my-3" key='titolo_c3'>
                    <IconButton color='primary' style={{margin:0}} onClick={handleClickNewItem}>
                        <AddIcon                             
                            fontSize="inherit"
                        />
                        </IconButton>
                </Col>
            </Row>
            <Row className="my-1" key='tabella'>
                <Table hover>
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
        
        {showConfirm ?
            <ModalConfirmDelete 
                setShowConfirm={setShowConfirm} 
                item_id={itemDeleteId} 
                handleClickBack={()=>setRefresh(true)}
            />
            : null
        }
        </>
    );
}