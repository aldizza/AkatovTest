import React from 'react'
import './Button.css'

interface IButtonProps {
  onClick?: () => void
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<IButtonProps> = ({ onClick, children, type = 'button' }) => {
  return (
    <button className="custom-button" onClick={onClick} type={type}>
      {children}
    </button>
  )
}

export default Button
