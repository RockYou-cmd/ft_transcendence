import { useState } from 'react';
import Cookies from 'js-cookie';

const TwoAuth = ({User} : {User : any}) => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeBase64, setQRCodeBase64] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  const handleToggle2FA = async () => {
    if (!is2FAEnabled) {
      try {
        const headers = new Headers();
        headers.append('authorization', 'Bearer ' + Cookies.get('access_token')); 

        const qrCodeResponse = await fetch(`http://localhost:3001/2fa/generate`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + Cookies.get('access_token'),
        }}) 
        const tmp = await qrCodeResponse.json();
        setQRCodeBase64(tmp.qr);
        setShowQRCode(true);
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    } else {
      setShowQRCode(false);
      setVerificationResult('');
    }
    setIs2FAEnabled(!is2FAEnabled);
  };

  const handleVerification = async () => {
    try {
      const verifyResponse = await fetch(`http://localhost:3001/2fa/enable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // userId,
          code: verificationCode,
        }),
      }); 

      const { message } = await verifyResponse.json();
      setVerificationResult(message);
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  return (
    <div>
      <h2>Profile Settings</h2>
      <div>
        <label>
          Enable 2FA:
          <input
            type="checkbox"
            checked={User?.is2FAEnabled}
            onChange={handleToggle2FA}
          />
        </label>
      </div>
      {showQRCode && (
        <div>
          <img src={`${qrCodeBase64}`} alt="QR Code" />
          <input
            type="text"
            placeholder="Enter Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button onClick={handleVerification}>Verify</button>
          <p>{verificationResult}</p>
        </div>
      )}
    </div>
  );
};

export default TwoAuth;
