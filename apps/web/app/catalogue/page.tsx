"use client";

import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { StoreHeader } from "@/components/store-header";
import { catalog } from "@/lib/catalog";

const categories = ["Tout", "Mode & textile", "Maison", "Beauté", "Épicerie", "Art & culture"];

export default function CatalogPage() {
  const [category, setCategory] = useState("Tout");
  const [sort, setSort] = useState("featured");
  const products = useMemo(() => {
    const result = category === "Tout" ? [...catalog] : catalog.filter((product) => product.category === category);
    return result.sort((a,b) => sort === "low" ? a.price-b.price : sort === "high" ? b.price-a.price : b.rating-a.rating);
  }, [category, sort]);
  return <div><StoreHeader/><main className="catalog-page"><div className="catalog-intro"><p className="eyebrow">Marché Gbéto</p><h1>Des objets qui portent<br/><em>une histoire.</em></h1><p>Chaque achat soutient directement un vendeur et un savoir-faire local.</p></div><div className="catalog-toolbar"><div className="category-tabs" role="tablist" aria-label="Filtrer par catégorie">{categories.map((item)=><button role="tab" aria-selected={category===item} className={category===item?"selected":""} onClick={()=>setCategory(item)} key={item}>{item}</button>)}</div><label className="sort-select"><SlidersHorizontal/><span className="sr-only">Trier</span><select value={sort} onChange={(event)=>setSort(event.target.value)}><option value="featured">Recommandés</option><option value="low">Prix croissant</option><option value="high">Prix décroissant</option></select><ChevronDown/></label></div><div className="catalog-count"><span>{products.length} produits</span><span>Vendeurs vérifiés uniquement</span></div><div className="product-grid catalog-grid">{products.map((product)=><ProductCard key={product.slug} product={product}/>)}</div></main></div>;
}
