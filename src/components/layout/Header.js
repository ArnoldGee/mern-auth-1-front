import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <Link to="/">
      <h1>MERN to-do app with user auth</h1>
      </Link>
    </div>
  )
}

export default Header
