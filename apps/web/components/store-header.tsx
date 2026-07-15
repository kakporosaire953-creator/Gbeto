import Link from "next/link";
import { Heart, Search, ShoppingBag, UserRound } from "lucide-react";

export function StoreHeader() {
  return <><div className="announcement">Livraison offerte à Cotonou dès 25 000 F <span>•</span> Paiement Mobile Money sécurisé</div><header className="store-header"><Link href="/" className="brand"><span className="brand-mark">G</span><span>Gbéto</span></Link><nav aria-label="Navigation boutique"><Link href="/catalogue">Catalogue</Link><Link href="/#diaspora">Diaspora</Link><Link href="/dashboard">Vendre</Link></nav><div className="store-actions"><button aria-label="Rechercher"><Search/></button><button aria-label="Favoris"><Heart/></button><Link aria-label="Mon compte" href="/compte"><UserRound/></Link><Link className="mini-cart" aria-label="Panier" href="/panier"><ShoppingBag/><span>2</span></Link></div></header></>;
}
