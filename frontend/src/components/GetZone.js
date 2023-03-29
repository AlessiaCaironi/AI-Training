import React, { useState } from "react";
// import "react-awesome-lightbox/build/style.css";
import {ModalHeader} from "reactstrap";
import Image from "./Image";
// import Lightbox from 'react-awesome-lightbox/build/style.css';

function GetZone( {imageList, setRefresh}){

    const [openImages, setOpenImages] = useState(false);
    const [imageOpenList, setImageOpenList] = useState([]);
    const [startOpenIndex, setStartOpenIndex] = useState([]);

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


    return(
        <>
        <ModalHeader>Get</ModalHeader>
        <ul className="list-group list-group-flush border-top-0">
            {!openImages && imageList.map((item, index) => (
                <Image img={item} key={item.id} setRefresh={setRefresh} handleOpenImages={handleOpenImages} startIndex={index}/>
            ))}
        </ul> 
        {openImages && 
            <Lightbox 
                images={imageOpenList} 
                onClose={() => setOpenImages(!openImages)} 
                startIndex={startOpenIndex}
            ></Lightbox>} 
        </> 
    )
}

export default GetZone;