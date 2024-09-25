import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { deleteUser } from '../../../services/apiService';
const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete, fetchListUser } = props;
  const handleClose = () => setShow(false);


  const handleDeleteUser = async () => {
    // await deleteUser(dataDelete.id);
    // handleClose();
    // // Call API fetch list user after delete user
    // await fetchListUser();
    let data = await deleteUser(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
      handleClose();
      props.setCurrentPage(1);
      await props.fetchListUserWithPaginate(1);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete the user</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this user.username = <b>{dataDelete && dataDelete.username ? dataDelete.username : ""}</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleDeleteUser()}  >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;