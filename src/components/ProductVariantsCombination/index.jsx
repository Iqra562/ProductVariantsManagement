import React, { useContext, useEffect, useState } from 'react'
import VariantsCombinationContext from '../../context/VariantsCombinationContextProvider';
function ProductVariantsCombination(){
    const {variantsCombination } =useContext(VariantsCombinationContext); 
    const getAllValues = variantsCombination.map(variant => variant.values).filter(values => values.length > 0); ;
    // const [variantCombination,setVariantCombination] =  useState(() => {
    //     const savedVariants = localStorage.getItem("combination");
    //     return savedVariants ? JSON.parse(savedVariants) : [];
    //   });
    const [variantCombination,setVariantCombination] =  useState([]);
    
    
    useEffect(()=>{
        const combination =  getAllValues.length >0 &&   getAllValues.reduce((a, b) =>  a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))), []))  ;
        setVariantCombination(combination)
        console.log(variantCombination)
    // localStorage.setItem("combination", JSON.stringify(combination));
        
// console.log(getAllValues)
    },[variantsCombination])
    return(<>
    <div className='my-10 px-4'>
 { variantCombination && ( variantCombination.map((values)=>{
     const convertedValues = Array.isArray(values) ? values : [values];
    console.log(values,'v')
    return (
        <div className='border border-gray-300 p-5 rounded-md flex justify-between'>
        <div className='flex space-x-4'>
          {convertedValues.map((value)=>(
          <div className='bg-gray-300 px-2 py-1 text-gray-700 rounded capitalize text-sm'> {value}</div>
          ))}
            
        </div>
        <button className='bg-red-600 text-white px-2 py-1 rounded text-sm'>Remove</button>
      </div>
    )
 
}))}
      
    </div>
    </>)
}
export default ProductVariantsCombination;