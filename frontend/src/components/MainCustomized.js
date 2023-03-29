import React, {useState} from "react";
import ListTests from "./ListTests";
import NewTest from "./NewTest";
import ShowTest from "./ShowTest";
import axios from "axios";

export default function MainCustomized(){

    const [page, setPage] = useState('tests');
    const [testShow, setTestShow] = useState({});

    function handleClickSave(idtest){
        axios
            .get("http://localhost:8000/celery/"+idtest+"/")
            .then((response => console.log(response)))
            .catch(err => console.log(err));
        // mostro la pagina ListTest
        setPage('tests'); 
    }

    return(
        <>
        {(page==='tests') && 
            <ListTests 
                handleClickNewTest={()=>setPage('newtest')} 
                handleClickShowTest={(test)=> {
                    setPage('showtest');
                    setTestShow(test);
                }} 
            />
        }
        {(page==='newtest') && 
            <NewTest 
                handleClickBack={() => setPage('tests')}
                handleClickSave={(idtest) => handleClickSave(idtest)}
            />
        }
        {(page==='showtest') && 
            <ShowTest
                handleClickBack={()=>{setPage('tests')}}
                test={testShow}
            /> 
        }
        </>
    );
}