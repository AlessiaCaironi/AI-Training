import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormGroup, Label, Input, CustomInput, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Image from "./Image";
import Lightbox from 'react-awesome-lightbox';
import "react-awesome-lightbox/build/style.css";


function RenderImages() {
    const [imageList, setImageList] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [openImages, setOpenImages] = useState(false);
    const [imageOpenList, setImageOpenList] = useState([]);
    const [startOpenIndex, setStartOpenIndex] = useState([]);
    
    const [data, setData] = useState({
        percorso: "",
        descrizione: "", 
     });
       
    useEffect(() => {
        axios
          .get("http://localhost:8000/api/images/")
          .then(response => {
            setImageList(response.data); 
            setRefresh(false); 
        })
    }, [refresh]);
 
     const handleImageChange = (e) => {
         let newData = {...data};
         newData["percorso"] = e.target.files[0];
         setData(newData);
     };
 
     const handleDescChange = (e) => {
         let newData = {...data};
         newData["descrizione"] = e.target.value;  
         setData(newData);     
     }
     
     const handleAdd = (e) => {
         console.log(data);
         let form_data = new FormData();
         form_data.append("percorso", data.percorso, data.percorso.name);
         form_data.append("descrizione", data.descrizione);
         axios
         .post(`http://localhost:8000/api/images/`, form_data,{
            headers: {
                 "Content-Type": "multipart/form-data",
            },
         })
         .then(response => setRefresh(true));
     }

    function handleOpenImages(startIndex){
        if(!openImages){
            let newImageOpenList = [];
            imageList.forEach((item) => newImageOpenList.push({
                url: `${item.percorso}`,
                title: `${item.descrizione}`,
            }));   
            setImageOpenList(newImageOpenList);
            setStartOpenIndex(startIndex);
        } 
        setOpenImages(!openImages);
    }

    return (
      <>
        <h1 className="text-uppercase text-center my-4">Images</h1>
        <div className='row'>
        <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
                <div className="mb-4">
                    
                    <ModalHeader>Post</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                        <Label for="data-descrizione">Descrizione</Label>
                        <Input type='text' id='descrizione' onChange={(e) => {handleDescChange(e)}} name='descrizione'></Input>
                        </FormGroup>
                        <FormGroup>
                        <Label for="data-image_url">File</Label>                    
                        <CustomInput type='file' id='image_url' name='image_url' accept='image/jpeg, image/png, image/gif' onChange={(e) => {handleImageChange(e)}}></CustomInput>
                        </FormGroup>
                       
                    </ModalBody>
                    <ModalFooter>
                         <button className="btn btn-primary" onClick={(e) => handleAdd(e)}>Add</button>
                    </ModalFooter>
                    
                </div>
                <ModalHeader>Get</ModalHeader>
                <ul className="list-group list-group-flush border-top-0">
                    {!openImages && imageList.map((item, index) => (
                        <Image img={item} key={item.id} setRefresh={setRefresh} handleOpenImages={handleOpenImages} startIndex={index}/>
                    ))}
                </ul>  
            </div>
          </div>
        </div>
        {openImages && <Lightbox images={imageOpenList} onClose={() => setOpenImages(!openImages)} startIndex={startOpenIndex}></Lightbox>} 
      </>
    );
}

export default RenderImages;

  