import { useState, useEffect } from "react";
import ModalViewQuiz from "./ModalViewQuiz";

const QuizTable = (props) => {
  const { listQuiz, setListQuiz } = props;
  useEffect(() => {
    props.fetchQuiz()
  }, [])

  return (
    <>
      <div style={{ fontSize: "25px", fontWeight: "600" }}>List Quizzes</div>
      <table className="table table-bordered table-hover mt-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz && listQuiz.map((item, index) => {
            return (
              <tr key={`table-quiz-${index}`}>
                <th>{item.id}</th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.difficulty}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => props.handleClickView(item)}>View</button>
                  <button className="btn btn-warning mx-3" onClick={() => props.handleClickUpdate(item)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => props.handleClickDelete(item)}>Delete</button>
                </td>
              </tr>
            )
          })}
          <tr>

          </tr>
        </tbody>
      </table>
    </>
  );
}
export default QuizTable