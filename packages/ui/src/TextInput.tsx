import React from 'react'

const TextInput = ({label,placeholder,onChange} : {
    label : string,
    placeholder : string,
    onChange : (e : string) => void
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
      <input type="text" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2' placeholder={placeholder} onChange={(e) => {
        onChange(e.target.value)
      }} />
    </div>
  )
}

export default TextInput
