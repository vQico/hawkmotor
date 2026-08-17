import db from '@/lib/db';
import { getAdminMotorcycles, getAdminSpareParts, getAdminCategories } from '@/app/actions/adminActions';
import ProductsClient from './ProductsClient';

export default async function AdminProductsPage() {
  // Query all data in parallel
  const [motors, parts, categories] = await Promise.all([
    getAdminMotorcycles(),
    getAdminSpareParts(),
    getAdminCategories()
  ]);

  const brands = await db.brand.findMany({
    include: { models: true },
    orderBy: { name: 'asc' }
  });

  return (
    <ProductsClient
      initialMotors={motors}
      initialParts={parts}
      categories={categories}
      brands={brands}
    />
  );
}
