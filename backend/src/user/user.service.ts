import { Injectable } from "@nestjs/common";

@Injectable()

export class userService {
	getUser() {
		return "I am the chosen one!"
	}
}