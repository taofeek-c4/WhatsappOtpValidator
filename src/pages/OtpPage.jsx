import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OtpPage() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const verifyOtp = async () => {
    setMessage('');
    const phone = localStorage.getItem('userPhone');

    try {
      const res = await fetch('http://localhost:3000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      });
      const data = await res.json();
      if (data.valid) {
        localStorage.setItem('jwtToken', data.token);
        navigate('/success');
      } else {
        setMessage(data.message || 'Invalid OTP');
      }
    } catch {
      setMessage('Error verifying OTP');
    }
  };

  return (
    <div className="centered-container">
      <h3 className="mb-4 text-center text-success">Enter OTP</h3>

      <input
        className="form-control mb-3"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button className="btn btn-success w-100" onClick={verifyOtp}>
        Verify OTP
      </button>

      {message && <div className="alert alert-warning mt-3">{message}</div>}
    </div>
  );
}

export default OtpPage;
