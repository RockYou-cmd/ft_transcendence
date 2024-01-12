import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-42"
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class intraStrategy extends PassportStrategy(Strategy) {
	constructor(private configService: ConfigService) {

		super({
      clientID: configService.get("INTRA_CLIENT_ID"),
      clientSecret: configService.get("INTRA_CLIENT_SECRET"),
      callbackURL: configService.get("INTRA_CALLBACK_URL"),
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