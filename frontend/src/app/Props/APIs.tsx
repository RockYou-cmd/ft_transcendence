
export interface Api{
	SignIn : string,
	SignUp : string,
	Profile : string,
	Chat : string,
	Game : string,
	Navbar: string,
	accessToken: string,
}

export const APIs : Api = { 
	SignIn : "http://localhost:3001/auth/signIn",
	SignUp : "http://localhost:3001/auth/signUp",
	Profile : "http://localhost:3001/user/one/?username=",
	Chat : "",
	Game : "",
	Navbar: "http://localhost:3001/user/one/?username=",
	accessToken: "http://localhost:3001/auth/token",
};