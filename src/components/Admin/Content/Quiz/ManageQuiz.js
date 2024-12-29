import { useState } from 'react';
import './ManageQuiz.scss';
import Select from 'react-select';
import { getAllQuizForAdmin, postCreateNewQuiz } from '../../../../services/apiService'
import { toast } from 'react-toastify';
import QuizTable from './QuizTable';
import Accordion from 'react-bootstrap/Accordion';

import ModalViewQuiz from './ModalViewQuiz';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
const options = [
  { value: 'EASY', label: 'EASY' },
  { value: 'MEDIUM', label: 'MEDIUM' },
  { value: 'HARD', label: 'HARD' },
];
const ManageQuiz = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const [listQuiz, setListQuiz] = useState([])
  const [dataView, setDataView] = useState({});
  const [showModalView, setShowModalView] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  }
  const handleSubmit = async () => {
    if (!name || !description || !type) {
      toast.error("Name/Description/Type is required", {
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

    let res = await postCreateNewQuiz(description, name, type?.value, image);
    console.log(res);
    if (res && res.EC === 0) {
      fetchQuiz();
      toast.success(res.EM, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
      setName('');
      setDescription('');
      setType('');
      setImage(null);
    } else {
      toast.error(res.EM, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  }
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin()
    if (res && res.EC === 0) {
      setListQuiz(res.DT)
      console.log(res)
    }
  }
  const handleClickView = (quiz) => {
    setShowModalView(true);
    setDataView(quiz);
  }
  const handleClickDelete = (quiz) => {
    setShowModalDelete(true);
    setDataDelete(quiz);
  }
  const handleClickUpdate = (user) => {
    setShowModalUpdate(true);
    setDataUpdate(user);
  }
  const resetUpdateData = () => {
    setDataUpdate({});
  }
  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className='float-none w-auto px-3'>Add new quiz:</legend>
                <div className="form-floating mb-3">
                  <input type="text"
                    className="form-control"
                    placeholder=""
                    value={name}
                    onChange={(event) => setName(event.target.value)} />
                  <label >Name</label>
                </div>
                <div className="form-floating">
                  <input type="text"
                    className="form-control"
                    placeholder=""
                    value={description}
                    onChange={(event) => setDescription(event.target.value)} />
                  <label >Description</label>
                </div>
                <div className='my-3  '>
                  <Select
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder="Quiz type..."
                  />
                </div>
                <div className='more-actions form-group'>

                  <label className='mb-1'>Upload Image:</label>
                  <input type="file" className="form-control" onChange={(event) => handleChangeFile(event)} />

                </div>
                <div className="mt-3">
                  <button className="btn btn-primary" onClick={() => handleSubmit()}>Add New Quiz</button>
                </div>
              </fieldset>
            </div>
            <div>
              <QuizTable fetchQuiz={fetchQuiz} listQuiz={listQuiz} setListQuiz={setListQuiz} handleClickView={handleClickView} handleClickDelete={handleClickDelete} handleClickUpdate={handleClickUpdate} />
              <ModalViewQuiz show={showModalView} setShow={setShowModalView} dataView={dataView} />
              <ModalDeleteQuiz show={showModalDelete} setShow={setShowModalDelete} fetchQuiz={fetchQuiz} dataDelete={dataDelete} />
              <ModalUpdateQuiz show={showModalUpdate} setShow={setShowModalUpdate} dataUpdate={dataUpdate} fetchQuiz={fetchQuiz} resetUpdateData={resetUpdateData} />
            </div>
          </Accordion.Body>
        </Accordion.Item>


        <Accordion.Item eventKey="1 ">
          <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
          <Accordion.Body>
            <QuizQA />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2 ">
          <Accordion.Header>Assign to Users</Accordion.Header>
          <Accordion.Body>
          <AssignQuiz />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>


      <hr />



    </div>
  )

}
export default ManageQuiz;