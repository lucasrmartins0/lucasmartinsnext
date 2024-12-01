import React from 'react'

export default function Header() {
    return (
      <header className="header">
        <h1 className="title">Programadores</h1>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Programadores</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Sobre</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
  
