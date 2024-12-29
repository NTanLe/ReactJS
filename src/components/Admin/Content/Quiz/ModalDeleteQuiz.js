import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { deleteQuizForAdmin } from '../../../../services/apiService';
const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete, fetchQuiz } = props;
  const handleClose = () => setShow(false);


  const handleDeleteQuiz = async () => {
    // await deleteUser(dataDelete.id);
    // handleClose();
    // // Call API fetch list user after delete user
    // await fetchListUser();
    let data = await deleteQuizForAdmin(dataDelete.id);
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
      await props.fetchQuiz(1);
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
          <Modal.Title>Confirm delete the quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this quiz.name = <b>{dataDelete && dataDelete.name ? dataDelete.name : ""}</b></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleDeleteQuiz()}  >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteQuiz;