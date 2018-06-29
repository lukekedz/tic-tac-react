import React from 'react'
import ReactDOM from 'react-dom'

import calculateWinner from './calculateWinner'
import Board from './board'

import './index.css'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lastPlayedArrayIndex: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      sortAsc: true,
      winningSquares: [],
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O'

    this.setState({
      history: history.concat([{
        squares: squares,
        lastPlayedArrayIndex: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  convertArrayIndexToRow(position) {
    switch(position) {
      case 0:
      case 1:
      case 2:
        return 1

      case 3:
      case 4:
      case 5:
        return 2

      case 6:
      case 7:
      case 8:
        return 3
    }
  }

  convertArrayIndexToColumn(position) {
    switch(position) {
      case 0:
      case 3:
      case 6:
        return 1

      case 1:
      case 4:
      case 7:
        return 2

      case 2:
      case 5:
      case 8:
        return 3
    }
  }

  sort() {
    this.setState({sortAsc: !this.state.sortAsc})
  }

  // TODO: basic functionality repeated in ./calculateWinner.js
  highlightWinningSquares(squares) {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        this.state.winningSquares = lines[i]
      }
    }
  }

  render() {
    // const history = this.state.sortAsc ? this.state.history.reverse() : this.state.history
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    // move is index
    const moves = history.map((step, move) => {
      const lastPlayed = (move % 2) === 0 ? 'O' : 'X' // note reversal of typical X/O ? conditional      
      const lastPositionRow = this.convertArrayIndexToRow(step.lastPlayedArrayIndex)
      const lastPositionColumn = this.convertArrayIndexToColumn(step.lastPlayedArrayIndex)

      const asc = move ?
        'Go to move #' + move + ' ( ' + lastPlayed + ' at row: ' + lastPositionRow + ', col: ' + lastPositionColumn + ' ) ' :
        'Go to game start'

      return (
        <li key={move}>
          { move === this.state.stepNumber ? (
            <button onClick={() => this.jumpTo(move)}><strong>{asc}</strong></button>
          ) : (
            <button onClick={() => this.jumpTo(move)}>{asc}</button>
          )}
        </li>
      )
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
      this.highlightWinningSquares(current.squares)
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winningSquares={this.state.winningSquares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <br/>
          <button onClick={() => this.sort()}>Sort {this.state.sortAsc ? 'Descending' : 'Ascending'}</button>
          <ol>{this.state.sortAsc ? moves : moves.reverse()}</ol>
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
