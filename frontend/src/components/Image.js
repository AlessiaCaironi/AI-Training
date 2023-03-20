import React, { useState } from "react";
import axios from "axios";
import '../Image.css';


function Image({img, setRefresh, handleOpenImages, startIndex}){
    const [edit, setEdit] = useState(false);
    const [localEditingImg, setLocalEditingImg] = useState({});
    

    function handleEdit(img){
        if(edit===true){
            axios
                .put(`http://localhost:8000/api/images/${img.id}/`, localEditingImg)
                .then(response => setRefresh(true));
        } else {
            setLocalEditingImg({
                id: img.id,
                descrizione: `${img.descrizione}`,
            });
        }
        setEdit(!edit);
    }

    function handleEditChange({e, img}){
        setLocalEditingImg({
            id: img.id,
            descrizione: `${e.target.value}`,
        });
    }

    function handleDelete(img){
        axios
            .delete(`http://localhost:8000/api/images/${img.id}/`)
            .then(response => setRefresh(true));
    }

    return (
        <>
        <li key={img.id} className="list-group-item d-flex justify-content-between align-items-center">
            <img src={img.percorso} onClick={() => handleOpenImages(startIndex)} alt={img.descrizione}/>
            {(edit===false) && <span>{img.descrizione}</span>}
            {edit===true && <input type="text" value={localEditingImg.descrizione} onChange={(e) => handleEditChange({e, img})}></input>}
            <span>
            {(edit===false) && 
                (<>
                <button
                    className="btn btn-secondary mr-2"  
                    onClick={() => handleEdit(img)}
                >
                    Edit
                </button>
                <button
                className="btn btn-danger"
                onClick = {() => handleDelete(img)}
                >
                    Delete
                </button>
                </>)
            }
            {edit===true && 
                <button
                    className="btn btn-secondary mr-2"  
                    onClick={() => handleEdit(img)}
                >
                    Ok
                </button>
            }
                
                
            </span>
        </li> 
         
        </>
      );
}

export default Image;