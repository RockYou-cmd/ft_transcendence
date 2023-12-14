"use client";
import { createContext, useContext, useState } from 'react';
import { Socket } from "socket.io-client";




type LogContextType = {
	online: string;
	setOnline: React.Dispatch<React.SetStateAction<string>>;

};

type SocketType = {
	socket: Socket;
	setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}

type SilenceType = {
	silence: boolean;
	setSilence: React.Dispatch<React.SetStateAction<boolean>>;

}

export const Silence = createContext<SilenceType | null>(null);

export const WebSocket = createContext<SocketType | null>(null);

export const LogContext = createContext<LogContextType | null>(null);

export const SocketPrivider = WebSocket.Provider;


type MeType = {
	me: object,
	setMe: React.Dispatch<React.SetStateAction<object>>
};


export const Me = createContext<MeType>({} as any);


export default function LogContextProvider({ children }: { children: React.ReactNode }) {

	const [online, setOnline] = useState("OFF");
	const [me, setMe] = useState({});
	const [socket, setSocket] = useState(null) as any;
	const [silence, setSilence] = useState(false);


	return (
		<LogContext.Provider value={{ online, setOnline }}>
			<SocketPrivider value={{ socket, setSocket }}>
				<Me.Provider value={{ me, setMe }}>
					<Silence.Provider value={{silence, setSilence}}>
						{children}
					</Silence.Provider>
				</Me.Provider>
			</SocketPrivider>
		</LogContext.Provider>
	)

}

export function useLogContext() {
	const context = useContext(LogContext);
	if (!context) {
		throw new Error('useLogContext must be used within a LogContextProvider')
	}
	return context;
}

export function useSocket() {
	const context = useContext(WebSocket);
	if (!context) {
		throw new Error('useSocket must be used within a SocketPrivider')
	}
	return context;
}

export function useMe() {
	const context = useContext(Me);
	if (!context) {
		throw new Error('useMe must be used within a MePrivider')
	}
	return context;
}

export function useSilence() {
	const context = useContext(Silence);
	if (!context) {
		throw new Error('useSilence must be used within a SilencePrivider')
	}
	return context;
}