export type Product = {
  slug: string;
  name: string;
  maker: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  tag: string;
  image: string;
};

export const catalog: Product[] = [
  { slug: "panier-tresse-afi", name: "Panier tressé Afi", maker: "Atelier Adja", location: "Ouidah", price: 18500, rating: 4.9, reviews: 84, category: "Maison", tag: "Fait main", image: "https://images.unsplash.com/photo-1590739225287-bd31519780c3?auto=format&fit=crop&w=900&q=76" },
  { slug: "chemise-indigo-kaba", name: "Chemise Indigo Kaba", maker: "Maison Yawa", location: "Cotonou", price: 32000, rating: 4.8, reviews: 52, category: "Mode & textile", tag: "Nouveau", image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=900&q=76" },
  { slug: "beurre-karite-pur", name: "Beurre de karité pur", maker: "Coopérative Nati", location: "Natitingou", price: 6500, rating: 4.9, reviews: 137, category: "Beauté", tag: "Bio", image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=76" },
  { slug: "cafe-atacora", name: "Café de l’Atacora", maker: "Terres rouges", location: "Boukoumbé", price: 4800, rating: 4.7, reviews: 41, category: "Épicerie", tag: "Circuit court", image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=76" },
  { slug: "vase-argile-keto", name: "Vase d’argile Kéto", maker: "Terre de Lama", location: "Abomey", price: 24000, rating: 4.8, reviews: 29, category: "Art & culture", tag: "Pièce unique", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=76" },
  { slug: "tissu-indigo-ganvie", name: "Tissu indigo Ganvié", maker: "Les mains bleues", location: "Sô-Ava", price: 15500, rating: 4.9, reviews: 66, category: "Mode & textile", tag: "Teinture naturelle", image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=900&q=76" },
];

export const formatXof = (value: number) => `${new Intl.NumberFormat("fr-FR").format(value)} F`;
