function SuccessPage() {
  const phone = localStorage.getItem('userPhone');

  return (
    <div className="centered-container text-center">
      <h3 className="text-success mb-3">✅ OTP Verified</h3>
      <p>Welcome, <strong>{phone}</strong></p>
      <p className="text-muted">You can now access secured resources.</p>
    </div>
  );
}

export default SuccessPage;
