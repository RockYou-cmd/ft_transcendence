import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import {Strategy} from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";



@Injectable()
export class googleStrategy extends PassportStrategy(Strategy) {
  constructor(private cofingService: ConfigService) {///
    super({
      clientID: cofingService.get("GOOGLE_CLIENT_ID"),
      clientSecret: cofingService.get("GOOGLE_CLIENT_SECRET"),
      callbackURL: cofingService.get("GOOGLE_CALLBACK_URL"),
      scope: ["profile", "email"],
    });
  }
  validate(idontNeed, idontNeedAgain, profile, done) {
    const { displayName, emails, photos } = profile;
    const user = {
      username: displayName,
      email: emails[0].value,
      photo: photos[0].value,
    };
    done(null, user);
  }
}