import React from 'react'
import { useLocation } from 'react-router-dom'
// import '../styles/PaymentSuccess.css'

const PaymentSuccess = () => {
    const query = new URLSearchParams(useLocation().search)
    const reference = query.get("reference");


  return (

<div className="min-h-screen flex items-center justify-center bg-green-50">
  <div className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-md text-center border border-green-200">

    <h1 className="text-2xl font-bold text-green-600 mb-3">
      Payment Successful!
    </h1>

    <p className="text-gray-600 mb-4">
      Thank you for your payment. Your transaction was successful!
    </p>

    {reference && (
      <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
        <p className="text-sm">
          <span className="font-semibold">Reference ID:</span> {reference}
        </p>
      </div>
    )}

  </div>
</div>

  )
}

export default PaymentSuccess
