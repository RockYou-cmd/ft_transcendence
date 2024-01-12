import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { MouseEvent } from 'react';

const TwoAuth = ({ User, change }: { User: any, change: any }) => {
	const [is2FAEnabled, setIs2FAEnabled] = useState(User?.is2FAEnabled);
	const [showQRCode, setShowQRCode] = useState(false);
	const [qrCodeBase64, setQRCodeBase64] = useState('');
	const [verificationCode, setVerificationCode] = useState('');

	useEffect(() => {
		setIs2FAEnabled(User?.is2faEnabled);
	}, [User])

	const handleToggle2FA = async () => {
		change.current = true;
		if (!is2FAEnabled) {
			try {
				const qrCodeResponse = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/2fa/generate`, {
					method: 'GET',
					credentials: 'include' as RequestCredentials,
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const tmp = await qrCodeResponse.json();
				setQRCodeBase64(tmp.qr);
				setShowQRCode(true);
			} catch (error) {
			}
		}
		else {
			setShowQRCode(false);
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/2fa/disable`, {
					method: 'POST',
					credentials: 'include' as RequestCredentials,
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
					}),

				});
				if (response?.ok) {
					swal("Success!", "2FA disabled!", "success");
				}
				else {
					swal("Error!", "2FA not disabled!", "error");
				}
			} catch (error) {
			}
		}
		setIs2FAEnabled(!is2FAEnabled);
	};

	const handleVerification = async (e: MouseEvent) => {
		e.preventDefault();
		try {
			const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_LOCALHOST}/2fa/enable`, {
				method: 'POST',
				credentials: 'include' as RequestCredentials,

				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					token: verificationCode,
				}),
			});
			if (verifyResponse?.ok) {
				swal("Success!", "2FA enabled!", "success");
				setIs2FAEnabled(true);
				setShowQRCode(false);
			}
			else {
				swal("Error!", "2FA not enabled!\nWrong verfication number", "error");
				setVerificationCode("");
			}
		} catch (error) {
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
						checked={is2FAEnabled ? true : false}
						value={is2FAEnabled ? "true" : "false"}
						onChange={handleToggle2FA}
					/>
					<div className="group relative ml-16 peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-300 w-20 h-8  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-8 after:w-8 after:top1 after:left1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-12 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0">
					</div>
				</label>
			</div>
			{showQRCode && (
				<div className='flex items-center flex-col'>
					<img src={`${qrCodeBase64}`} alt="QR Code" className=' mt-5' />
					<div className='flex justify-center items-center mt-8 h-[3rem] '>
						<input
							className='h-full rounded-l-lg'
							type="text"
							placeholder="Enter Verification Code"
							value={verificationCode}
							onChange={(e) => setVerificationCode(e.target.value)}
						/>
						<button className="bg-teal-700 text-white font-bold rounded-r-lg w-[5rem] h-full" onClick={(e: MouseEvent) => handleVerification(e)}>
							Verify
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default TwoAuth;

