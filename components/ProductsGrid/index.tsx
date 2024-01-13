"use client";
import { useState, FC } from "react";
import s from "./ProductsGrid.module.scss";
import { IProductsCollection } from "@/types";
import cn from "classnames";
import ProductCard from "../ProductCard";

interface IProductsGridProps {
  productsCollections: IProductsCollection[];
}

const ProductsGrid: FC<IProductsGridProps> = ({ productsCollections }) => {
  const [currentCollection, setCurrentCollection] = useState(
    productsCollections[0]
  );
  return (
    <section className={s.root}>
      <h2>Trending Products</h2>
      <ul>
        {productsCollections.map((collection, index) => {
          return (
            <li
              key={index}
              className={cn(s.option, {
                [s.option__active]: collection.id === currentCollection.id,
              })}
              onClick={() => setCurrentCollection(collection)}
            >
              {collection.label}
            </li>
          );
        })}
      </ul>
      <div className={s.productsContainer}>
        {currentCollection.products.map((product, index) => {
          return <ProductCard product={product} key={index} shouldAnimate />;
        })}
      </div>
    </section>
  );
};
export default ProductsGrid;
