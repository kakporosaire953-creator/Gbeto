import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";
import { MarketplaceController } from "./marketplace.controller";
import { OrderService } from "./order.service";

@Module({ controllers: [HealthController, MarketplaceController], providers: [OrderService] })
export class AppModule {}
