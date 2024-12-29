import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import Select from 'react-select';
const ModalViewQuiz = (props) => {
  const { show, setShow, dataView } = props;
  const handleClose = () => {
    setShow(false)
    setType("EASY")
    setDescription("")
    setName("")
    setImage("")
  };
  const handleShow = () => {
    setShow(true);
    setImage(null); // Đặt lại image khi mở modal
  };
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    if (dataView.image) {
      
      setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
    }
  }, [dataView]);

  useEffect(() => {
    if (show) {
      setImage(dataView.image ? `data:image/jpeg;base64,${dataView.image}` : null); // Cập nhật image khi modal mở
    }
  }, [show, dataView]);

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
          <Modal.Title>View a quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="email"
                className="form-control"
                value={dataView.name} disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={dataView.description} disabled
              />
            </div>
            <div className="col-md-12">
              <Select
                value={{ value: dataView.type, label: dataView.difficulty }}
                isDisabled // Sử dụng isDisabled để vô hiệu hóa
                placeholder="Quiz type..."
              />
            </div>
            <div className='col-md-12 img-preview'>
              {image ? <img src={image} /> : <span>Image</span>
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
export default ModalViewQuiz