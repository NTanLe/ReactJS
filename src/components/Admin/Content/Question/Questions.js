import { useEffect, useState } from "react";
import Select from "react-select"
import './Questions.scss'
import { CiSquarePlus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash";
import { toast } from 'react-toastify';
import { getAllQuizForAdmin, postCreateNewQuiz, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from '../../../../services/apiService'
const Questions = (props) => {
  const initQuestions = [{
    id: uuidv4(),
    description: '',
    imageFile: '',
    imageName: '',
    answers: [
      {
        id: uuidv4(),
        description: '',
        isCorrect: false
      }
    ]
  }]
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [isPreviewImage, setIsPreviewImage] = useState(false)
  const [listQuizzes, setListQuizzes] = useState([])
  useEffect(() => {
    fetchQuiz()
  }, [])
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

  const [questions, setQuestions] = useState(initQuestions)

  const handleAddRemoveQuestion = (type, id) => {
    if (type === 'ADD') {
      const newQuestion = {
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        answers: [
          {
            id: uuidv4(),
            description: '',
            isCorrect: false
          }
        ]
      }
      setQuestions([...questions, newQuestion])
    }
    if (type === 'REMOVE') {
      let questionClone = _.cloneDeep(questions)
      questionClone = questionClone.filter(item => item.id !== id)
      setQuestions(questionClone)
    }
  }
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    console.log(type, questionId, answerId)
    let questionClone = _.cloneDeep(questions)
    if (type === 'ADD') {
      const newAnswer = {
        id: uuidv4(),
        description: '',
        isCorrect: false
      }
      let index = questionClone.findIndex(item => item.id === questionId)
      questionClone[index].answers.push(newAnswer)
      setQuestions(questionClone)
    }
    if (type === 'REMOVE') {
      let index = questionClone.findIndex(item => item.id === questionId)
      questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== answerId)
      setQuestions(questionClone)
    }
  }
  const handleOnChange = (type, questionId, value) => {
    let questionClone = _.cloneDeep(questions)
    if (type === 'QUESTION') {
      let index = questionClone.findIndex(item => item.id === questionId)
      if (index > -1) {
        questionClone[index].description = value
        setQuestions(questionClone)
      }
    }
  }

  const handleOnChangeFileQuestion = (type, questionId, event) => {
    let questionClone = _.cloneDeep(questions)
    if (type === 'QUESTION') {
      let index = questionClone.findIndex(item => item.id === questionId)
      if (index > -1 && event.target && event.target.files && event.target.files[0]) {
        questionClone[index].imageFile = event.target.files[0]
        questionClone[index].imageName = event.target.files[0].name
        console.log('check file', event.target.files[0])
        setQuestions(questionClone)
      }
    }
  }
  const handleAnswerQuestionChange = (type, answerId, questionId, value) => {
    let questionClone = _.cloneDeep(questions)
    let index = questionClone.findIndex(item => item.id === questionId)
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(answer => {
        if (answer.id === answerId) {
          if (type === 'CHECKBOX') {
            answer.isCorrect = value
          }
          if (type === 'INPUT') {
            answer.description = value
          }
        }
        return answer
      })

      setQuestions(questionClone)

    }
  }

  const handleSubmitQuestion = async () => {
    //postCreateNewAnswerForQuestion postCreateNewQuestionForQuiz
    //submitQuestion
    // await Promise.all(questions.map(async (question) => {
    //   const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile);
    //   await Promise.all(question.answers.map(async (answer) => {
    //     await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id)
    //   }))
    // }))

    //validate
    if (_.isEmpty(selectedQuiz)) {
      toast.error('Please select a quiz')
      return
    }

    // validateAnswer
    let isValid = true
    let indexQ = 0
    let indexA = 0
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValid = false
          indexA = j
          break;
        }
      }
      indexQ = i
      if (isValid === false) {
        break
      }
    }

    if (isValid === false) {
      toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`)
      return
    }

    // validateQuestion

    let isValidQ = true
    let indexQ1 = 0
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false
        indexQ1 = i
        break;
      }
    }

    if (isValidQ === false) {
      toast.error(`Not empty description at Question ${indexQ1 + 1}`)
      return
    }


    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile)
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id)
      }
    }
    toast.success('Successfully created')
    setQuestions(initQuestions)
    //submitAnswer
  }



  return (

    <div className="questions-container">
      <div className="title" style={{ fontSize: 40 }}>
        Manage questions
      </div>
      <hr></hr>
      <div className="add-new-question">
        <div className="col-6 form-group" >
          <label>Select Quiz:</label>
          <Select
            value={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuizzes}
          />
        </div>

        <div className="mt-3">
          Add questions:
        </div>

        {
          questions && questions.length > 0
          && questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="questions-content row">
                  <div className="form-floating col-6 mb-2">
                    <input type="type"
                      className="form-control"
                      placeholder="Description"
                      value={question.description}
                      onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                    />
                  </div>
                  <div className="col-3">
                    <label>Upload Image</label>
                    <input
                      type="file"
                      onChange={(event) => { handleOnChangeFileQuestion('QUESTION', question.id, event) }}
                    />

                  </div>

                  <div className="col-3">
                    <div className="btn-add">
                      <span onClick={() => handleAddRemoveQuestion('ADD', '')}><CiSquarePlus size={45} className="icon-add" /></span>
                      {questions.length > 1 &&
                        <span span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}><CiSquareMinus size={45} className="icon-minus" /></span>
                      }
                    </div>
                  </div>
                </div>

                {
                  question.answers && question.answers.length > 0
                  && question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <input
                          className="form-check-input isCorrect"
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(event) => handleAnswerQuestionChange('CHECKBOX', answer.id, question.id, event.target.checked)}
                        />
                        <div className="form-floating col-6  answer-name">
                          <input type="type" className="form-control" value={answer.description}
                            onChange={(event) => handleAnswerQuestionChange('INPUT', answer.id, question.id, event.target.value)} />


                        </div>
                        <div className="btn-group">
                          <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}><CiCirclePlus size={45} className="icon-add-answer" /></span>
                          {question.answers.length > 1 &&
                            <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}><CiCircleMinus size={45} className="icon-minus-answer" /></span>}
                        </div>
                      </div>
                    )
                  })
                }

              </div>
            )

          })
        }
        {questions && questions.length > 0 &&
          <div className="btn btn-warning" onClick={() => handleSubmitQuestion()}> Save Questions</div>
        }
      </div>

    </div >
  )
}


export default Questions