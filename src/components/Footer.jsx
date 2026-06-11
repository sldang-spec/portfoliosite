import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">

        <div className="footer__left">
          <Link to="/" className="footer__back">← Back Home</Link>
          <img src="/img/plant gif.gif" alt="" className="footer__plant" />
        </div>

        <div className="footer__content">
          <p className="footer__label">Thank you for visiting!</p>
          <h2 className="footer__heading">Get In Touch</h2>
          <div className="footer__links">
            <a href="mailto:sldang@usc.edu">email</a>
            <a href="https://www.linkedin.com/in/stevenldang/" target="_blank" rel="noreferrer">linkedin</a>
            <a href="https://drive.google.com/file/d/1pqWxyvMxa9T48Sjra-6FT72VqIwwFnAl/view" target="_blank" rel="noreferrer">resume</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
