import React from 'react'

export const Footer = () => {
  const year = new Date().getUTCFullYear()
  return <footer className="footer text">© {year}</footer>
}
