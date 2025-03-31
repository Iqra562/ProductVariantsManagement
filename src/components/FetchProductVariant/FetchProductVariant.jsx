import React, { useState } from 'react'

export default function FetchProductVariant(){
     const [variants, setVariants] = useState(() => {
        const savedVariants = localStorage.getItem("variants");
        return savedVariants
          ? JSON.parse(savedVariants)
          : [{ variantsName: "", values: [] }];
      });
      console.log(variants)
    return(
<>
<div className="mt-10 shadow-md shadow-gray-300 pb-2 px-5 rounded-lg ">
    j
</div>
</>
    )
}