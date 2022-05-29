/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import { Link } from 'react-router-dom'
import { useShop } from '../../context/shopContext'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { Form, Dropdown, Image } from 'react-bootstrap'
import { countries_data, pay_with_data } from '../../context/data'
import './style.scss'

export default function Cart() {

  const { cart, dispatch, currencies } = useShop()

  const removeFromCart = (uid) => {
    dispatch({ type: 'REMOVE', payload: uid })
  }
console.log(cart)
  const [pricing, setPricing] = useState(0)

  const handlePricing = (id, pricing) => {
    setPricing(id)
    dispatch({ type: 'CHANGE_PRICING', payload: { pricing } })
  }



  return (
    <div className='cart'>
      <div className="banner" />
      <NavBar />
      <div className="container">
        <div className="cart_box">
          <div className="box  box-shadow-lg">
            <h5>Shopping Cart</h5>
            {
              cart.length ? <div className="drop-item">
                <span>Pricing in :</span>
                <div className="select">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic"  className='text-truncate'>
                      <div className="select-drop">
                        <div className="country">
                          <img className='flag' src={pay_with_data[pricing].icon} />
                          <span className='name'>
                            {pay_with_data[pricing].name.toUpperCase()}
                            {' '}
                            {pay_with_data[pricing].type ? `(${pay_with_data[pricing].type.toUpperCase()})` : null}
                          </span>
                        </div>
                        <MdKeyboardArrowDown color='#c52372' size={20} />
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {
                        pay_with_data.map(item => (
                          <Dropdown.Item>
                            <div
                              key={item.key}
                              className="select-drop"
                              onClick={() => handlePricing(item.id, item.name)}
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
                : null
            }

            {
              cart.length
                ? <>
                  <div className="row">
                    <div className="col-sm-12 col-lg-11 mx-auto items">
                      {
                        cart.map(cart => (
                          <div key={cart.id} className="item">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="row">
                                  <div className="col-4">
                                    <Image src={cart.img} alt='cart img' className='item-img me-2' />
                                  </div>
                                  <div className='col-8 my-auto'>
                                    <h6>{cart.name}</h6>
                                    <div className="only-in">
                                      <Image
                                        src={countries_data.filter(cd => cd.code === cart.country)[0].flag}
                                        alt={cart.fullCountry}
                                        className='flag'
                                      />
                                      <p className='desc'>Only redeemable in {cart.fullCountry}</p>
                                    </div>
                                    <h6 className='d-flex m-0'>
                                      {Number(cart.pricing.amount / currencies[cart.pricing.in]).toFixed(5)}
                                      {' '}
                                      {cart.pricing.in.toUpperCase()}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6 mt-3 mt-lg-0">
                                <div className="pricing">
                                  <div className="drop-item amount">
                                    <div className='left'>
                                      <span>Amount :</span>
                                      <div className="select">
                                        <Form.Select value={cart.amount} onChange={({ target }) => dispatch({ type: 'ADD_AMOUNT', payload: { uid: cart.uid, amount: target.value } })}>
                                          <option value={1}>1</option>
                                          <option value={2}>2</option>
                                          <option value={3}>3</option>
                                          <option value={4}>4</option>
                                          <option value={5}>5</option>
                                        </Form.Select>
                                        <MdKeyboardArrowDown color='#c52372' size={20} />
                                      </div>

                                      <div onClick={() => removeFromCart(cart.uid)} className="close">
                                        <IoClose size={25} fill='#c52372' />
                                      </div>
                                    </div>
                                    <div className="right">
                                      <span>{Number((cart.pricing.amount * cart.amount) / currencies.pxt).toFixed(5)} $PXT</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className="btns">
                    <Link to='/'>
                      <button className='secondary box-shadow'>Back to Shopping</button>
                    </Link>

                    <Link to='/checkout' >
                      <button className='primary box-shadow'>Proceed to Checkout</button>
                    </Link>
                  </div>
                </>
                : <div style={{ minHeight: '50vh', width: '100%' }}>
                  <p>Your shopping cart is empty</p>
                </div>
            }
          </div>
        </div>
      </div>

    </div >
  )
}
