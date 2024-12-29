import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import Select from 'react-select';
import { putQuizForAdmin } from '../../../../services/apiService';
import { toast } from 'react-toastify';
const options = [
  { value: 'EASY', label: 'EASY' },
  { value: 'MEDIUM', label: 'MEDIUM' },
  { value: 'HARD', label: 'HARD' },
];
const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate, resetUpdateData } = props;
  const handleClose = () => {
    setShow(false)
    setType("EASY")
    setDescription("")
    setName("")
    setImage("")
    resetUpdateData();
  };
  const handleShow = () => setShow(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      //updateState
      setDescription(dataUpdate.description)
      setName(dataUpdate.name)
      setType(dataUpdate.difficulty)
      if (dataUpdate.image) {
        setImage(`data:image/jpeg;base64,${dataUpdate.image}`);

      }

    }
  }, [dataUpdate])

  const handleUploadImage = (event) => {

    if (event.target && event.target.files && event.target.files[0]) {
      // Cập nhật trạng thái với URL của hình ảnh mới
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setImage(event.target.files[0]);
    } else {
      setPreviewImage(""); // Đặt lại hình ảnh nếu không có hình mới
    }
  }

  const handleSubmitQuiz = async () => {
    let data = await putQuizForAdmin(dataUpdate.id, description, name, type, image);
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
      await props.fetchQuiz();
      setImage(null);
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
        size='xl'
        backdrop="static"
        className='modal-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="email"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)} />
            </div>


            <div className="col-md-12">
              <Select
                value={options.find(option => option.value === type) || options.find(option => option.value === dataUpdate.difficulty)} // Tìm giá trị tương ứng
                onChange={(selectedOption) => setType(selectedOption.value)} // Cập nhật giá trị khi chọn
                options={options}
                placeholder="Quiz type..."

              />
            </div>

            <div className='col-md-12 img-preview' onClick={() => document.getElementById('fileInput').click()}>
              {previewImage ? <img src={previewImage} alt="Preview" style={{ cursor: 'pointer' }} /> : <span>Image</span>}
            </div>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }} // Ẩn input file
              onChange={handleUploadImage} // Gọi hàm khi chọn file
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalUpdateQuiz