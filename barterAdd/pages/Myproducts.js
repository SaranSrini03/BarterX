"use client";

import { AddressFetcher } from "@/components/Connect";
import { useContract } from "@/contract/hooks/useContract";
import { useInstance } from "@/contract/hooks/useInstance";
import { useEffect, useState } from "react";

export default function GetMyProducts() {
  const [executeTransaction, setExecuteTransaction] = useState(null);
  const [product, setProduct] = useState([]);
  const [Count, setCount] = useState(null);
  const address = AddressFetcher();

  useEffect(() => {
    const fetchContractFunction = async () => {
      const contractFunction = await useContract({
        functionName: "getProduct",
      });
      setExecuteTransaction(() => contractFunction);
    };

    fetchContractFunction();
  }, []);

  useEffect(() => {
    const ProductCount = async () => {
      const contract = await useInstance();
      const res = Number(await contract.ProductCount());
      setCount(res);
    };
    ProductCount();
  }, []);

  const callContractFunction = async () => {
    if (!executeTransaction) {
      console.error("Contract function is not available yet.");
      return;
    }

    const fetchedProducts = [];

    for (let i = 1; i <= Count; i++) {
      try {
        const allproduct = await executeTransaction(i);
        if (allproduct && allproduct[7] === address) {
          fetchedProducts.push(allproduct);
        }
      } catch (error) {
        console.error(`Error fetching product ID ${i}:`, error);
      }
    }

    setProduct(fetchedProducts);
    console.log(fetchedProducts);
  };

  return (
    // card like ui by mapping the product array
    // example
    // const productData = Product.map((productProxy, i) => ({
    //       description: productProxy.Description,
    //       stock: productProxy.Stock,
    //       title: productProxy.Title,
    //       price: productProxy.Price.toString(),
    //       address: productProxy.Farmer,
    //       ProductType: productProxy.TypeOfProduct,
    //       stockleft: productProxy.StockLeft,
    //       image: productProxy.Image,
    //       productId: productProxy.id || i,
    //     }));
    <div>
      {product}
      <button onClick={callContractFunction} disabled={!executeTransaction}>
        get My Products
      </button>
    </div>
  );
}
