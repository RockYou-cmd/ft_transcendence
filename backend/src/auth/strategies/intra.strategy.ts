import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-42"
import { Injectable } from "@nestjs/common";


@Injectable()

export class intraStrategy extends PassportStrategy(Strategy) {
	constructor () {
		super({
      clientID:
        "u-s4t2ud-5023299b300ab5240b76edd245e84997d96d9e8b3718f2b327a776a10156f6d0",
      clientSecret:
        "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",
      callbackURL: "http://localhost:3000/auth/intra",
    });
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