
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
