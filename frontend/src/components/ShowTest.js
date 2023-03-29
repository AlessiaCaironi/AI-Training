import React, {useState, useEffect}  from "react";
import { Container, Row, Col, Card, CardTitle, CardBody, CardSubtitle, CardImg, CardHeader } from "reactstrap";
import { IoArrowBackOutline, IoArrowForwardOutline } from 'react-icons/io5';
import {AiOutlineClose, AiOutlineZoomIn} from 'react-icons/ai'
import { RiDeleteBinLine } from 'react-icons/ri';
import HeaderCustomized from "./HeaderCustomized";
import axios from "axios";
import "react-awesome-lightbox/build/style.css";
import Lightbox from 'react-awesome-lightbox';

export default function ShowTest({handleClickBack, test}){

    const [images, setImages] = useState([]);
    const [refresh, setRefresh] = useState(true);

    // lightbox show
    const [openImages, setOpenImages] = useState(false);
    const [imageOpenList, setImageOpenList] = useState([]);
    const [startOpenIndex, setStartOpenIndex] = useState(null);

    // compare images
    const [showZoom, setShowZoom] = useState(false);
    const [imgZoom, setImgZoom] = useState(null);
    
    
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/images/test/"+test.id+'/')
            .then(response => {
                setImages(response.data);
                setRefresh(false);
            })
            .catch(err => console.log(err))
    }, [refresh]); 

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

    const handleRemoveTest = (id) => {
        axios
            .delete(`http://localhost:8000/api/tests/${id}/`)
            .then(response => handleClickBack())
            .catch(err => console.log(err));
    };

    const listCards = images.map((img, index) => 
        <>
            <Card className="mb-4 mx-3">
                <CardHeader className="d-flex justify-content-between">
                    {img.path_input.split('/')[4]}
                    <a href='#'>
                        <AiOutlineZoomIn 
                            className="my-1" 
                            onClick={() => {
                                setShowZoom(!showZoom);
                                setImgZoom(img);
                            }}
                        />
                    </a>
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
                images.forEach((item) => newImageOpenList.push({
                    url: `${item.path_input}`,
                    title: `${item.path_input.split('/')[4]}`,
                })); 
            } else {
                images.forEach((item) => newImageOpenList.push({
                    url: `${item.path_output}`,
                    title: `${item.path_output.split('/')[4]}`,
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
                    <a href='#' onClick={handleClickBack}>
                        <h4 className="my-4"><IoArrowBackOutline   /></h4>
                    </a>
                </Col>
                <Col className="text-center my-1">
                    <HeaderCustomized text={test.name} />
                </Col>
                <Col className="text-right my-4">
                    <a href='#' onClick={()=>handleRemoveTest(test.id)}>
                        <h5><RiDeleteBinLine color="red" className="my-1"/></h5>
                    </a>
                </Col>
                </Row>
                <Row className="mb-4 mt-1">
                    <Col>
                        <Card>
                        <CardBody>
                            <CardTitle tag='h6'>Description</CardTitle>
                            <CardSubtitle> {test.description}</CardSubtitle>
                        </CardBody>
                        </Card>
                        
                    </Col>
                </Row>
                <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag='h6'>Start date</CardTitle>
                            <CardSubtitle> {convert_date(test.time_start)}</CardSubtitle>
                        </CardBody>
                    </Card>
                    </Col>
                    <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag='h6'>Start time</CardTitle>
                            <CardSubtitle>{convert_time(test.time_start)}</CardSubtitle>
                        </CardBody>
                    </Card>
                    </Col>
                    <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag='h6'>Time</CardTitle>
                            <CardSubtitle> {diff_time(test.time_start, test.time_end)} sec </CardSubtitle>
                        </CardBody>
                    </Card>
                    </Col>
                    <Col>
                    <Card>
                        <CardBody>
                            <CardTitle tag='h6'>Processed Images </CardTitle>
                            <CardSubtitle> {images.length}</CardSubtitle>
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
                            <a href='#' onClick={()=>setShowZoom(!showZoom)}>
                            <h6><AiOutlineClose
                                onClick={() => {
                                    setShowZoom(!showZoom);
                                    setImgZoom(null);
                                }}
                                /></h6>
                            </a>
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
            ></Lightbox>}
        </>
    );
}