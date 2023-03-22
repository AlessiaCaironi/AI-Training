
import React, {useState, useEffect} from "react";
import { useDropzone } from "react-dropzone";
import HeaderCustomized from "./HeaderCustomized";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { IoArrowBackOutline } from 'react-icons/io5';
import { Gallery } from "react-grid-gallery";
import ModalAlert from "./ModalAlert";


export default function NewTest({handleClickBack}){

    const [files, setFiles] = useState([]);
        
    const [name, setName] = useState('');
    const [nameMissing, setNameMissing] = useState(false);
    const handleNameChange = (e) => {
        setNameMissing(false);
        setName(e.target.value);
    }

    const [desc, setDesc] = useState('');
    const handleDescChange = (e) => {
        setDesc(e.target.value);
    }

    const { getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: {
          'image/*': []
        }, 
        onDrop: acceptedFiles => {
            const newFiles = [...files].concat(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
               })));
            setFiles(newFiles);
        }
    });  

    const [images, setImages] = useState([]);

    // gestione selezione immagini
    const handleSelect = (index, item, event) => {
        const nextImages = images.map((image, i) =>
          i === index ? { ...image, isSelected: !image.isSelected } : image
        );
        setImages(nextImages);
      };

    
    useEffect(() => {
        const newimages = [];
        files.forEach((file) => {
                newimages.push({
                    src:`${file.preview}`,
                    tags: [
                    { value: `${file.name}`, title: `${file.name}`},
                    ],
                    height: `${50}`,
                    isSelected: `${true}`,
                });
            }
        );
        setImages(newimages);
    }, [files])
    
    useEffect(() => {

        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
       return () => files.forEach(file => URL.revokeObjectURL(file.preview));
        
      }, [files]);

    const handleStart = () =>{
        if(name===''){
            setNameMissing(true);
        } else {
            console.log('start');
        }
    }
   
    return(
        <>
            <Container>
                <Row>
                <Col>
                    <h4 className="my-4"><IoArrowBackOutline  onClick={handleClickBack} /></h4>
                </Col>
                <Col className="text-center my-1">
                    <HeaderCustomized text={'New test'} />
                </Col>
                <Col></Col>
                </Row>
                <Row>
                    <Form className="container">
                        <FormGroup className="my-4" >
                            <Label for="name">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                autoComplete="off"
                                value={name}
                                onChange={handleNameChange}
                                maxLength='50'
                            />  
                        </FormGroup>
                        <FormGroup className="my-4">
                            <Label for="decsription">
                                Description
                            </Label>
                            <Input
                                id="decsription"
                                name="decsription"
                                type="textarea"
                                autoComplete="off"
                                value={desc}
                                onChange={handleDescChange}
                                maxLength='200'
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="images-drop-zone">
                              Files
                            </Label>  
                            <div {...getRootProps({ className: "dropzone" })}>
                                <input className="input-zone" {...getInputProps()} />
                                <div className="text-center drop-zone">
                                {isDragActive ? (
                                    <p className="dropzone-content ">
                                    Release to drop the files here
                                    </p>
                                ) : (
                                    <p className="dropzone-content ">
                                    Drag and drop some files here, or click to select files
                                    </p>
                                )}
                                <Button type='button' outline color='primary'>Browse</Button>
                               
                                </div>
                            </div>
                            
                        </FormGroup>
                        <FormGroup>
                          {files.length>0 && <Gallery images={images} enableImageSelection={true} onSelect={handleSelect} />}
                        </FormGroup>
                    </Form>
                </Row>
                <Row className="my-4">
                <Col className="text-right my-4">
                    <Button
                        color="primary"
                        outline
                        onClick={handleStart}
                    >
                        Start
                    </Button>
                </Col>
                </Row>
        </Container>
        {nameMissing ? 
            <ModalAlert setShowAlert={setNameMissing} msgAlert={'Name required'}/>
            : null
        }
        </>
    );
}