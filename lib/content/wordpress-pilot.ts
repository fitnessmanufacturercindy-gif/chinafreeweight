import { getPostBySlug } from "../../app/resources/blogData";
import { getDumbbellProduct } from "../../app/products/dumbbells/productData";
import { getWeightPlateProduct } from "../../app/products/weight-plates/productData";
import { getGymAccessoryProduct } from "../../app/products/gym-accessories/productData";
import { getCmsEntries, type CmsKind } from "./wordpress";

const existingProduct = {
  dumbbells: getDumbbellProduct,
  "weight-plates": getWeightPlateProduct,
  "gym-accessories": getGymAccessoryProduct,
};

export async function listCmsPilot(kind: CmsKind) {
  const entries = await getCmsEntries(kind);
  return entries.filter((entry) => entry.category
    ? !existingProduct[entry.category](entry.slug)
    : !getPostBySlug(entry.slug));
}
