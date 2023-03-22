import React from "react";
import { Container, Row, Col, Label, Card, CardTitle, CardBody, CardSubtitle } from "reactstrap";
import { IoArrowBackOutline } from 'react-icons/io5';
import HeaderCustomized from "./HeaderCustomized";
import { RiDeleteBinLine } from 'react-icons/ri';

export default function ShowTest({handleClickBack}){

    const test = {
            id: '1',
            name: 'Primo test',
            description: 'Prova della descrizione',
            date: new Date(),
            time: 200,
        };
        

    return(
        <>
        <Container>
            <Row>
            <Col>
                <h4 className="my-4"><IoArrowBackOutline  onClick={handleClickBack} /></h4>
            </Col>
            <Col className="text-center my-1">
                <HeaderCustomized text={test.name} />
            </Col>
            <Col className="text-right my-4">
                <h5 className="my-1"><RiDeleteBinLine color="red" /></h5>
            </Col>
            </Row>
            <Row className="my-4">
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
                        <CardSubtitle> {test.date.toLocaleDateString()}</CardSubtitle>
                    </CardBody>
                </Card>
                </Col>
                <Col>
                <Card>
                    <CardBody>
                        <CardTitle tag='h6'>Start time</CardTitle>
                        <CardSubtitle> {test.date.toLocaleTimeString()}</CardSubtitle>
                    </CardBody>
                </Card>
                </Col>
                <Col>
                <Card>
                    <CardBody>
                        <CardTitle tag='h6'>Time</CardTitle>
                        <CardSubtitle> {test.time} s </CardSubtitle>
                    </CardBody>
                </Card>
                </Col>
                <Col>
                <Card>
                    <CardBody>
                        <CardTitle tag='h6'>Processed Images </CardTitle>
                        <CardSubtitle> 4</CardSubtitle>
                    </CardBody>
                </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
}