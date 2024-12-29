import _ from 'lodash'
const Question = (props) => {
  const { data } = props;

  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleCheckBox = (event, answerId, questionId) => {
    props.handleCheckBox(answerId, questionId)
  }
  return (
    <>
      {
        data.image ?
          <div className='q-image'>
            <img src={`data:image/jpeg;base64,${data.image}`} />
          </div> :
          <div className='q-image'>
          </div>
      }

      <div className="question">
        Question {props.index + 1}: {data.question} ?
      </div>
      <div className="answer">
        {data.answers && data.answers.length > 0 &&
          data.answers.map((answer, index) => {
            return (
              <div key={`answer - ${index}`}
                className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={answer.isSelected}
                    onChange={(event) => handleCheckBox(event, answer.id, data.questionId)} />
                  <label className="form-check-label">
                    {answer.description}
                  </label>
                </div>
              </div>
            )
          })}

      </div>

    </>
  )
}

export default Question 