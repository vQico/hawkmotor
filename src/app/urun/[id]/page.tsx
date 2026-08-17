import Link from 'next/link';
import { Info } from 'lucide-react';
import { getDbProduct, getDbSiteSettings, getDbMotorcycles, getDbSpareParts } from '@/lib/data';
import ProductDetailClient from './ProductDetailClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const [product, siteConfig] = await Promise.all([
    getDbProduct(id),
    getDbSiteSettings()
  ]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <Info className="w-16 h-16 text-brand-primary mx-auto mb-6 animate-pulse" />
        <h2 className="text-3xl font-bold text-white mb-4">Ürün Bulunamadı</h2>
        <p className="text-brand-muted mb-8">Aradığınız ürün kataloğumuzdan kaldırılmış veya adresi değişmiş olabilir.</p>
        <Link href="/" className="px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-hover text-white font-bold uppercase tracking-wider text-xs">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  // Query similar products based on the product type (Motor vs SparePart)
  let similarProducts: any[] = [];
  try {
    if (product.isMotor) {
      const allMotors = await getDbMotorcycles();
      similarProducts = allMotors.filter((m) => m.id !== product.id).slice(0, 3);
    } else {
      const allParts = await getDbSpareParts();
      similarProducts = allParts.filter((p) => p.id !== product.id).slice(0, 3);
    }
  } catch (err) {
    console.error('Failed to query similar products on server:', err);
  }

  return (
    <ProductDetailClient
      product={product}
      similarProducts={similarProducts}
      siteConfig={siteConfig}
    />
  );
}
