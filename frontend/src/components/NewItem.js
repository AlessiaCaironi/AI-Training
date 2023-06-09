
import React, {useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import HeaderCustomized from "./HeaderCustomized";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { IoArrowBackOutline } from 'react-icons/io5';
import { Gallery } from "react-grid-gallery";
import ModalAlert from "./ModalAlert";
import useAxios from '../utils/useAxios';
import IconButton from "@mui/material/IconButton";

export default function NewItem({handleClickBack, handleClickSave}){

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
    const [buttonDisabled, setButtonDisabled] = useState(false);

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


    const handleAdd = () =>{

        // check if name is valid
        if(name.trim()===''){
            setNameMissing(true);
            return
        }

        // check if description is valid
        if(desc.trim()===''){
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

        setButtonDisabled(true);

        // creo test da aggiungere
        const newItem = {
            "name": `${name}`,
            "description": `${desc}`,
        }

        // chiamata per aggiungere il nuovo item
        api
            .post("/items/", newItem)
            .then(response => {

                // conto immagini selezionate 
                let cont = 0;
                files.forEach( (elem,index ) => {
                    if(images[index].isSelected){
                        cont = cont+1;
                    }
                });

                files.forEach( (elem, index) => {
                    // controllo se l'immagine è selezionata
                    if(images[index].isSelected){
                        let form_data = new FormData();
                        form_data.append("path_input", elem, elem.name);
                        form_data.append("item_id", response.data.id);
                        
                        // chiamata per aggiungere l'immagine (img di output uguale alla rispettiva img di input)
                        api
                            .post(`/images/`, form_data, {
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
                                // se inserimento immagini non va a buon fine, allora cancella l'item creato
                                console.log(err);
                                // cancella le eventuali immagini già inserite (politica on delete cascade)
                                api
                                .delete(`/items/${response.data.id}/`)
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
                    <IconButton 
                        className="my-3" 
                        color="primary" 
                        style={{margin:0}} 
                        onClick={handleClickBack}>
                            <IoArrowBackOutline />
                    </IconButton>
                </Col>
                <Col className="text-center">
                    <HeaderCustomized text={'New item'} />
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
                        <FormGroup className="my-3">
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
                              Images
                            </Label>  
                            <div {...getRootProps({ className: "dropzone pointer" })}>
                                <input className="input-zone" {...getInputProps()} />
                                <div className="text-center drop-zone">
                                {isDragActive ? (
                                    <p className="dropzone-content font-weight-light" style={{color:'black'}}>
                                    Release to drop the images here
                                    </p>
                                ) : (
                                    <p className="dropzone-content font-weight-light" style={{color:'black'}}>
                                    Drag and drop some images here, or click to select images
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
                <Row className="mb-4">
                    <Col className="text-right">
                        <Button
                            color="primary"
                            outline
                            onClick={handleAdd}
                            disabled={buttonDisabled}
                        >
                            Add
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