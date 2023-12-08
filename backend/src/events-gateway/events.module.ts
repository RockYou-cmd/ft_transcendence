import { Module } from "@nestjs/common";
import { EventsGateway } from "./events.gateway";
import { AuthGuard } from "src/auth/auth.guard/auth.guard";
import { JwtService } from "@nestjs/jwt";


@Module({
	providers: [EventsGateway, AuthGuard, JwtService]
})

export class EventsModule {}