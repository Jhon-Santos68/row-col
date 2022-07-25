import React from 'react'

const Th = ({dynamic, inputType = 'text', readOnly = false, value = ''}) => {
  return (
    <th colSpan={colSpan}>
        {dynamic ? <input type={inputType} readOnly={readOnly} /> : value}
    </th>
  )
}

export default Th