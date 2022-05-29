/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import { Image, Nav, Form, Dropdown } from 'react-bootstrap'
import { FaFacebookF } from 'react-icons/fa'
import { BsDiscord, BsTwitter } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'
import { useShop } from '../../context/shopContext'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import { pay_with_data, countries_data } from '../../context/data'
import './style.scss'
import { useEffect } from 'react'
import _ from 'lodash'


export default function Card() {

  const navigate = useNavigate()

  const { dispatch, currencies, convertToUsd } = useShop()

  const { state } = useLocation()

  const [error, setError] = useState(null)

  const handleAddToCart = () => {
    dispatch({ type: 'ADD', payload: state })
    navigate('/cart')
  }

  const getConvertedUsd = async () => {
    let usd = await convertToUsd(state.currency.toLowerCase(), state.pricing.amount)
    usd = Number(usd).toFixed(2)
    state.convertedUsd = usd
    setConvertedUsd(usd)
  }

  useEffect(() => {
    getConvertedUsd()
  }, [])

  const handlePricing = ({ target: { name, value } }, min_max) => {
    if (state.pricing?.min) {
      const { min, max } = min_max
      if (value < min) setError(`The value should be more than ${min}`)
      else setError(null)
      if (value > max) setError(`The value should be less than ${max}`)
    }

    state.pricing[name] = value
    setPricingAmount(value)
    getConvertedUsd()
  }

  const handlePricingIn = (id, value) => {
    setPayWith(id)
    state.pricing.in = value
  }

  const [payWith, setPayWith] = useState(0)

  const SHARE_URL = window.location.href

  const [convertedUsd, setConvertedUsd] = useState(0)
  const [pricingAmount, setPricingAmount] = useState(state.pricing.amount)


  return (
    <div className='gift-card'>
      <div className="banner " />
      <NavBar />
      <div className="container">
        <div className="gift-card-box">
          <div className="box box-shadow-lg">

            <IoReturnUpBackOutline
              onClick={() => navigate(-1)}
              size={30}
              className='return'
            />

            <div className="row align-items-start">
              <div className="card-col col-lg-5 d-flex">
                <Image src={state.img} alt='gift card 1' />
              </div>
              <div className="desc-col col-lg-6 pt-4 pt-lg-0 ps-lg-4">
                <div className="top">
                  <h5>Description</h5>
                  <Image
                    src={countries_data.filter(c => c.code === state.country)[0].flag}
                    alt='gift card country'
                  />
                </div>
                <p>{state.desc}</p>
                {
                  state.terms ? Object.keys(state.terms).map(key => (
                    <>
                      <h5>{key}</h5>
                      <p>{state.terms[key]}</p>
                    </>
                  )) : null
                }

                <div className="pricing row">
                  <div className="col-lg-6 col-xl-4">
                    <div className="price-you-pay">
                      <span> Amount in {state.currency} :</span>
                      {
                        state.pricing?.values
                          ?
                          <div className="select">
                            <Form.Select
                              name='amount'
                              onChange={handlePricing}
                              value={pricingAmount}
                            >
                              {
                                state.pricing?.values.map(value => <option value={value}>{value}</option>)
                              }
                            </Form.Select>
                            <MdKeyboardArrowDown color='#c52372' size={20} />
                          </div>
                          :
                          <Form.Control
                            type='number'
                            name='amount'
                            min={state.pricing?.min}
                            max={state.pricing?.max}
                            step={5}
                            onChange={(e) => handlePricing(e, state.pricing)}
                            value={state.pricing.amount}
                          />
                      }
                    </div>


                  </div>
                  <div className="col-lg-6 col-xl-4 mt-4 mt-lg-0">
                    <span>Pricing in :</span>
                    <div className="select">
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className='text-truncate'>
                          <div className="select-drop">
                            <div className="country">
                              <img className='flag' src={pay_with_data.filter(i => i.name === state.pricing.in)[0].icon} />
                              <span className='name'>
                                {pay_with_data[payWith].name.toUpperCase()}
                                {' '}
                                {pay_with_data[payWith].type ? `(${pay_with_data[payWith].type.toUpperCase()})` : null}
                              </span>
                            </div>
                            <MdKeyboardArrowDown color='#c52372' size={20} />
                          </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {
                            pay_with_data.map(item => (
                              <Dropdown.Item className={item.id === state.pricing.in && 'active'} >
                                <div
                                  key={item.id}
                                  className="select-drop"
                                  onClick={() => handlePricingIn(item.id, item.name)}
                                >
                                  <div className="country">
                                    <img className='flag' src={item.icon} />
                                    <span className='name'>
                                      {item.name.toUpperCase()}
                                      {' '}
                                      {item.type ? `(${item.type.toUpperCase()})` : null}
                                    </span>
                                  </div>
                                </div>
                              </Dropdown.Item>
                            ))
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="col-xl-4 price-you-pay mt-4 mt-xl-0">
                    <span>Price in {state.pricing.in.toUpperCase()} :</span>
                    <Form.Control value={Number(state.pricing.amount / currencies[state.pricing.in]).toFixed(5)} />
                  </div>

                  {
                    error && <span className='error'>{error} {state.currency}</span>
                  }

                  <div className="row align-items-center mt-4">

                    <div className="col-sm-6 price-you-pay">
                      <span>Converted Price in USD :</span>
                      <Form.Control
                        value={convertedUsd}
                      />
                    </div>


                    {
                      state.pricing?.min ?
                        <div className="col-sm-6">
                          <div className="min-max">
                            <div className='min'>
                              <span>Min</span> : {state.pricing?.min} {state.currency}
                            </div>
                            <div>
                              <span>Max</span> : {state.pricing?.max} {state.currency}
                            </div>
                          </div>
                        </div>
                        : null
                    }



                  </div>


                </div>
                <div className="bottom">
                  <button
                    onClick={handleAddToCart}
                    className={`primary ${error && 'btn-disabled'}`}
                    disabled={error}
                  >
                    Add to Cart
                  </button>
                  <div className="share">
                    <span>Share: </span>
                    <Nav className="links share-links">
                      <Nav.Link>
                        <FacebookShareButton
                          url={SHARE_URL}
                          quote='Welcome to Gift Cards X'
                        >
                          <FaFacebookF size={11} />
                        </FacebookShareButton>
                      </Nav.Link>
                      <Nav.Link
                        href='https://discord.gg/projectxfinance'
                        target='_blank'
                      >
                        <BsDiscord size={12} />
                      </Nav.Link>
                      <Nav.Link>
                        <TwitterShareButton
                          url={SHARE_URL}
                          quote='Welcome to Gift Cards X'
                        >
                          <BsTwitter size={12} />
                        </TwitterShareButton>
                      </Nav.Link>
                    </Nav>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}