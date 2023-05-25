import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import IconButton from "@mui/material/IconButton";
import GitHub from "@mui/icons-material/GitHub";
import CoPresentIcon from "@mui/icons-material/CoPresent";


export default function FooterCustomized(){
    return(
        <>
        <footer className='bg-light foot ' >
            <Container>
                <Row>
                    <Col className="text-left my-3">
                        Created by <a href="https://www.linkedin.com/in/alessia-caironi" target="_blank"> @AlessiaCaironi</a>
                    </Col>
                    <Col>
                    </Col>
                    <Col className="my-2 text-right">
                        <IconButton className="mx-2" style={{color:'black'}} href="https://github.com/AlessiaCaironi/AI-Training" target="_blank">
                        <GitHub                             
                            fontSize="inherit"
                        />
                        </IconButton>
                        <IconButton style={{color:'black'}} href="https://www.slides.aitraining.ovh/">
                        <CoPresentIcon                             
                            fontSize="inherit"
                        />
                        </IconButton>
                    </Col>
                </Row>
            </Container>
            
        </ footer>      
        </>
    );
}