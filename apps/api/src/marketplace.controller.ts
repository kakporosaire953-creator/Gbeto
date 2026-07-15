import { Body, Controller, Get, Headers, HttpCode, Param, Patch, Post, ServiceUnavailableException } from "@nestjs/common";
import { IsIn, IsInt, IsString, Min } from "class-validator";
import { OrderService, type OrderState } from "./order.service";

class TransitionDto { @IsIn(["PAID","ACCEPTED","IN_TRANSIT","DELIVERED","DISPUTED","REFUNDED"]) state!: OrderState; }
class QuoteDto { @IsInt() @Min(1) amountMinor!: number; @IsString() @IsIn(["XOF","EUR","USD"]) currency!: string; }

@Controller()
export class MarketplaceController {
  constructor(private readonly orders: OrderService) {}

  @Get("catalog")
  catalog() { return { data: [], meta: { cursor: null, locale: "fr", currency: "XOF" } }; }

  @Post("checkout/quote")
  quote(@Body() dto: QuoteDto) { return { ...this.orders.splitAmount(dto.amountMinor, 900), currency: dto.currency, expiresInSeconds: 900 }; }

  @Patch("orders/:id/state")
  transition(@Param("id") id: string, @Headers("x-current-state") current: OrderState, @Body() dto: TransitionDto) {
    return { id, state: this.orders.nextState(current, dto.state), updatedAt: new Date().toISOString() };
  }

  @Post("payments/webhooks/fedapay") @HttpCode(202)
  paymentWebhook(@Headers("x-webhook-signature") signature?: string) {
    if (!signature) throw new ServiceUnavailableException("Signature webhook absente");
    // Fail closed: l'événement ne sera accepté qu'après branchement de l'adaptateur
    // qui vérifie la signature, l'horodatage et l'idempotence avec les secrets réels.
    throw new ServiceUnavailableException("Vérification cryptographique du paiement non configurée");
  }

  @Post("regulated/:flow")
  regulated(@Param("flow") flow: string) {
    if (process.env.ENABLE_REGULATED_FLOWS !== "true") throw new ServiceUnavailableException(`${flow} indisponible avant validation conformité`);
    return { flow, enabled: true };
  }
}
