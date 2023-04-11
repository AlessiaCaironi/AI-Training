
import React, {useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import HeaderCustomized from "./HeaderCustomized";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { IoArrowBackOutline } from 'react-icons/io5';
import { Gallery } from "react-grid-gallery";
import ModalAlert from "./ModalAlert";
import useAxios from '../utils/useAxios';

export default function NewTest({handleClickBack, handleClickSave}){

    const api = useAxios();

    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [nameMissing, setNameMissing] = useState(false);
    const [descMissing, setDescMissing] = useState(false);
    const [ImageMissing, setImageMissing] = useState(false);
    // show modal if image's post request fails (es. insert html code in file with .png extension)
    const [errorImagePost, setErrorImagePost ] = useState(false); 
    const [images, setImages] = useState([]);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    
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

        // check if name is valid
        if(name===''){
            setNameMissing(true);
            return
        }

        // check if description is valid
        if(desc===''){
            setDescMissing(true);
            return
        }

        // check if there is at least one selected image
        const selectedImages = [];
        images.forEach(img => {
            if(img.isSelected){
                selectedImages.push(img)
            }
        });
        if(selectedImages.length<1){
            setImageMissing(true);
            return
        }

        // creo test da aggiungere
        const newTest = {
            "name": `${name}`,
            "description": `${desc}`,
        }

        // chiamata per aggiungere il test
        api
            .post("http://localhost:8000/api/tests/", newTest)
            .then(response => {

                // conto immagini selezionate 
                let cont = 0;
                files.forEach( (item,index ) => {
                    if(images[index].isSelected){
                        cont = cont+1;
                    }
                });

                files.forEach( (item, index) => {
                    // controllo se l'immagine è selezionata
                    if(images[index].isSelected){
                        let form_data = new FormData();
                        form_data.append("path_input", item, item.name);
                        form_data.append("test_id", response.data.id);
                        
                        // chiamata per aggiungere l'immagine (img di output uguale alla rispettiva img di input)
                        api
                            .post(`http://localhost:8000/api/images/`, form_data, {
                                headers: {
                                        "Content-Type": "image/jpeg, image/png",
                                },
                            })
                            .then(() => {
                                cont = cont-1;
                                if(cont===0){
                                    handleClickSave(response.data.id);
                                }
                            })
                            .catch(err => {
                                // se inserimento immagini non va a buon fine, allora cancella il test creato
                                console.log(err);
                                // cancella le eventuali immagini già inserite (politica on delete cascade)
                                api
                                .delete(`http://localhost:8000/api/tests/${response.data.id}/`)
                                .then(() => {
                                    setErrorImagePost(true);
                                    return;
                                })
                                .catch(err => console.log(err));
                            });
                    }
                });  
            })
            .catch(err => console.log(err))
    }

    return(
        <>
            <Container>
                <Row>
                <Col>
                    <h4 onClick={handleClickBack} className="my-4 pointer">
                        <IoArrowBackOutline />
                    </h4>
                </Col>
                <Col className="text-center my-1">
                    <HeaderCustomized text={'New test'} />
                </Col>
                <Col></Col>
                </Row>
                <Row>
                    <Form className="container">
                        <FormGroup className="mb-3" >
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
                <Row className="mt-2">
                    <Col className="text-right">
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
        {ImageMissing ? 
            <ModalAlert setShowAlert={setImageMissing} msgAlert={'Select at least one image'}/>
            : null
        }
        {descMissing ? 
            <ModalAlert setShowAlert={setDescMissing} msgAlert={'Description required'}/>
            : null
        }
        {errorImagePost ? 
            <ModalAlert setShowAlert={setErrorImagePost} msgAlert={'Check your images'}/>
            : null
        }
        </>
    );
}