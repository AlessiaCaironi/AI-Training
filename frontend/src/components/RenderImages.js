import React, { useState, useEffect } from "react";
import axios from "axios";
import PostZone from "./PostZone";
import GetZone from "./GetZone";

function RenderImages() {
    const [imageList, setImageList] = useState([]);
    const [refresh, setRefresh] = useState(true);    
       
    useEffect(() => {
        axios
          .get("http://localhost:8000/api/images/")
          .then(response => {
            setImageList(response.data); 
            setRefresh(false); 
        })
    }, [refresh]);

    
   
    return (
      <>
        <h1 className="text-uppercase text-center my-4">Images</h1>
        <div className='row'>
        <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
                <div className="mb-4">
                    <PostZone setRefresh={setRefresh}/>      
                </div>
                <div className="mb-4">
                    {imageList.length!==0 &&  <GetZone imageList={imageList} setRefresh={setRefresh}/>}   
                </div>     
            </div>
          </div>
        </div>
      </>
    );
}

export default RenderImages;

  