import { useState } from 'react'

const Button = ({ click, text }) => (
  <button onClick={click}>{text}</button>
)

const mostVotes = (anecdotes, votes) => {
  const highest = Math.max(...votes)
  const index = votes.indexOf(highest)
  return { anecdote: anecdotes[index], votes: highest };
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleClick = () => {
    const index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index)
  };

  const handleVote = () => {
    const newVotes = [...votes]; 
    newVotes[selected] += 1; 
    setVotes(newVotes);
  };

  const mostVoted = mostVotes(anecdotes, votes);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      Votes: {votes[selected]}
      <Button click={handleVote} text="vote" />
      <Button click={handleClick} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{mostVoted.anecdote} has {mostVoted.votes} votes</p>
    </div>
  )
}

export default App