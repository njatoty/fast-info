import { demoProductCategories, demoProducts } from "@/lib/demo/fixtures";
import { mapProduct, type ProductRow } from "@/lib/data/mappers";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/types/domain";

const PRODUCT_SELECT = "*, category:product_categories(*), images:product_images(*)";

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return demoProducts.filter((p) => p.isFeatured).slice(0, limit);
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("position")
    .limit(limit);

  if (error) throw error;
  return ((data ?? []) as unknown as ProductRow[]).map(mapProduct);
}

export async function getProducts(options?: { categorySlug?: string }): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    let items = demoProducts;
    if (options?.categorySlug) {
      items = items.filter((p) => p.category?.slug === options.categorySlug);
    }
    return items;
  }

  const supabase = await createClient();
  let query = supabase.from("products").select(PRODUCT_SELECT).eq("is_published", true);

  if (options?.categorySlug) {
    const { data: category } = await supabase
      .from("product_categories")
      .select("id")
      .eq("slug", options.categorySlug)
      .single();
    if (!category) return [];
    query = query.eq("category_id", category.id);
  }

  const { data, error } = await query.order("position");
  if (error) throw error;
  return ((data ?? []) as unknown as ProductRow[]).map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    return demoProducts.find((p) => p.slug === slug) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) throw error;
  return data ? mapProduct(data as unknown as ProductRow) : null;
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return demoProducts
      .filter((p) => p.id !== product.id && p.category?.id === product.category?.id)
      .slice(0, limit);
  }

  if (!product.category) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_published", true)
    .eq("category_id", product.category.id)
    .neq("id", product.id)
    .order("position")
    .limit(limit);

  if (error) throw error;
  return ((data ?? []) as unknown as ProductRow[]).map(mapProduct);
}

/** Admin views need every product regardless of publish state; RLS still
 * scopes writes, this just skips the public `is_published` filter. */
export async function getAllProductsAdmin(): Promise<Product[]> {
  if (!isSupabaseConfigured) return demoProducts;

  const supabase = await createClient();
  const { data, error } = await supabase.from("products").select(PRODUCT_SELECT).order("position");
  if (error) throw error;
  return ((data ?? []) as unknown as ProductRow[]).map(mapProduct);
}

export async function getProductByIdAdmin(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    return demoProducts.find((p) => p.id === id) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapProduct(data as unknown as ProductRow) : null;
}

export async function getProductCategories() {
  if (!isSupabaseConfigured) return demoProductCategories;

  const supabase = await createClient();
  const { data, error } = await supabase.from("product_categories").select("*").order("position");
  if (error) throw error;
  return data.map((row) => ({ id: row.id, name: row.name, slug: row.slug, position: row.position }));
}
