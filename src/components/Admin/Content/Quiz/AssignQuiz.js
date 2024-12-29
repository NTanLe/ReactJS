import { useEffect, useState } from "react";
import Select from "react-select"
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService'
import { toast } from 'react-toastify';
const AssignQuiz = (props) => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [listQuizzes, setListQuizzes] = useState([])

  const [selectedUser, setSelectedUser] = useState({});
  const [listUsers, setListUsers] = useState([])
  const handleAssign = async () => {
    let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
    if (res && res.EC === 0) {
      toast.success(res.EM)
    } else {
      toast.error(res.EM)
    }
  }

  useEffect(() => {
    fetchQuiz();
    fetchUser()
  }, [])
  const fetchUser = async () => {
    let res = await getAllUsers()
    if (res && res.EC === 0) {
      let newUser = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        }
      })
      setListUsers(newUser)
    }
  }

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin()
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        }
      })
      setListQuizzes(newQuiz)
    }
  }


  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group" >
        <label>Select Quiz:</label>
        <Select
          value={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuizzes}
        />
      </div>


      <div className="col-6 form-group" >
        <label>Select User:</label>
        <Select
          value={selectedUser}
          onChange={setSelectedUser}
          options={listUsers}
        />
      </div>

      <div>
        <button className="btn btn-primary mt-3" onClick={() => handleAssign()}>Assign</button>
      </div>
    </div>

  )

}
export default AssignQuiz