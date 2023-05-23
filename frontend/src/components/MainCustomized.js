import React, {useState} from "react";
import ListItem from "./ListItem";
import NewItem from "./NewItem";
import ShowItem from "./ShowItem";
import useAxios from '../utils/useAxios';

export default function MainCustomized(){

    const api = useAxios();

    const [page, setPage] = useState('items');
    const [itemShow, setItemShow] = useState({});

    function handleClickSave(iditem){
        // start celery
        api
            .get("/items/"+iditem+"/start/")
            .catch(err => console.log(err));
        // show ListItem
        setPage('items'); 
    }

    return(
        <>
        {(page==='items') && 
            <ListItem 
                handleClickNewItem={()=>setPage('newitem')} 
                handleClickShowItem={(item)=> {
                    setPage('showitem');
                    setItemShow(item);
                }} 
                style={{height:'100%'}}
            />
        }
        {(page==='newitem') && 
            <NewItem 
                handleClickBack={() => setPage('items')}
                handleClickSave={(iditem) => handleClickSave(iditem)}
            />
        }
        {(page==='showitem') && 
            <ShowItem
                handleClickBack={()=>{setPage('items')}}
                item={itemShow}
            /> 
        }
       
        </>
    );
}