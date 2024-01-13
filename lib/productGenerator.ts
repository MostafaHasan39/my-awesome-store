import { mediaGallery } from "../constants";
import { Product } from "@/types";

const generateRandonNumber = (
  min: number,
  max: number,
  excluded: number[]
): number => {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  if (excluded.includes(random)) {
    return generateRandonNumber(min, max, excluded);
  } else {
    return random;
  }
};

const generateRandomText = (length: number) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return result;
};

export const genrateProducts = (count: number): Product[] => {
  const products = [];
  const ids: number[] = [];
  for (let i = 0; i < count; i++) {
    products.push({
      id: generateRandonNumber(1, 1000, ids),
      name: generateRandomText(6) + " " + generateRandomText(8),
      description: generateRandomText(200),
      price: generateRandonNumber(50, 800, []),
      image: mediaGallery[generateRandonNumber(0, 5, [])], // Only 6 images are available
      mediaGallery,
    });
  }
  return products;
};
