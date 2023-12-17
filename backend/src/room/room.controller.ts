import { Body, Controller, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from 'src/auth/auth.guard/auth.guard';
import { AdminGuard, MemberGuard, OwnerGuard } from './room.guard/role.guard';

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
  @UseGuards(AuthGuard, MemberGuard)
  async getChat(@Req() account, @Query("id") roomid) {
    return this.roomService.getChat(account.user, roomid);
  }
  
  
  @Post("create")
  @UseGuards(AuthGuard)
  async createRoom(@Req() account, @Body() data) {
    return this.roomService.createRoom(account.user, data);
  }

  @Put("modify")
  @UseGuards(AuthGuard, OwnerGuard)
  async modifyRoom(@Req() account, @Body() data) {
    return this.roomService.modifyRoom(data);
  }

  
  @Post("join")
  @UseGuards(AuthGuard)
  async joinRoom(@Req() account, @Body("id") roomId) {
    return this.roomService.joinRoom(account.user, roomId);
  }

  @Post("join/protected")
  @UseGuards(AuthGuard)
  async joinProtected(@Req() account, @Body() data) {
    return this.roomService.joinProtected(account.user, data);
  }

  @Post("leave")
  @UseGuards(AuthGuard)
  async leaveRoom(@Req() account, @Body("id") roomId) {
    return this.roomService.leaveRoom(account.user, roomId);
  }

  @Get("members")
  @UseGuards(AuthGuard, MemberGuard)
  async getMembers(@Req() account, @Query("id") roomId) {
    return this.roomService.getMembers(account.user, roomId);
  }

  @Post("add/member")
  @UseGuards(AuthGuard, OwnerGuard)
  async addMember(@Body() data) {
    return this.roomService.addMember(data);
  }

  @Get("add/new/member")
  @UseGuards(AuthGuard)
  async getMembersToAdd(@Query("id") roomId) {
    return this.roomService.getMembersToAdd(roomId);
  }
  
  @Post("remove/member")
  @UseGuards(AuthGuard, AdminGuard)
  async removeMember(@Body() data) {
    return this.roomService.removeMember(data);
    
  }
  
  @Put("add/admin")
  @UseGuards(AuthGuard, OwnerGuard)
  async addAdmin(@Body() data) {
    return this.roomService.addAdmin(data);
  }
  
  @Put("remove/admin")
  @UseGuards(AuthGuard, OwnerGuard)
  async removeAdmin(@Body() data) {
    return this.roomService.removeAdmin(data);
  }


  @Put("ban/member")
  @UseGuards(AuthGuard, AdminGuard)
  async banMember(@Body() data) {
    return this.roomService.banMember(data);
  }

  @Put("unban/member") 
  @UseGuards(AuthGuard, AdminGuard)
  async unbanMember(@Body() data) {
    return this.roomService.unbanMember(data);
  }
}
