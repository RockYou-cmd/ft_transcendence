
export const LocalHost = "http://localhost:3001";
export const Host = "http://10.12.11.1:3001";
// export const Host = LocalHost;
 
export interface Api{
	SignIn : string,
	SignUp : string,
	Profile : string,
	Navbar: string,
	accessToken: string,
	googleAuth: string,
	intraAuth: string,
	googleToken: string,
	intraToken: string,
	Search : string,
	SendFriendRequest : string,
	User : string,
	Remove: string,
	getChat: string,
	sendMsg : string,
	Friends: string,
	Kick: string,
	Ban: string,
	Mute: string,
	MakeAdmin: string,
	RemoveAdmin: string,
	Groups : string,
	myGroups : string,
	JoinRoom : string,
	CreateRoom : string,
	LeaveRoom : string,
	Block : string,
	JoinProtectedRoom : string,
	addMember: string,
	UnBan : string,
	RoomChat : string,
	members: string,
	addNewMembers: string,

}

export const APIs : Api = { 
	SignIn : Host + "/auth/signIn",
	SignUp : Host + "/auth/signUp",
	Profile : Host + "/user/profile",
	User : Host + "/user/?username=",
	Navbar: Host + "/user/profile",
	accessToken: Host + "/auth/token",
	googleAuth: Host + "/auth/google",
	intraAuth: Host + "/auth/intra",
	googleToken: Host + "/auth/google/callback",
	intraToken: Host + "/auth/intra/callback",
	Search : Host + "/user/search/?username=",
	SendFriendRequest : Host + "/request/",
	Remove: Host + "/user/remove",
	getChat: Host + "/message/chat/?username=",
	sendMsg : Host + "/message/send",
	Friends: Host + "/user/friends/?chat=",
	Ban: Host + "/room/ban/member",
	UnBan: Host + "/room/unban/member",
	addMember: Host + "/room/add/member",
	Kick: Host + "/room/remove/member",
	Mute: Host + "/role/mute",
	MakeAdmin: Host + "/room/add/admin",
	RemoveAdmin: Host + "/room/remove/admin",
	Groups : Host + "/room",
	myGroups : Host + "/room/in",
	JoinRoom : Host + "/room/join",
	CreateRoom : Host + "/room/create",
	LeaveRoom : Host + "/room/leave",
	Block : Host + "/user/block",
	JoinProtectedRoom : Host + "/room/join/protected",
	RoomChat : Host + "/room/chat/?id=",
	members: Host + "/room/members/?id=",
	addNewMembers: Host + "/room/add/new/member/?id=",
};