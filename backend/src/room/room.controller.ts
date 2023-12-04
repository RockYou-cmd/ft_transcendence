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

  @Post("create")
  @UseGuards(AuthGuard)
  async createRoom(@Req() account, @Body() data) {
    return this.roomService.createRoom(account.user, data);
  }

  @Get("members")
  @UseGuards(AuthGuard)
  async getMembers(@Query("id") roomId) {
    return this.roomService.getMembers(roomId);
  }

  @Post("add/member")
  @UseGuards(AuthGuard)
  async addMember(@Body() data) {
    return this.roomService.addMember(data);
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

  @Post("join")
  @UseGuards(AuthGuard)
  async joinRoom(@Req() account, @Body("id") roomId) {
    console.log(roomId)
    console.log(account.user.username)
    return this.roomService.joinRoom(account.user, roomId);
  }

  @Post("join/private")
  @UseGuards(AuthGuard)
  async joinPrivate(@Body() data) {
    return this.roomService.joinPrivate(data);
  }

  @Post("leave")
  @UseGuards(AuthGuard)
  async leaveRoom(@Req() account, @Body("id") roomId) {
    return this.roomService.leaveRoom(account.user, roomId);
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
