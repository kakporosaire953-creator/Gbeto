import { ArrowDownRight, ArrowUpRight, BadgeCheck, Box, CircleDollarSign, LayoutDashboard, MessageCircle, PackageCheck, Settings, ShoppingBag, Store, Truck, Users } from "lucide-react";

const orders = [
  ["GB-24081", "Awa Houngbédji", "Panier tressé Afi", "18 500 F", "À préparer"],
  ["GB-24080", "Mariam Dossou", "Chemise Indigo Kaba", "32 000 F", "En livraison"],
  ["GB-24079", "Romuald Tohou", "Beurre de karité × 2", "13 000 F", "Livrée"],
];

export default function SellerDashboard() {
  return <main className="dashboard-shell">
    <aside className="dashboard-nav"><a className="brand" href="/"><span className="brand-mark">G</span><span>Gbéto</span></a><p>ESPACE VENDEUR</p><nav><a className="active" href="#"><LayoutDashboard/>Vue d’ensemble</a><a href="#"><ShoppingBag/>Commandes <b>7</b></a><a href="#"><Box/>Produits</a><a href="#"><CircleDollarSign/>Finances</a><a href="#"><Truck/>Livraisons</a><a href="#"><MessageCircle/>Messages <b>3</b></a></nav><nav className="bottom"><a href="#"><Settings/>Paramètres</a></nav></aside>
    <section className="dashboard-content"><header><div><p>Mercredi 15 juillet</p><h1>Bonjour, Koffi 👋</h1></div><div className="seller-identity"><span>KA</span><div><strong>Atelier Koffi</strong><small><BadgeCheck/> Boutique vérifiée</small></div></div></header>
      <div className="dashboard-callout"><div><strong>Votre semaine démarre bien.</strong><p>Vous avez reçu 12 commandes, soit 18 % de plus que la semaine dernière.</p></div><a href="#">Voir les commandes</a></div>
      <div className="metric-grid"><article><p>Ventes ce mois</p><h2>428 500 F</h2><span className="positive"><ArrowUpRight/> +14,2 %</span></article><article><p>Commandes</p><h2>47</h2><span className="positive"><ArrowUpRight/> +8,4 %</span></article><article><p>Panier moyen</p><h2>18 240 F</h2><span><ArrowDownRight/> -2,1 %</span></article><article><p>Solde disponible</p><h2>186 200 F</h2><button>Retirer</button></article></div>
      <section className="orders-panel"><div className="panel-title"><div><p>À traiter maintenant</p><h2>Commandes récentes</h2></div><a href="#">Toutes les commandes</a></div><div className="order-table" role="table"><div className="order-row heading" role="row"><span>Commande</span><span>Client</span><span>Article</span><span>Total</span><span>Statut</span></div>{orders.map((order)=><div className="order-row" role="row" key={order[0]}>{order.map((item,index)=><span key={item} className={index===4 ? `status s${index}`:""}>{item}</span>)}</div>)}</div></section>
      <div className="dashboard-lower"><section><div className="panel-title"><div><p>Performance</p><h2>Objectif mensuel</h2></div><strong>72 %</strong></div><div className="progress"><i/></div><small>428 500 F sur 600 000 F</small></section><section><div className="panel-title"><div><p>Confiance</p><h2>Qualité boutique</h2></div><strong>4,9/5</strong></div><div className="quality-row"><span><PackageCheck/>96 % livrées à temps</span><span><Users/>138 clients fidèles</span><span><Store/>24 produits actifs</span></div></section></div>
    </section>
  </main>;
}
