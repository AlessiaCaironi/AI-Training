import {Modal, ModalHeader} from "reactstrap"


function ModalAlert({setShowAlert, msgAlert}){

    const onDismiss = () => setShowAlert(false);

    return(
        <Modal isOpen={true} toggle={onDismiss}>
            <ModalHeader toggle={onDismiss}>{msgAlert} </ModalHeader>
        </Modal>
    );
}

export default ModalAlert;