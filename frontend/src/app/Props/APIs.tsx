
export interface Api{
	SignIn : string,
	SignUp : string,
	Profile : string,
	Chat : string,
	Game : string,
	Navbar: string,
	accessToken: string,
	googleAuth: string,
	intraAuth: string,
}

export const APIs : Api = { 
	SignIn : "http://localhost:3001/auth/signIn",
	SignUp : "http://localhost:3001/auth/signUp",
	Profile : "http://localhost:3001/user/",
	Chat : "",
	Game : "",
	Navbar: "http://localhost:3001/user/",
	accessToken: "http://localhost:3001/auth/token",
	googleAuth: "http://localhost:3001/Auth/google",
	intraAuth: "http://localhost:3001/auth/intra",
};