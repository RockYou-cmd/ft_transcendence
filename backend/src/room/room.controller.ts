import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from 'src/auth/auth.guard/auth.guard';

@Controller("room")
export class RoomController {
  constructor(private readonly roomService: RoomService) {};

  @Post("create")
  @UseGuards(AuthGuard)
  async createRoom(@Req() account, @Body() data) {
    return this.roomService.createRoom(account.user, data);
  }
  
}
