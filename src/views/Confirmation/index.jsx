/* eslint-disable no-unused-vars */
import React from 'react'
import NavBar from '../../components/NavBar'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import './style.scss'

export default function Card() {

  const { state } = useLocation()

  const badgeInfo = state.status === 'success' ? { bg: 'success', message: 'SUCCESSFULL' }
    : state.status === 'progress' ? { bg: 'warning', message: 'IN PROGRESS' }
      : { bg: 'danger', message: 'FAILED' }


  return (
    <div className='confirmation'>
      <div className="banner " />
      <NavBar />
      <div className="container">
        <div className="confirmation-box">
          <div className="box box-shadow-lg">
            <h5 className='title'>Confirmation</h5>

            <div className="order">
              <div className='order-item'>
                <span className='label'>Order ID :</span>
                <span className='uid'>{state.uid}</span>
              </div>
              <div className='order-item'>
                <span className='label'>Transaction Status :</span>
                <Badge bg={badgeInfo.bg}>{badgeInfo.message}</Badge>
              </div>

              {
                state.status === 'success'
                && <div className='order-item'>
                  <p>Gift card will be sent to {state.userInfo.email} in next 24 hours</p>
                </div>
              }

            </div>

            <div className="btns">
              <Link to='/'>
                <button className='primary box-shadow'>Back to Shop</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}


