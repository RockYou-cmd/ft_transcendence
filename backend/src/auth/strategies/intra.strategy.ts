import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-42"
import { Injectable } from "@nestjs/common";


@Injectable()

export class intraStrategy extends PassportStrategy(Strategy) {
	constructor () {
		super({
			clientID:"u-s4t2ud-9347b4d60fd03c0cefa4f67eb8f98d77fc60c768e034dbe9d95dbd9f72555fa6",
			clientSecret: "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",
			callbackURL: "http://localhost:3000/auth/intra",
		})
	}
	validate(iDontNeed, iDontNeedAgain, profile, done) {
		const {username, emails} = profile;
		const user = {
			username,
			email: emails[0].value,
			photo: profile._json.image.link,
		}
		done(null, user);
	}
}