// InputNumber.jsx
import React from 'react'

function InputNumber({ value, onChange, disabled }) {
    return (
        <input
            type="number"
            value={value}
            onChange={onChange}
            placeholder="Ingresa un número"
            min="1"
            max="100"
            disabled={disabled}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
    )
}

export default InputNumber