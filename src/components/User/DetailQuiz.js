import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataQuiz, postSubmitQuiz } from '../../services/apiService';
import _ from 'lodash';
import { NavItem } from "react-bootstrap";
import './DetailQuiz.scss';
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
const DetailQuiz = (props) => {
  let params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  const [index, setIndex] = useState(0)
  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  }
  const handleNext = () => {
    if (index < dataQuiz.length - 1) {
      setIndex(index + 1);
    }
  }


  const handleCheckBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(item => +item.questionId === +questionId);
    if (question && question.answers) {
      let b = question.answers.map(answer => {
        if (+answer.id === +answerId) {
          answer.isSelected = !answer.isSelected;
        }
        return answer;
      })
      question.answers = b;
    }
    let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  }
  const handleFinish = async () => {
    let payLoad = {
      quizId: +quizId,
      answers: []
    }

    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach(question => {
        let userAnswers = [];

        question.answers.forEach((answer) => {
          if (answer.isSelected) {
            userAnswers.push(answer.id)
          }
        })

        payLoad.answers.push({
          questionId: +question.questionId,
          userAnswerId: userAnswers
        })
      })
      // call API to submit answers
      let res = await postSubmitQuiz(payLoad);
      console.log(res)
      if (res && res.EC === 0) {
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData
        });
        setIsShowModalResult(true)
      } else {
        alert("Please enter")
      }
    }

  }
  useEffect(() => {
    fetchQuestions();
  }, [quizId])
  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id") // group by idQuestion
        .map((value, key) => {
          let answers = []
          let question, image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              question = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          })
          answers = _.orderBy(answers, ['id', ['asc'] ])
          return { questionId: key, answers, question, image }
        })
        .value();
      setDataQuiz(data);
    }
  }
  console.log(index)
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title" >
          Quiz {quizId}:  {location?.state.quizTitle}
          {/* print quizTitle */}
        </div>
        <hr />
        <div className="quiz-body">

        </div>
        <div className="quiz-content">
          <Question data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} handleCheckBox={handleCheckBox} index={index} />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>Prev</ button>
          <button className="btn btn-primary " onClick={() => handleNext()}>Next</ button>
          <button className="btn btn-warning " onClick={() => handleFinish()}>Finish</ button>
        </div>
      </div>
      <div className="right-content">
        <RightContent dataQuiz={dataQuiz} handleFinish={handleFinish} setIndex={setIndex} />
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult} />
    </div>

  )
}
export default DetailQuiz