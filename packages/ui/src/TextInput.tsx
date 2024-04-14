import React from 'react'

const TextInput = ({label,placeholder,onChange} : {
    label : string,
    placeholder : string,
    onChange : (e : string) => void
}) => {
  return (
    <div>
      <label>{label}</label>
      <input type="text" onChange={(e) => {
        onChange(e.target.value)
      }} />
    </div>
  )
}

export default TextInput
