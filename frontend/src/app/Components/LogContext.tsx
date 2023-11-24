"use client";
import { createContext , useContext, useState } from 'react';

type LogContextType = {
	online: string;
	setOnline: React.Dispatch<React.SetStateAction<string>>;

};

export const LogContext = createContext<LogContextType | null>(null);

export default function LogContextProvider({children} : {children: React.ReactNode}){

	const [online, setOnline] = useState("OFF");

	return(
		<LogContext.Provider value={{online, setOnline}}>
			{children}
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