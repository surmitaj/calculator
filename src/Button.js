import React from 'react'

function Button({id, name, onClick, btnName}) {
  return (
    <button id={id && id}name={name} onClick={onClick}>{btnName}</button>
  )
}

export default Button