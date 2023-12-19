import { useState } from 'react';
import Cookies from 'js-cookie';

const TwoAuth = ({ User }: { User: any }) => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeBase64, setQRCodeBase64] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  const handleToggle2FA = async () => {
    if (!is2FAEnabled) {
      try {
        const headers = new Headers();
        // headers.append('authorization', 'Bearer ' + Cookies.get('access_token'));

        const qrCodeResponse = await fetch(`http://localhost:3001/2fa/generate`, {
          method: 'GET',
          credentials: 'include' as RequestCredentials,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const tmp = await qrCodeResponse.json();
        setQRCodeBase64(tmp.qr);
        console.log(qrCodeBase64);
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
      <div>
        <label className='text-white font-bold relative inline-flex items-center cursor-pointer '>
          Enable 2FA:
          <input
            className='ml-[40%] mb-7 sr-only peer'
            type="checkbox"
            checked={User?.is2FAEnabled}
            onChange={handleToggle2FA}
          />
          <div className="group relative ml-16 peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-300 w-20 h-8  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-8 after:w-8 after:top1 after:left1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0">
          </div>
        </label>
      </div>
      {showQRCode && (
        <div>
          <img src={`${qrCodeBase64}`} alt="QR Code" className='ml-[25%] mt-5' />
          <input
            className='mt-6 ml-[20%]'
            type="text"
            placeholder="Enter Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button className="bg-teal-700 text-white font-bold rounded w-[4rem] ml-3" onClick={handleVerification}>
            Verify
          </button>
          <p>{verificationResult}</p>
        </div>
      )}
    </div>
  );
};

export default TwoAuth;

