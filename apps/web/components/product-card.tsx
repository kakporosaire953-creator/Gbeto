import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Heart, Star } from "lucide-react";
import { formatXof, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card"><div className="product-image"><Link href={`/produit/${product.slug}`}><Image fill sizes="(max-width: 560px) 50vw, 25vw" src={product.image} alt={product.name}/></Link><span className="tag">{product.tag}</span><button aria-label={`Ajouter ${product.name} aux favoris`}><Heart/></button></div><div className="product-body"><p>{product.maker} · {product.location} <BadgeCheck size={14}/></p><h3><Link href={`/produit/${product.slug}`}>{product.name}</Link></h3><div className="product-meta"><strong>{formatXof(product.price)}</strong><span><Star/> {product.rating} ({product.reviews})</span></div><Link className="add-button link-button" href={`/produit/${product.slug}`}>Voir le produit</Link></div></article>;
}
