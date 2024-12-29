import { useState, useEffect } from "react"
const Countdown = (props) => {
  const [count, setCount] = useState(1000)
  const formatTime = (seconds) =>
    new Date(seconds * 1000).toLocaleTimeString('en-GB', {
      timeZone: 'Etc/UTC',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  useEffect(() => {
    if (count === 0) {
      props.onTimeUp()
      return
    }
    const timer = setInterval(() => {
      setCount(count - 1)
    }, 1000)

    // setTimeout(() => {

    // }, )
    return () => {
      clearInterval(timer)
    }
  }, [count])

  return (
    <div className="countdown-container">
      <div key={count}>{formatTime(count)} </div>

    </div>
  )
}
export default Countdown