import React from 'react'
import chefLogo from '../assets/Chef Claude Icon.png'

function Header() {
  return (
    <header>
      <img src={chefLogo} alt="chef mark logo" />
      <h1>Chef Mark</h1>
    </header>
  )
}

export default Header