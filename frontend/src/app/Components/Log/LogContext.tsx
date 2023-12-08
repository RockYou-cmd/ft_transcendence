"use client";
import { createContext, useContext, useState } from 'react';
import { io, Socket } from "socket.io-client";


const localhost = "http://localhost:3001";
const host = "http://localhost:3001";

type LogContextType = {
	online: string;
	setOnline: React.Dispatch<React.SetStateAction<string>>;

};

type SocketType = {
	socket: Socket;
	setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}


// export const socket = io(host + "/events");

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


	return (
		<LogContext.Provider value={{ online, setOnline }}>
			<SocketPrivider value={{ socket, setSocket }}>
				<Me.Provider value={{ me, setMe }}>
					{children}
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