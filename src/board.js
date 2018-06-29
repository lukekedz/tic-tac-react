import React from 'react'

import Square from './square'

export class Board extends React.Component {
  renderSquare(id) {
    return (
      <Square
        key={id}
        value={this.props.squares[id]} 
        onClick={() => this.props.onClick(id)}
      />
    )
  }

  renderBoard() {
    let board = []
    let row = []
    let squareId = 0

    for ( let i = 0; i < 3; i++ ) {
      let squares = []
      for ( let j = 0; j < 3; j++ ) {
        squares.push(this.renderSquare(squareId))
        squareId++
      }

      board.push(<div key={i} className="board-row">{squares}</div>)
    }

    return board
  }

  render() {
    return (
      <div>
        {this.renderBoard()}
      </div>
    )
  }
}
export default Board