import React, { useRef, useState } from 'react'
import graphic from '../../assets/imgs/graphic.png'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useShop } from '../../context/shopContext'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Dropdown } from 'react-bootstrap'
import {countries_data} from '../../context/data'
import './style.scss'


export default function Home() {
  const navigate = useNavigate()

  const { cards } = useShop()

  const shopRef = useRef(null)

  const [country, setCountry] = useState({ id: 0, code: 'USA' })

  const scrollToShop = () => shopRef.current.scrollIntoView()


  const goToCard = (card) => {
    navigate('/card', { state: { ...card } })
  }

  const [currentCards, setCurrentCards] = useState(cards.filter(card => card.country === 'USA'))

  const handleCountry = ({ id, code }) => {
    setCountry({ id, code })
    const newCards = [...cards].filter(card => card.country === code)
    console.log(newCards)
    setCurrentCards(newCards)
  }



  return (
    <>
      <div className='home'>
        <div className="banner">
          <NavBar scrollToShop={scrollToShop} />
          <div className="main container">
            <div className="row">
              <div className="welcome col-lg-7 col-xl-6">
                <h1 className='display-2'>Welcome to <br /> gift cards</h1>
                <button onClick={scrollToShop}>Shop now</button>
              </div>
              <div className="graphic col-lg-5 col-xl-6">
                <img src={graphic} alt="graphic" />
              </div>
            </div>
          </div>
        </div>
        <div ref={shopRef} className="container shop">
          <div className="shop_gifts">
            <h1>Shop</h1>

            <p> Ready to use online or in-store. Buy gift cards with PXT, AVAX or USDT. Designed specifcally for ProjectX community, this website can be used to buy giftcards for 5 most popular nation that belongs to PXT holders. The website will keep on updating with new giftcard brands as well as some limited edition giftcards! </p>
            <b>Steps to buy:</b>
            <ol>
              <li>Choose your nation and payment cryptocurrency.</li>
              <li>Add your giftcard to your cart.</li>
              <li>Transfer the amount of cryptocurrency displayed on checkout page to our giftcard wallet.</li>
              <li>You will receive giftcard on your email id within 24 hours. Have fun shopping with it!</li>
            </ol>
          </div>

          <div className="row offer-in">
            <div className="col-sm-8 col-lg-5 row in">
              <div className="col-sm-5 mb-2 mb-sm-0">
                <span>Producst we offer in:</span>
              </div>
              <div className="col-sm-7">

                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic">
                    <div className="select-drop">
                      <div className="country">
                        <img className='flag' src={countries_data[country.id].flag} />
                        <span className='pipe' />
                        <span className='name' >{countries_data[country.id].name}</span>
                      </div>
                      <MdKeyboardArrowDown color='#c52372' size={20} />
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {
                      countries_data.map(item => (
                        <Dropdown.Item onClick={() => handleCountry(item)} >
                          <div className="select-drop">
                            <div className="country">
                              <img className='flag' src={item.flag} />
                              <span className='pipe' />
                              <span className='name' >{item.name}</span>
                            </div>
                          </div>
                        </Dropdown.Item>
                      ))
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>

          <span />
          <div className="cards row">
            {
              currentCards.length
                ? currentCards.map(card => (
                  <span onClick={() => goToCard(card)} key={card.key} className='col-6 col-sm-6 col-md-4 col-lg-3 p-md-5'>
                    <img src={card.img} />
                  </span>
                ))
                : <p>No gift cards available in {countries_data[country.id].name}</p>
            }
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}


