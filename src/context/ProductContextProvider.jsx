import React, { createContext, useEffect, useState } from 'react';

const ProductVariantContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [variantsContext, setVariantsContext] = useState(() => {
    const savedVariants = localStorage.getItem("variants");
    return savedVariants ? JSON.parse(savedVariants) : [{ variantsName: "", values: [] }];
  });

  // update localStorage when variantsContext changes
  useEffect(() => {
    localStorage.setItem("variants", JSON.stringify(variantsContext));
  }, [variantsContext]);

  return (
    <ProductVariantContext.Provider value={{ variantsContext, setVariantsContext }}>
      {children}
    </ProductVariantContext.Provider>
  );
};

export default ProductVariantContext;
