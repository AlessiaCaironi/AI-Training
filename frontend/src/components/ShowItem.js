import React, {useState, useEffect, useContext}  from "react";
import { Container, Row, Col, Card, CardTitle, CardBody, CardSubtitle, CardImg, CardHeader, Tooltip, Input } from "reactstrap";
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import {AiOutlineClose, AiOutlineZoomIn} from 'react-icons/ai'
import HeaderCustomized from "./HeaderCustomized";
import "react-awesome-lightbox/build/style.css";
import Lightbox from 'react-awesome-lightbox';
import useAxios from '../utils/useAxios';
import ModalConfirmDelete from "./ModalConfirmDelete";
import {MdModeEdit} from "react-icons/md"
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {FiCheck} from "react-icons/fi";
import EditIcon from "@mui/icons-material/Edit";

import AuthContext from "../context/AuthContext";

export default function ShowItem({handleClickBack, item}){

    const { user } = useContext(AuthContext);
    const api = useAxios();

    const [images, setImages] = useState([]);
    const [refresh, setRefresh] = useState(true);

    // lightbox show
    const [openImages, setOpenImages] = useState(false);
    const [imageOpenList, setImageOpenList] = useState([]);
    const [startOpenIndex, setStartOpenIndex] = useState(null);

    // compare images
    const [showZoom, setShowZoom] = useState(false);
    const [imgZoom, setImgZoom] = useState(null);    

    // confirm delete item
    const [showConfirm, setShowConfirm] = useState(false);

    // email tooltip 
    const [toolTipOpen, setToolTipOpen] = useState(false);

    // show input e button per modifica descrizione
    const [showChangeDesc, setShowChangeDesc] = useState(false);
    const [desc, setDesc] = useState(item.description);
    

    const handleDescChange = (e) => {
        setDesc(e.target.value);
    }

    const handleConfirmDesc = (e) => {
        api 
            .put(`/items/${item.id}/`, {
                id: `${item.id}`,
                name: `${item.name}`, 
                description: `${desc}`,
            })
            .then()
            .catch(err => console.log(err));
        setShowChangeDesc(!showChangeDesc);
    }
    
    useEffect(() => {
        // get images 
        api
            .get("/images/item/"+item.id+'/')
            .then(response => {
                setImages(response.data);
                setRefresh(false);
            })
            .catch(err => console.log(err));
    }, [refresh, item]); 

    const convert_date = (time) => {
        var newdate = new Date(time).toLocaleDateString();
        return newdate;
    }

    const convert_time = (time) => {
        var newtime = new Date(time).toLocaleTimeString();
        return newtime;
    }

    const diff_time = (time1, time2) => {
        const newdate1 = new Date(time1).getTime();
        const newdate2 = new Date(time2).getTime();
        return (newdate2 - newdate1)/1000;
    }

    const listCards = images.map((img, index) => 
        <>
            <Card className="mb-4 mx-3" key={index}>
                <CardHeader className="d-flex justify-content-between">
                    {img.path_input.split('/')[4]}
                        <AiOutlineZoomIn 
                            className="my-1 pointer" 
                            onClick={() => {
                                setShowZoom(!showZoom);
                                setImgZoom(img);
                            }}
                        />
                </CardHeader>
                <CardBody>
                    <CardImg 
                        src={img.path_input} 
                        className="mx-1" 
                        style={{width:'230px'}}
                        onClick={() => handleOpenImages(index, true)}
                    />
                    <IoArrowForwardOutline/>
                    <CardImg 
                        src={img.path_output} 
                        className="mx-1" 
                        style={{width:'230px'}}
                        onClick={() => handleOpenImages(index, false)}
                    />
                </CardBody>
            </Card>
        </>
    );

    const handleOpenImages = (startIndex, isInput) => {
        
        if(!openImages){
            let newImageOpenList = [];
            if(isInput){
                images.forEach((img) => newImageOpenList.push({
                    url: `${img.path_input}`,
                    title: `${img.path_input.split('/')[4]}`,
                })); 
            } else {
                images.forEach((img) => newImageOpenList.push({
                    url: `${img.path_output}`,
                    title: `${img.path_output.split('/')[4]}`,
                }));
            }
             
            setImageOpenList(newImageOpenList);
            setStartOpenIndex(startIndex);
        } 
        setOpenImages(!openImages);
    }

    return(
        <>         
            <Container>
                {!showZoom && 
                <>
                <Row>
                <Col>
                    <IconButton className="my-3" color="primary" style={{margin:0}} onClick={handleClickBack}>
                        <IoArrowBackOutline />
                    </IconButton>
                </Col>
                <Col className="text-center my">
                    <HeaderCustomized text={item.name} />
                </Col>
                <Col className="text-right my-3">
                    {
                    (user.username == item.created_by.username) &&
                        <>
                        <IconButton size='small' color='error' onClick={()=>setShowConfirm(true)}>
                            <DeleteIcon
                                className="my-1" 
                                fontSize="inherit"
                            />
                        </IconButton>
                        </>
                    }
                </Col>
                </Row>
                <Row className="mb-4 mt-1">
                    <Col className="col-9">
                        <Card>
                        <CardBody>
                            <CardTitle tag='h6'>                                
                                <Row>
                                    <Col>Description</Col>
                                    <Col className="text-right" >
                                        {!showChangeDesc &&
                                            <IconButton 
                                                size='small' 
                                                color='primary' 
                                                style={{margin:0}} 
                                                onClick={() => setShowChangeDesc(!showChangeDesc)}>
                                                    <EditIcon     
                                                        fontSize="inherit"
                                                    />
                                            </IconButton>
                                        }
                                        {showChangeDesc &&
                                            <IconButton 
                                                size='small' 
                                                color='primary' 
                                                style={{margin:0}} 
                                                onClick={handleConfirmDesc}>
                                                <FiCheck />
                                            </IconButton>
                                        }
                                    </Col>
                                </Row>                                                                
                            </CardTitle>
                            {!showChangeDesc && 
                                <CardSubtitle> {desc}</CardSubtitle>                            
                            }
                            {showChangeDesc &&
                                <>                                
                                    <Input 
                                        type="textarea"
                                        id="descrition" 
                                        value={desc} 
                                        onChange={handleDescChange}
                                    />                                
                                </>
                            }
                        </CardBody>
                        </Card>
                        
                    </Col>
                    <Col className="col-3">
                        <Card>
                        <CardBody>
                            <CardTitle tag='h6' className="mb-2">Created by</CardTitle>
                            <CardSubtitle className="mt-3"> 
                                <span id="TooltipEmail" className="pointer">
                                    {item.created_by.username}
                                </span>
                                <Tooltip 
                                    isOpen={toolTipOpen}
                                    target="TooltipEmail"
                                    toggle={()=>setToolTipOpen(!toolTipOpen)}
                                    placement="right"
                                >
                                    {item.created_by.email}
                                </Tooltip>
                            </CardSubtitle>
                        </CardBody>
                        </Card>
                        
                    </Col>
                </Row>
                <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag='h6'>Created on</CardTitle>
                            <CardSubtitle> {convert_date(item.time_start)}</CardSubtitle>
                        </CardBody>
                    </Card>
                    </Col>
                    <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag='h6'>Created at</CardTitle>
                            <CardSubtitle>{convert_time(item.time_start)}</CardSubtitle>
                        </CardBody>
                    </Card>
                    </Col>
                    <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag='h6'>Processing time</CardTitle>
                            <CardSubtitle> {diff_time(item.time_start, item.time_end)} sec </CardSubtitle>
                        </CardBody>
                    </Card>
                    </Col>
                    <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag='h6'>Processed Images </CardTitle>
                            <CardSubtitle> {item.image_count}</CardSubtitle>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
                <Row className="my-4 text-center d-flex justify-content-between"> 
                    {listCards}
                </Row>
                </>
            }
            {showZoom &&
                <>
                <Row className="d-flex justify-content-center">
                    <Card className="my-4 mx-3">
                        <CardHeader className="d-flex justify-content-between">
                            {imgZoom.path_input.split('/')[4]}
                            
                            <h6 onClick={()=>setShowZoom(!showZoom)} className='pointer'>
                            <AiOutlineClose
                                onClick={() => {
                                    setShowZoom(!showZoom);
                                    setImgZoom(null);
                                }}
                            /></h6>
                            
                        </CardHeader>
                        <CardBody>
                            <CardImg 
                                src={imgZoom.path_input} 
                                className="mx-2" 
                                style={{width:'440px'}}
                            />
                            <IoArrowForwardOutline/>
                            <CardImg 
                                src={imgZoom.path_output} 
                                className="mx-2" 
                                style={{width:'440px'}}
                            />
                        </CardBody>
                    </Card>
                </Row>
                </>
            }
        </Container>
        {openImages && 
            <Lightbox 
                images={imageOpenList}
                onClose={() => setOpenImages(!openImages)} 
                startIndex={startOpenIndex}
            ></Lightbox>
        }
        {showConfirm ?
            <ModalConfirmDelete 
                setShowConfirm={setShowConfirm} 
                item_id={item.id} 
                handleClickBack={handleClickBack}
            />
            : null
        }
        </>
    );
}