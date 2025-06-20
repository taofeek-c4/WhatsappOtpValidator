import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://whatsapp-otp-validator-backend.onrender.com';

function PhoneInputPage() {
  const [countryCode, setCountryCode] = useState('+234');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!phone) {
      setMessage('Please enter a phone number');
      return;
    }

    const fullPhone = `${countryCode}${phone}`;
    localStorage.setItem('userPhone', fullPhone);

    setMessage('Sending OTP...');
    try {
      const res = await fetch(`${BASE_URL}/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone }),
      });

      const data = await res.json();
      console.log('Backend Response:', data);

      if (res.ok && data.success) {
        setMessage('✅ OTP sent to WhatsApp!');
        setTimeout(() => navigate('/otp'), 1200);
      } else {
        setMessage(data.error || '❌ Failed to send OTP');
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      setMessage('❌ Network error while sending OTP');
    }
  };

  return (
    <div className="centered-container">
      <h3 className="mb-4 text-center text-primary">WhatsApp OTP Login</h3>

      <label className="form-label">Country</label>
      <select className="form-select mb-3" value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
        <option value="+234">🇳🇬 Nigeria (+234)</option>
        <option value="+1">🇺🇸 USA (+1)</option>
        <option value="+44">🇬🇧 UK (+44)</option>
      </select>

      <label className="form-label">Phone Number</label>
      <input
        className="form-control mb-3"
        placeholder="80XXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={sendOtp}>
        Send OTP
      </button>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default PhoneInputPage;
