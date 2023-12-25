

export interface Userdb {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	username: string;
}

export interface ChatOptions{
	Option: string[];
	desc: string[];
}

export interface Message {
	type? : string;
	content: string;
	sender: string;
	chatId: string;
	receiver?: string;
	receivers?: any;
}

