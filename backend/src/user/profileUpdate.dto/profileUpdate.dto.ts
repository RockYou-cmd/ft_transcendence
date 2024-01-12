import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  Length,
} from "class-validator";

export class ProfileUpdateDto {
	@IsNotEmpty()
  @Length(4, 12)
	@IsAlphanumeric()
	@IsOptional()
  username: String;
	
	@IsOptional()
	@Length(0, 30)
  bio: String;

}
