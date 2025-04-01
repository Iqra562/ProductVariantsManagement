import React, { useContext, useEffect, useState } from 'react'
import VariantsCombinationContext from '../../context/VariantsCombinationContextProvider';
function ProductVariantsCombination(){
    const {variantsCombination, setVariantsCombination} =useContext(VariantsCombinationContext); 
    const getAllValues = variantsCombination.map(variant => variant.values);
    const [variantCombination,setVariantCombination] = useState([])
    
    useEffect(()=>{
        const combination =    getAllValues.reduce((a, b) => a.reduce((r, v) => r.concat(b.map(w => [].concat(v, w))), []));
        setVariantCombination(combination)
        console.log(variantCombination)
    },[variantsCombination])
    return(<>
    <div className='my-10 px-4'>
{variantCombination.map((values)=>{
    console.log(values,'v')
    return (
        <div className='border border-gray-300 p-5 rounded-md flex justify-between'>
        <div className='flex space-x-4'>
          {values.map((value)=>(
          <div className='bg-gray-300 px-2 py-1 text-gray-700 rounded capitalize text-sm'> {value}</div>
          ))}
            
        </div>
        <button className='bg-red-600 text-white px-2 py-1 rounded text-sm'>Remove</button>
      </div>
    )
 
})}
      
    </div>
    </>)
}
export default ProductVariantsCombination;