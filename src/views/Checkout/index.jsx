import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import { useShop } from '../../context/shopContext'
import { useApi } from '../../context/apiContext'
import { useWallet } from '../../context/walletContext'
import { Dropdown, Image } from 'react-bootstrap'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import uniqid from 'uniqid'
import { useEffect } from 'react'
import { countries_data, pay_with_data } from '../../context/data'
import { insertOrder } from '../../api/insert'
import _ from 'lodash'
import './style.scss'


export default function Checkout() {

  const { cart, currencies, dispatch, jwt_token } = useShop()
  //const { jwt_token } = useApi()
  const { account, contractNodeManager } = useWallet()

  const [payWith, setPayWith] = useState(0)

  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({ email: '', discord: '', wallet: '' })
  const cardsId = [];
  useEffect(() => {
    setUserInfo({ ...userInfo, wallet: account })
    console.log({contractNodeManager})
  }, [account])

  const handleInputChange = ({ target: { name, value } }) => {
    setUserInfo({ ...userInfo, [name]: value })
  }

  const payOrder = async () => {
    const { email, discord, wallet } = userInfo

    if (!email) return alert('Email is requried')
    if (!discord) return alert('Discord ID is requried')
    if (!wallet) return alert('Wallet Address is requried')


    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0')
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const yyyy = date.getFullYear()
    const hh = date.getHours()
    const mins = date.getMinutes()
    const mils = date.getMilliseconds()

    const uid = String(yyyy + mm + dd + hh + mins + mils + uniqid()).toUpperCase()
    const order = { uid, status: 'success', userInfo }

    cart.map(item => {
      cardsId.push(item.id)
    })
    console.log(cardsId)
    insertOrder(jwt_token, {order_id: order.uid, cardsId, amount_usd: Number(netPrice).toFixed(2), currency: pay_with_data[payWith].address, amount_token: totalWithTax(), status: order.status, email: email, discord_id: discord})
    
    // todo move this function to walletContext
    await contractNodeManager.buyGiftCard(pay_with_data[payWith].address, order.uid, totalWithTax()).send({from:account}).then(() => {
      navigate('/confirmation', { state: { ...order } })
      dispatch({ type: 'CLEAR' })
    })
  }


  const netPrice = _.sum(cart.map(item => item.convertedUsd * item.amount))

  const totalWithTax = () => {
    const taxAmount = (netPrice * (pay_with_data[payWith].tax / 100))
    const totalPrice = (netPrice + taxAmount) / currencies[pay_with_data[payWith].name]
    return totalPrice.toFixed(5)
  }


  return (
    <div className='checkout'>
      <div className="banner " />
      <NavBar />
      <div className="container">
        <div className="checkout_box">
          <div className="box box-shadow-lg">
            <h5 className='title'>Checkout</h5>

            <div className="row">
              <div className="col-lg-6">
                <div className="total pe-lg-5">
                  <h6 className="total_title">Total Order</h6>


                  <div className="items">
                    {
                      cart.length ? cart.map(item => (
                        <div className='item'>
                          <div className="row">
                            <div className="col-5 col-md-4 pe-2">
                              <Image src={item.img} className='img' />
                            </div>
                            <div className="col-7 col-md-8 my-auto">
                              <Image
                                src={countries_data.filter(c => c.code === item.country)[0].flag}
                                alt='gift card country'
                                className='top-flag'
                              />
                              <b>{item.name}</b>
                              <div className="only-in">
                                <Image
                                  src={countries_data.filter(cd => cd.code === item.country)[0].flag}
                                  alt={item.fullCountry}
                                  className='flag'
                                />
                                <p className='desc'>Only redeemable in {item.fullCountry}</p>
                              </div>                              <div className="px-2 d-flex align-items-center justify-content-between">
                                <b className='price'>
                                  {item.pricing.amount} {item.currency}
                                </b>
                                <b className='price'>
                                  {Number(item.pricing.amount / currencies[item.pricing.in]).toFixed(5)}
                                  {' '}
                                  {item.pricing.in.toUpperCase()}
                                </b>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                        : null
                    }
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mt-5 mt-lg-0">

                <div className="pay ps-lg-3">

                  <div className="pay-box row">
                    <div className="col-md-4 mb-2 mb-md-0">
                      <span>My Email ID</span>
                    </div>
                    <div className="col-md-8">
                      <div className="pay-box-inner">
                        <input
                          type="text"
                          name='email'
                          onChange={handleInputChange}
                        />
                        <button className='primary'>Edit</button>
                      </div>
                    </div>
                  </div>

                  <div className="pay-box row">
                    <div className="col-md-4 mb-2 mb-md-0">
                      <span>My Discord ID</span>
                    </div>
                    <div className="col-md-8">
                      <div className="pay-box-inner">
                        <input
                          type="text"
                          name='discord'
                          onChange={handleInputChange}
                        />
                        <button className='primary'>Edit</button>
                      </div>
                    </div>
                  </div>

                  <div className="pay-box row">
                    <div className="col-md-4 mb-2 mb-md-0">
                      <span>My Wallet Address</span>
                    </div>
                    <div className="col-md-8">
                      <div className="pay-box-inner">
                        <input
                          type="text"
                          name='wallet'
                          value={userInfo.wallet}
                          onChange={handleInputChange}
                        />
                        <button className='primary'>Edit</button>
                      </div>
                    </div>
                  </div>

                  <div className="pay-box row">
                    <div className="col-md-4 mb-2 mb-md-0">
                      <span>Unclaimed $PXT</span>
                    </div>
                    <div className="col-md-8 total-to-pay">
                      <div className="pay-box-inner">
                        <div>100 $PXT</div>
                      </div>
                    </div>
                  </div>

                  <div className="pay-box row">
                    <div className="col-md-4 mb-2 mb-md-0">
                      <span>TOTAL TO PAY</span>
                    </div>
                    <div className="col-md-8 total-to-pay">
                      <div className="pay-box-inner">
                        <div>{Number(netPrice).toFixed(2)} USD</div>
                      </div>
                    </div>
                  </div>

                  <div className="pay-box row">
                    <div className="col-md-4 mb-2 mb-md-0">
                      <span>Pay With</span>
                    </div>
                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-6">
                          <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className='text-truncate'>
                              <div className="select-drop">
                                <div className="country">
                                  <Image className='flag' src={pay_with_data[payWith].icon} />
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
                                  <Dropdown.Item>
                                    <div
                                      key={item.key}
                                      className="select-drop text-truncate"
                                      onClick={() => setPayWith(item.id)}
                                    >
                                      <div className="country">
                                        <Image className='flag' src={item.icon} />
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
                        <div className="col-6">
                          <div className="pay-box-inner">
                            <div className='mx-auto tax'>{pay_with_data[payWith].tax}% TAX</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pay-box row">
                    <div className="col-md-4 mb-2 mb-md-0">
                      <span>You Pay</span>
                    </div>
                    <div className="col-md-8 total-to-pay">
                      <div className="pay-box-inner">
                        <div>
                          {totalWithTax()}
                          {' '}
                          {pay_with_data[payWith].name.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pay-box row">
                    <div className="col-md-4 mb-2 mb-md-0">
                      <span>Send To</span>
                    </div>
                    <div className="col-md-8">
                      <div className="pay-box-inner">
                        <span>Gift Card Shop Wallet</span>
                        <button className='primary'>Copy</button>
                      </div>
                    </div>
                  </div>



                  <button
                    onClick={payOrder}
                    className={`primary pay-order ${!cart.length && 'btn-disabled'}`}
                    disabled={!cart.length}
                  >
                    Pay Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
