import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { putUpdateUser } from '../../../services/apiService';
import _ from 'lodash'
const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdate, fetchListUser, resetUpdateData } = props;
  const handleClose = () => {
    setShow(false)
    setEmail("")
    setPassword("")
    setUsername("")
    setImage("")
    setRole("USER")
    setPreviewImage("")
    resetUpdateData();
  };
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      //updateState
      setEmail(dataUpdate.email)
      setUsername(dataUpdate.username)
      setRole(dataUpdate.role)
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }

    }
  }, [dataUpdate])

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setImage(event.target.files[0]);
    } else {
      setPreviewImage("");
    }
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmitUser = async () => {
    //validate


    if (username.length < 6) {
      toast.error('Username must be at least 6 characters long', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
      return;
    }

    // callAPIs

    let data = await putUpdateUser(dataUpdate.id, username, role, image);
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
      await props.fetchListUserWithPaginate(props.currentPage);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        size='xl'
        backdrop="static"
        className='modal-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email} disabled
                onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value="******" disabled
                onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Role</label>
              <select className="form-select" onChange={(event) => setRole(event.target.value)}>
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
                onChange={(event) => handleUploadImage(event)} />
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
          <Button variant="primary" onClick={() => handleSubmitUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalUpdateUser