import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import {Strategy} from "passport-google-oauth20";

@Injectable()

export class googleStrategy extends PassportStrategy(Strategy) {
	constructor () {
		super({
			clientID: "931575860110-t46aljipbfvk4fk5tshe1ntvtkmjhjc9.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL:"http://localhost:3000/auth/google",
			scope: ["profile", "email"]
		});
	}
	validate(idontNeed, idontNeedAgain, profile, done) {
		
		const {displayName, emails, photos} = profile;
		const user = {
			username:displayName,
			email: emails[0].value,
			photo: photos[0].value
		}
		done(null, user);
	}
}