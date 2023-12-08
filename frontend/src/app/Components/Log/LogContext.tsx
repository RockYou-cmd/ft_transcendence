"use client";
import { createContext , useContext, useEffect, useState } from 'react';
import { io , Socket} from "socket.io-client";

type LogContextType = {
	online: string;
	setOnline: React.Dispatch<React.SetStateAction<string>>;

};

export const socket = io("http://10.12.11.1:3001/events");

export const WebSocket = createContext<Socket>(socket);

export const LogContext = createContext<LogContextType | null>(null);

export const SocketPrivider = WebSocket.Provider;



export default function LogContextProvider({children} : {children: React.ReactNode}){

	const [online, setOnline] = useState("OFF");

	
	return(
		<LogContext.Provider value={{online, setOnline}}>
			<SocketPrivider value={socket}>
				{children}
			</SocketPrivider>
		</LogContext.Provider>
	)

}

export function useLogContext(){
	const context = useContext(LogContext);
	if (!context) {
		throw new Error('useLogContext must be used within a LogContextProvider')
	}
	return context;
}

export function useSocket(){
	const context = useContext(WebSocket);
	if (!context) {
		throw new Error('useSocket must be used within a SocketPrivider')
	}
	return context;
}