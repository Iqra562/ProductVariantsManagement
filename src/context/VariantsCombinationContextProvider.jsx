import React, { createContext, useEffect, useState } from 'react';

const VariantsCombinationContext = createContext();

export const VariantsCombinationContextProvider = ({ children }) => {
  const [variantsCombination, setVariantsCombination] = useState(() => {
    const savedVariants = localStorage.getItem("variantsCombination");
    return savedVariants ? JSON.parse(savedVariants) :[];
  });

  // update localStorage when variantsCombination changes
  useEffect(() => {
    localStorage.setItem("variantsCombination", JSON.stringify(variantsCombination));
  }, [variantsCombination]);

  return (
    <VariantsCombinationContext.Provider value={{ variantsCombination, setVariantsCombination }}>
      {children}
    </VariantsCombinationContext.Provider>
  );
};

export default VariantsCombinationContext;
