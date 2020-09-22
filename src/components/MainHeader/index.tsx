import React from 'react'
import './styles.css'

export default function MainHeader(){
    return(
        <div className="header-container">
            <div className="logo-container"><p>EDDIE</p></div>
            <div className="options-container">
                <div><p>Blog</p></div>
                <div><p>Sobre</p></div>
            </div>
        </div>
    )
}