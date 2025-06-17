import React, { useState } from 'react';

function App() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');
  const [secureData, setSecureData] = useState('');
  const [message, setMessage] = useState('');

  const sendOtp = async () => {
    setMessage('');
    try {
      const res = await fetch('http://localhost:3000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage('✅ OTP sent to WhatsApp');
      } else {
        setMessage(data.error || '❌ Failed to send OTP');
      }
    } catch (err) {
      setMessage('❌ Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    setMessage('');
    try {
      const res = await fetch('http://localhost:3000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (data.valid && data.token) {
        setToken(data.token);
        setMessage('✅ OTP verified. Token stored.');
      } else {
        setMessage(data.message || '❌ Invalid OTP');
      }
    } catch (err) {
      setMessage('❌ Error verifying OTP');
    }
  };

  const getSecureData = async () => {
    setSecureData('');
    try {
      const res = await fetch('http://localhost:3000/secure-data', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setSecureData(data.message);
      } else {
        setSecureData(data.message || '❌ Unauthorized');
      }
    } catch (err) {
      setSecureData('❌ Failed to fetch secure data');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">📱 WhatsApp OTP Login</h3>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Phone (e.g. +23480...)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button className="btn btn-primary w-100 mb-3" onClick={sendOtp}>
          Send OTP
        </button>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className="btn btn-success w-100 mb-3" onClick={verifyOtp}>
          Verify OTP
        </button>

        <button className="btn btn-info w-100 mb-3" onClick={getSecureData}>
          Get Secure Data
        </button>

        {message && <div className="alert alert-secondary mt-2">{message}</div>}
        {secureData && <div className="alert alert-success mt-2">{secureData}</div>}
      </div>
    </div>
  );
}

export default App;
