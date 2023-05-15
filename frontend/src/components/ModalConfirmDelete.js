import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap"
import useAxios from '../utils/useAxios';

function ModalConfirmDelete({setShowConfirm, item_id, handleClickBack}){

    const api = useAxios();

    const deleteItem = () => {
        api
            .delete(`/items/${item_id}/`)
            .then(response => {
                handleClickBack();
                setShowConfirm(false);
            })
            .catch(err => console.log(err));
    };

    return(
        <Modal isOpen={true} >
            <ModalHeader>
                Confirm delete
            </ModalHeader>
            <ModalBody >
                Are you sure you want to delete this Item?<br/> 
                This process cannot be undone. 
            </ModalBody>
            <ModalFooter >
                <Button 
                    color='danger' 
                    onClick={() => deleteItem()}
                >Delete</Button>
                <Button onClick={() => setShowConfirm(false)}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalConfirmDelete;