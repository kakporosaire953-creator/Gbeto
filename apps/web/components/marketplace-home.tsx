"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, ChevronDown, Heart, MapPin, Menu, Search, ShoppingBag, Sparkles, Star, Truck, Users, Wallet, X } from "lucide-react";

const products = [
  { id: 1, name: "Panier tressé Afi", maker: "Atelier Adja · Ouidah", price: 18500, rating: "4,9", image: "https://images.unsplash.com/photo-1590739225287-bd31519780c3?auto=format&fit=crop&w=640&q=72", tag: "Fait main" },
  { id: 2, name: "Chemise Indigo Kaba", maker: "Maison Yawa · Cotonou", price: 32000, rating: "4,8", image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=640&q=72", tag: "Nouveau" },
  { id: 3, name: "Beurre de karité pur", maker: "Coopérative Nati · Natitingou", price: 6500, rating: "4,9", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=640&q=72", tag: "Bio" },
  { id: 4, name: "Café de l'Atacora", maker: "Terres rouges · Boukoumbé", price: 4800, rating: "4,7", image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=640&q=72", tag: "Circuit court" },
];

const categories = ["Mode & textile", "Maison", "Beauté", "Épicerie", "Art & culture", "Électronique"];

export function MarketplaceHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<"XOF" | "EUR" | "USD">("XOF");
  const [cartCount, setCartCount] = useState(2);
  const [query, setQuery] = useState("");
  const rates = { XOF: 1, EUR: 0.00152, USD: 0.00165 };
  const formatPrice = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency, maximumFractionDigits: currency === "XOF" ? 0 : 2 }).format(value * rates[currency]);
  const visibleProducts = useMemo(() => products.filter((p) => `${p.name} ${p.maker}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <div className="site-shell">
      <div className="announcement">Livraison offerte à Cotonou dès 25 000 F <span>•</span> Paiement Mobile Money sécurisé</div>
      <header className="header">
        <a href="#" className="brand" aria-label="Gbéto, accueil"><span className="brand-mark">G</span><span>Gbéto</span></a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Ouvrir le menu">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navigation principale">
          <Link href="/catalogue">Découvrir</Link><a href="#categories">Catégories</a><a href="#diaspora">Mode diaspora</a><Link href="/dashboard">Vendre sur Gbéto</Link>
        </nav>
        <div className="header-actions">
          <label className="currency"><span className="sr-only">Devise</span><select value={currency} onChange={(e) => setCurrency(e.target.value as typeof currency)}><option>XOF</option><option>EUR</option><option>USD</option></select><ChevronDown size={14}/></label>
          <button className="icon-button" aria-label="Favoris"><Heart /></button>
          <Link href="/panier" className="cart" aria-label={`Panier, ${cartCount} articles`}><ShoppingBag/><span>{cartCount}</span></Link>
        </div>
      </header>

      <main id="contenu">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={15}/> Le meilleur d'ici, pour partout</p>
            <h1>Ce qui vient d’ici<br/><em>va plus loin.</em></h1>
            <p className="hero-lead">Découvrez les talents, saveurs et savoir-faire du Bénin. Achetez en toute confiance, pour vous ou pour vos proches.</p>
            <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
              <Search aria-hidden="true"/><label className="sr-only" htmlFor="search">Rechercher</label><input id="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Que recherchez-vous ?"/><button>Rechercher</button>
            </form>
            <div className="trust-row"><span><BadgeCheck/>Vendeurs vérifiés</span><span><Wallet/>Paiement protégé</span><span><Truck/>Suivi en direct</span></div>
          </div>
          <div className="hero-visual" aria-label="Sélection de produits artisanaux béninois">
            <Image priority fill sizes="(max-width: 760px) 100vw, 46vw" src="https://images.unsplash.com/photo-1609252509102-aa73ff792667?auto=format&fit=crop&w=1200&q=78" alt="Objets artisanaux aux teintes indigo et argile"/>
            <div className="floating-card"><span className="pulse"/><div><strong>Commande livrée</strong><small>À Fidjrossè, il y a 3 min</small></div></div>
            <div className="indigo-ring"/>
          </div>
        </section>

        <section className="category-strip" id="categories" aria-label="Catégories"><span>Explorer</span>{categories.map((category, index) => <Link href="/catalogue" key={category}><i>{String(index + 1).padStart(2,"0")}</i>{category}</Link>)}</section>

        <section className="products-section" id="decouvrir">
          <div className="section-heading"><div><p className="eyebrow">Sélection du moment</p><h2>Des trouvailles qui ont une histoire</h2></div><Link href="/catalogue">Tout voir <ArrowRight/></Link></div>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image"><Link href={product.id===1?"/produit/panier-tresse-afi":"/catalogue"}><Image fill sizes="(max-width: 560px) 50vw, 25vw" src={product.image} alt={product.name}/></Link><span className="tag">{product.tag}</span><button aria-label={`Ajouter ${product.name} aux favoris`}><Heart/></button></div>
                <div className="product-body"><p>{product.maker} <BadgeCheck size={14}/></p><h3><Link href={product.id===1?"/produit/panier-tresse-afi":"/catalogue"}>{product.name}</Link></h3><div className="product-meta"><strong>{formatPrice(product.price)}</strong><span><Star/> {product.rating}</span></div><button className="add-button" onClick={() => setCartCount((n) => n + 1)}>Ajouter au panier</button></div>
              </article>
            ))}
          </div>
          {visibleProducts.length === 0 && <p className="empty">Aucun produit ne correspond à « {query} ». Essayez “indigo” ou “karité”.</p>}
        </section>

        <section className="diaspora" id="diaspora">
          <div className="diaspora-pattern" aria-hidden="true"/><div className="diaspora-copy"><p className="eyebrow">Gbéto Diaspora</p><h2>Même loin, prenez soin des vôtres.</h2><p>Payez depuis l’étranger en EUR ou USD. Vos proches reçoivent leurs courses et cadeaux directement au Bénin, avec confirmation de livraison.</p><Link className="primary-link" href="/catalogue">Envoyer un cadeau <ArrowRight/></Link></div>
          <div className="diaspora-steps"><div><span>1</span><strong>Choisissez</strong><small>Des produits locaux</small></div><div><span>2</span><strong>Payez</strong><small>Dans votre devise</small></div><div><span>3</span><strong>On livre</strong><small>À la bonne personne</small></div></div>
        </section>

        <section className="seller" id="vendeurs"><div><p className="eyebrow">Vendeurs & créateurs</p><h2>Votre talent mérite un plus grand marché.</h2><p>Créez votre boutique, publiez vos produits avec l’assistant Gbéto et recevez vos paiements en toute transparence.</p></div><Link className="outline-link" href="/dashboard">Ouvrir ma boutique <ArrowRight/></Link></section>
      </main>
      <footer><a href="#" className="brand"><span className="brand-mark">G</span><span>Gbéto</span></a><p>Le marché qui nous rassemble.</p><div><a href="#">Aide</a><a href="#">Confiance & sécurité</a><a href="#">Conditions</a></div><small>© 2026 Gbéto</small></footer>
      <button className="whatsapp" aria-label="Contacter Gbéto sur WhatsApp">WA</button>
    </div>
  );
}
