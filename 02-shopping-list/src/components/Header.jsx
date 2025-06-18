import React from 'react'
import bannerProduct from '../assets/banner.jpg'
import '../style/shoppingList.css'

function Header() {
  return (
    <header>
        <picture>
            <img className="banner" src={bannerProduct} alt="banner products"/>
        </picture>
    </header>
  )
}

export default Header