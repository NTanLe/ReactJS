import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { putUpdateUser } from '../../../services/apiService';
import _ from 'lodash'
const ModalViewUser = (props) => {
  const { show, setShow, dataView } = props;
  const handleClose = () => {
    setShow(false)
    setEmail("")
    setPassword("")
    setUsername("")
    setImage("")
    setRole("USER")
    setPreviewImage("")

  };
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    if (dataView.image) {
      setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
    }
  }, [dataView])



  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size='xl'
        backdrop="static"
        className='modal-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>View a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email} disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value="******" disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username} disabled
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select className="form-select" disabled>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className='col-md-12'>
              <label className='form-label label-upload' htmlFor='labelUpload' value={image}>
                <FcPlus />Upload File Image
              </label>
              <input
                type="file" hidden
                id="labelUpload"
                disabled />
            </div>
            <div className='col-md-12 img-preview'>
              {previewImage ? <img src={previewImage} /> : <span>Preview Image</span>
              }
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalViewUser