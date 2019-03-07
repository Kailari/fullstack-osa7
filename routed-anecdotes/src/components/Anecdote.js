import React from 'react'

const Anecdote = (props) => {
  const {anecdote, vote} = props

  const handleVote = event => {
    vote(anecdote.id)
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>
        has {anecdote.votes} votes <button onClick={handleVote}>vote!</button>
      </div>
      <div>
        for more info, see <a href={anecdote.info}>{anecdote.info}</a>
      </div>
    </div>
  )
}

export default Anecdote
