import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Payment from './PaymentFunction'

const PaymentForm = () => {
  const navigate = useNavigate();

  const handleSubscription = () => {
    navigate('/payment');
  }

  return (
    <div className='credentials'>
        <Payment />
    </div>
  );
};

export default PaymentForm;
