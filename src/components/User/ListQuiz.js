import { useEffect, useState } from "react";
import { getQuizByUser } from '../../services/apiService';
import './ListQuiz.scss';
import { useNavigate } from "react-router-dom";
const ListQuiz = () => {
  const [listQuiz, setListQuiz] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    getQuizData();
  }, [])
  const getQuizData = async () => {
    let res = await getQuizByUser();
    console.log(res);
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
      console.log(res)
    }
  }
  return (
    <>
      <div className="list-quiz-container container">
        {listQuiz && listQuiz.length > 0 &&
          listQuiz.map((quiz, index) => {
            return (
              <div className="card" style={{ width: "18rem" }} key={`${index} - quiz`}>
                <img src={`data:image/jpeg;base64,${quiz.image}`} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Quiz {index + 1}</h5>
                  <p className="card-text description">{quiz.description}</p>
                  <button className="btn btn-primary btn-quiz" onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}>Start now</button>
                </div>
                {/* get quizTitle by state react router dom through location */}
              </div>

            )
          })}
        {listQuiz && listQuiz.length === 0 &&
          <div>You don't have any quiz now... </div>
        }

      </div>
    </>
  )
}
export default ListQuiz