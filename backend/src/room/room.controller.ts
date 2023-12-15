import { Body, Controller, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from 'src/auth/auth.guard/auth.guard';

@Controller("room")
export class RoomController {
  constructor(private readonly roomService: RoomService) {};

  @Get()
  @UseGuards(AuthGuard)
  async getRooms(@Req() account) {
    return this.roomService.getRooms(account.user);
  }

  @Get("in")
  @UseGuards(AuthGuard)
  async roomsIn(@Req() account) {
    return this.roomService.getRoomsIn(account.user);
  }

  @Get("chat")
  @UseGuards(AuthGuard)
  async getChat(@Req() account, @Query("id") roomid) {
    return this.roomService.getChat(account.user, roomid);
  }
  
  
  @Post("create")
  @UseGuards(AuthGuard)
  async createRoom(@Req() account, @Body() data) {
    return this.roomService.createRoom(account.user, data);
  }
  
  @Post("join")
  @UseGuards(AuthGuard)
  async joinRoom(@Req() account, @Body("id") roomId) {
    console.log(roomId)
    console.log(account.user.username)
    return this.roomService.joinRoom(account.user, roomId);
  }

  @Post("join/protected")
  @UseGuards(AuthGuard)
  async joinPrivate(@Req() account, @Body() data) {
    return this.roomService.joinPrivate(account.user, data);
  }

  @Post("leave")
  @UseGuards(AuthGuard)
  async leaveRoom(@Req() account, @Body("id") roomId) {
    return this.roomService.leaveRoom(account.user, roomId);
  }

  @Get("members")
  @UseGuards(AuthGuard)
  async getMembers(@Req() account, @Query("id") roomId) {
    return this.roomService.getMembers(account.user, roomId);
  }

  @Post("add/member")
  @UseGuards(AuthGuard)
  async addMember(@Body() data) {
    return this.roomService.addMember(data);
  }

  @Get("add/new/member")
  @UseGuards(AuthGuard)
  async addNewMember(@Query("id") roomId) {
    console.log("hahaha");
    return this.roomService.addNewMember(roomId);
  }
  
  @Post("remove/member")
  @UseGuards(AuthGuard)
  async removeMember(@Body() data) {
    return this.roomService.removeMember(data);
    
  }
  
  @Put("add/admin")
  @UseGuards(AuthGuard)
  async addAdmin(@Body() data) {
    return this.roomService.addAdmin(data);
  }
  
  @Put("remove/admin")
  @UseGuards(AuthGuard)
  async removeAdmin(@Body() data) {
    return this.roomService.removeAdmin(data);
  }


  @Put("ban/member")
  @UseGuards(AuthGuard)
  async banMember(@Body() data) {
    return this.roomService.banMember(data);
  }

  @Put("unban/member") 
  @UseGuards(AuthGuard)
  async unbanMember(@Body() data) {
    return this.roomService.unbanMember(data);
  }

}
