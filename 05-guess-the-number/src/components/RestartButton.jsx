import React from 'react'

function RestartButton({onClick}) {
  return (
    <button 
      onClick={onClick}
      className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
    >
      Jugar de nuevo
    </button>
  )
}

export default RestartButton