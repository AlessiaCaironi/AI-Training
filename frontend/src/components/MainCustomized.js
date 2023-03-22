import React, {useState} from "react";
import ListTests from "./ListTests";
import NewTest from "./NewTest";
import ShowTest from "./ShowTest";

export default function MainCustomized(){

    const [page, setPage] = useState('tests');

    return(
        <>
        {(page==='tests') && 
            <ListTests 
                handleClickNewTest={()=>setPage('newtest')} 
                handleClickShowTest={()=>setPage('showtest')} 
            />
        }
        {(page==='newtest') && 
            <NewTest 
                handleClickBack={()=>{setPage('tests')}}
            />
        }
        {(page==='showtest') && 
            <ShowTest
                handleClickBack={()=>{setPage('tests')}}
            /> 
        }
        </>
    );
}