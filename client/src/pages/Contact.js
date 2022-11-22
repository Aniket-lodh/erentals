import React from 'react'
import Navbar from '../components/Navbar'
import "../scss/contact.scss"

const Contact = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="contactUs">
        <div className="title">
          <h2>Get in touch</h2>
        </div>
        <div className="box">
          {/*form*/}
          <div className="contact form">
            <form>
              <div className="formBox">
                <div className="row50">
                  <div className="inputBox">
                    <span>First name:</span>
                    <input type="text" placeholder="Your first name" />
                  </div>
                  <div className="inputBox">
                    <span>Last name:</span>
                    <input type="text" placeholder="Your Last name" />
                  </div>
                </div>
                <div className="row50">
                  <div className="inputBox">
                    <span>Mobile no:</span>
                    <input type="number" placeholder="xxxxxxxxxx" />
                  </div>
                  <div className="inputBox">
                    <span>Email:</span>
                    <input type="email" placeholder="email@gmail.com" />
                  </div>
                </div>
                <div className="row100">
                  <div className="inputBox">
                    <span>Message:</span>
                    <textarea placeholder="feedback" defaultValue={""} />
                  </div>
                </div>
                <div className="row100">
                  <div className="inputBox">
                    <input type="submit" defaultValue="send" />
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/*info box*/}
          <div className="contact info">
            <h3>Contact --info</h3>
            <div className="infoBox">
              <span>
                <ion-icon name="locate" />
              </span>
              <p>
                Agartala,Santipara
                <br />
                Tripura
              </p>
            </div>
            <div>
              <span>
                <ion-icon name="mail" />
              </span>
              <a href="Mailto:nabanitroy514@gmail.com">nabanitroy514@gmail.com</a>
            </div>
            <div>
              <span>
                <ion-icon name="phone-portrait" />
              </span>
              <a href="Mobile no:7005696612">7005696612</a>
            </div>
            {/*social media links*/}
            <ul className="sci">
              <li>
                <a href="#" />
                <ion-icon name="logo-facebook" />
              </li>
              <li>
                <a href="#" />
                <ion-icon name="logo-instagram" />
              </li>
            </ul>
          </div>
          {/*-map-*/}
          <div className="contact map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29195.979316763132!2d91.2756560843628!3d23.83646450202732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1668536225990!5m2!1sen!2sin"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
