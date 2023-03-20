import {Modal, ModalHeader, ModalBody} from "reactstrap"


function ModalAlert({setShowAlert, msgAlert}){

    const onDismiss = () => setShowAlert(false);

    return(
        <Modal isOpen={true} toggle={onDismiss}>
            <ModalHeader toggle={onDismiss}>Errore </ModalHeader>
            <ModalBody>{msgAlert}</ModalBody>
        </Modal>
    );
}

export default ModalAlert;