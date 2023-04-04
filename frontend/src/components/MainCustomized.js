import React, {useState} from "react";
import ListTests from "./ListTests";
import NewTest from "./NewTest";
import ShowTest from "./ShowTest";
import useAxios from '../utils/useAxios';

export default function MainCustomized(){

    const api = useAxios();

    const [page, setPage] = useState('tests');
    const [testShow, setTestShow] = useState({});

    function handleClickSave(idtest){
        // start celery
        api
            .get("http://localhost:8000/api/tests/"+idtest+"/start/")
            .catch(err => console.log(err));
        // show ListTest
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