// Message.jsx
import React from 'react'

function Message({text, type = 'info'}) {
    
    // Determinar clases según el tipo de mensaje
    let messageClasses = "p-4 rounded-lg border text-center font-medium ";
    
    switch(type) {
        case 'success':
            messageClasses += "bg-green-50 text-green-800 border-green-200";
            break;
        case 'error':
            messageClasses += "bg-red-50 text-red-800 border-red-200";
            break;
        default:
            messageClasses += "bg-blue-50 text-blue-800 border-blue-200";
    }
    
    return (
        <div className={messageClasses}>
            <p>{text}</p>
        </div>
    )
}

export default Message