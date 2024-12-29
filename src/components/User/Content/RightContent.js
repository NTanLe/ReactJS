import Countdown from "./Countdown"
import "./RightContent.scss"
const RightContent = (props) => {
  const { dataQuiz } = props

  const onTimeUp = () => {
    props.handleFinish()
  }

  const getClassQuestion = (index, question) => {

    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find(answers => answers.isSelected == true);
      if (isAnswered) {
        return "question selected";
      }
    }


    return "question"
  }

  const handleClickQuestion = (index) => {
    props.setIndex(index)
  }
  return (
    < >
      <div className="main-timer">
        <Countdown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz && dataQuiz.length > 0 &&

          dataQuiz.map((item, index) => {
            return (
              <div className={getClassQuestion(index, item)} onClick={() => handleClickQuestion(index)}>{index + 1} </div>
            )
          })

        }


      </div>
    </>
  )
}
export default RightContent 