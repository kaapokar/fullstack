import { useState } from 'react'

const Button = ({ click, text }) => (
  <button onClick={click}>{text}</button>
)

const StatisticLine = ({text, value}) => (
  <div>{text} {value} </div>
)

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const avg = ((props.good - props.bad) / all).toFixed(1)
  const pos = (100*(props.good/all)).toFixed(1)+ " %"

  if (all === 0) {
    return <p>No feedback given yet.</p>;
  }

  return ( 
    <table>
        <tbody>
            <tr>
                <td>good</td>
                <td>{props.good}</td>
            </tr>
            <tr>
                <td>neutral</td>
                <td>{props.neutral}</td>
            </tr>
            <tr>
                <td>bad</td>
                <td>{props.bad}</td>
            </tr>
            <tr>
                <td>all</td>
                <td>{all}</td>
            </tr>
            <tr>
                <td>average</td>
                <td>{avg}</td>
            </tr>
            <tr>
                <td>positive</td>
                <td>{pos}</td>
            </tr>
        </tbody>
    </table>

  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => setGood(good + 1)
  const neutralClick = () => setNeutral(neutral + 1)
  const badClick = () => setBad(bad + 1)

  return (
    <>
      <h1>Give feedback</h1>
      <Button click={goodClick} text="good" />
      <Button click={neutralClick} text="neutral" />
      <Button click={badClick} text="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App