import React from 'react'

export default function Square(props) {
  return (
    <button id={props.id} className={props.winningSquares.includes(props.id) ? 'winningSquare' : 'square' } onClick={props.onClick}>
      {props.value}
    </button>
  )
}