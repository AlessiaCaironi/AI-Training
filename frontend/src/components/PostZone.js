import React, {useState, useEffect} from "react";
import { useDropzone } from "react-dropzone";
import '../App.css';
import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, FormGroup, Label, Input, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import ModalAlert from "./ModalAlert";

function PostZone({setRefresh, open}) {
  const [files, setFiles] = useState([]);
  const [descrizione, setDescrizione] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState('');

  const { getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {
      'image/*': []
    }, 
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });  

  const handleDescChange = (e) => {
      setDescrizione(e.target.value);
  }

  const handleAdd = (e) => {
    if(descrizione===''){
      setShowAlert(true);
      setMsgAlert('Inserisci descrizione');
      return
    } 
    if(files.length === 0){
      setShowAlert(true);
      setMsgAlert('Inserisci almeno un file');
      return
    }
      files.forEach((item) => {
        let form_data = new FormData();
        form_data.append("percorso", item, item.name);
        form_data.append("descrizione", descrizione);
        axios
            .post(`http://localhost:8000/api/images/`, form_data, {
                headers: {
                        "Content-Type": "image/jpeg, image/png",
                },
            })
            .then(response => {
                console.log('post ok');
                setRefresh(true);
            });
        
      }); 
      setRefresh(true);
      setFiles([]);
      setDescrizione('');      
  }

  const thumbs = files.map(file => (
    <>
    <Card
      body
      style={{
        width: '95%'
      }}    
    >
      <CardImg 
        src={file.preview}
        alt={file.name}
        top
        width="100%"
          // Revoke data uri after image is loaded
        onLoad={() => { URL.revokeObjectURL(file.preview) }}
      />
    <CardBody>
      <CardTitle>
        {file.name}
      </CardTitle>
      <CardSubtitle>
        {file.size} bytes
      </CardSubtitle>
    </CardBody>
    </Card>
    </>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
    <ModalHeader>Post</ModalHeader>
    <ModalBody>
        <FormGroup>
            <Label for="data-descrizione">Descrizione</Label>
            <Input type='text' id='descrizione' value={descrizione} onChange={(e) => {handleDescChange(e)}} name='descrizione'></Input>
        </FormGroup>
        <FormGroup>
        <Label for="images-drop-zone">File</Label>  
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
              <button type="button" onClick={open} className="btn btn-success">
                Browse
              </button>
            </div>
          </div>
          <CardGroup>{thumbs}</CardGroup>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={(e) => handleAdd(e)}>Add</button>
       </ModalFooter>
      {showAlert ? (
        <ModalAlert setShowAlert={setShowAlert} msgAlert={msgAlert}/>
      ) : null}
  </>
  );
}

export default PostZone;