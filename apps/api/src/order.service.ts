import { BadRequestException, Injectable } from "@nestjs/common";

export type OrderState = "PENDING_PAYMENT" | "PAID" | "ACCEPTED" | "IN_TRANSIT" | "DELIVERED" | "DISPUTED" | "REFUNDED";
const transitions: Record<OrderState, readonly OrderState[]> = {
  PENDING_PAYMENT: ["PAID"], PAID: ["ACCEPTED", "REFUNDED"], ACCEPTED: ["IN_TRANSIT", "REFUNDED"],
  IN_TRANSIT: ["DELIVERED", "DISPUTED"], DELIVERED: ["DISPUTED"], DISPUTED: ["REFUNDED", "DELIVERED"], REFUNDED: [],
};

@Injectable()
export class OrderService {
  nextState(current: OrderState, next: OrderState): OrderState {
    if (!transitions[current].includes(next)) throw new BadRequestException(`Transition ${current} → ${next} interdite`);
    return next;
  }

  splitAmount(totalMinor: number, platformFeeBasisPoints: number) {
    if (!Number.isSafeInteger(totalMinor) || totalMinor <= 0) throw new BadRequestException("Montant invalide");
    if (platformFeeBasisPoints < 0 || platformFeeBasisPoints > 3000) throw new BadRequestException("Commission invalide");
    const platformMinor = Math.floor((totalMinor * platformFeeBasisPoints) / 10_000);
    return { platformMinor, sellerMinor: totalMinor - platformMinor };
  }
}
