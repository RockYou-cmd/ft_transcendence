
export const Host = "http://localhost:3001";

export interface Api {
	SignIn: string,
	SignUp: string,
	Profile: string,
	Navbar: string,
	accessToken: string,
	googleAuth: string,
	intraAuth: string,
	googleToken: string,
	intraToken: string,
	Search: string,
	SendFriendRequest: string,
	AcceptFriendRequest : string,
	User: string,
	Remove: string,
	getChat: string,
	sendMsg: string,
	Friends: string,
	FriendsChat : string,
	Kick: string,
	Ban: string,
	Mute: string,
	MakeAdmin: string,
	RemoveAdmin: string,
	Groups: string,
	myGroups: string,
	JoinRoom: string,
	CreateRoom: string,
	LeaveRoom: string,
	Block: string,
	JoinProtectedRoom: string,
	addMember: string,
	UnBan: string,
	RoomChat: string,
	members: string,
	addNewMembers: string,
	Logout : string,
	createChat: string,
	roomModify: string,
	unMute: string,
	UserFriends : string,
	matchHistory : string,
	friendPending : string,
	changePassword : string,
	leaderBoard : string,
}

export const APIs : Api = {
	SignIn: Host + "/auth/signIn",
	SignUp: Host + "/auth/signUp",
	Profile: Host + "/user/profile",
	User: Host + "/user/?username=",
	Navbar: Host + "/user/profile",
	accessToken: Host + "/auth/token",
	googleAuth: Host + "/auth/google",
	intraAuth: Host + "/auth/intra",
	googleToken: Host + "/auth/google/callback",
	intraToken: Host + "/auth/intra/callback",
	Search: Host + "/user/search/?username=",
	SendFriendRequest: Host + "/friend/send/request",
	AcceptFriendRequest: Host + "/friend/accept/request",
	Remove: Host + "/friend/remove",
	getChat: Host + "/chat/get/?username=",
	createChat: Host + "/chat/create",
	sendMsg: Host + "/message/send",
	Friends: Host + "/friend/all",
	Ban: Host + "/room/ban/member",
	UnBan: Host + "/room/unban/member",
	addMember: Host + "/room/add/member",
	Kick: Host + "/room/remove/member",
	Mute: Host + "/room/mute/member",
	MakeAdmin: Host + "/room/add/admin",
	RemoveAdmin: Host + "/room/remove/admin",
	Groups: Host + "/room",
	myGroups: Host + "/room/in",
	JoinRoom: Host + "/room/join",
	CreateRoom: Host + "/room/create",
	LeaveRoom: Host + "/room/leave",
	Block: Host + "/friend/block",
	JoinProtectedRoom: Host + "/room/join/protected",
	RoomChat: Host + "/room/chat/?id=",
	members: Host + "/room/members/?id=",
	addNewMembers: Host + "/room/add/new/member/?id=",
	Logout : Host + "/auth/logout",
	FriendsChat : Host + "/friend/chats",
	roomModify : Host + "/room/modify",
	unMute : Host + "/room/unmute/member",
	UserFriends : Host + "/user/friends/?username=",
	matchHistory : Host + "/user/games",
	friendPending : Host + "/friend/pending",
	changePassword : Host + "/user/password",
	leaderBoard : Host + "/user/leaderBoard",
};