export interface PaymentGateway {
  createPayment(input: { orderId: string; amountMinor: number; currency: string; returnUrl: string }): Promise<{ reference: string; checkoutUrl: string }>;
  verifyWebhook(rawBody: Uint8Array, signature: string): Promise<{ eventId: string; reference: string; status: "SUCCEEDED" | "FAILED" }>;
}

export interface MessagingGateway {
  sendTemplate(input: { recipient: string; template: string; locale: string; variables: Record<string, string> }): Promise<{ messageId: string }>;
}

export interface DeliveryGateway {
  quote(input: { pickupZone: string; dropoffZone: string; weightGrams: number }): Promise<{ amountMinor: number; etaMinutes: number }>;
  assign(input: { deliveryId: string; zone: string }): Promise<{ courierId: string }>;
}

// Les implémentations de production vivent dans des adaptateurs séparés : le domaine ne dépend jamais d'un fournisseur.
