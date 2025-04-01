import React, { useContext, useState } from 'react'
import VariantsCombinationContext from '../../context/VariantsCombinationContextProvider';
import ProductVariantContext from '../../context/ProductContextProvider';
import { Select, MenuItem, InputLabel, FormControl, Chip } from "@mui/material";
export default function CreateVariantCombination(){
    const {variantsContext} =useContext(ProductVariantContext); 
      const {variantsCombination, setVariantsCombination} =useContext(VariantsCombinationContext); 
      const [selectedValues, setSelectedValues] = useState([]);

      const options = ["Red", "Green", "Yellow", "Blue", "Black"]; // Example values
    
      const handleShowSelectedVariantValues = (checkedVariantName) => {
        console.log(checkedVariantName)
        setVariantsCombination((prevValues) => {
            const updatedVariants = [...prevValues]
          // check  variant for combination  exists
          const existingVariant = prevValues.find(v => v.variantName === checkedVariantName);
          
          
          if (!existingVariant) {
            // if not, add  with empty values
            return [...prevValues, { variantName: checkedVariantName, values: [] }];
          } else {
            // if exists, remove the value
            return prevValues.filter(v => v.variantName !== checkedVariantName);
          }
        });
      };
      // filter data to get checked product variants values
      const filterDataFromVariantsContext = variantsContext.filter(productVariants => variantsCombination.find( value => value.variantName === productVariants.variantsName));
      const handleChangeVariantValues = (event, variantNameToUpdate) => {
        const selectedValue = event.target.value;
        
        const valueToAdd = selectedValue[0];
      
        if (!valueToAdd) return;
      
        console.log(selectedValue, "c"); 
      
        setVariantsCombination((prevValues) => {
          const updatedValues = [...prevValues];
      
          const getObject = updatedValues.find(value => value.variantName === variantNameToUpdate);
          getObject.values = selectedValue;
      
          
      
          return updatedValues;
        });
      };
      
      
    return(
<>
<div className="mt-10  pb-2 px-5 rounded-lg ">
    <div className='flex justify-center space-x-4'>
        {variantsContext.map((productVariantValues,)=>(
        <div className='flex space-x-2'>
        <input 
            type="checkbox" 
            checked={variantsCombination.some(value => value.variantName === productVariantValues.variantsName)}

            onChange={() => handleShowSelectedVariantValues(productVariantValues.variantsName)}
          />
          <label className='text-xl text-gray-500 capitalize'>{productVariantValues.variantsName}</label>
        </div>
        ))
      }
    </div>

    <div className='space-y-5'>
      { filterDataFromVariantsContext.map((variants,index)=>(

      
        <div key={index} className='flex flex-col'>
            <label className='text-gray-500 ' > {variants.variantsName}</label>
    <Select
        multiple
        value={variantsCombination.find(v => v.variantName === variants.variantsName)?.values || []}
        // value={['h','i']}
        onChange={(event)=>handleChangeVariantValues(event,variants.variantsName)}
        renderValue={() => (
          <div>
        {variantsCombination
  .filter(variant => variant.variantName === variants.variantsName) // Filter to get the matching variant
  .map((variant, index) => {
    // console.log(variant); // Check the structure of variant object
    return variant.values.map((value, idx) => (
      <Chip key={idx} label={value} style={{ margin: 2 }} />
    ));
  })}


          </div>
        )}
      >
        {variants.values.map((option) => (
          <MenuItem key={option} value={option} onClick={(event)=>handleChangeVariantValues(event,option)}>
            {option}
          </MenuItem>
        ))}
      </Select>
      </div>
      ))
}
      </div>
</div>
</>
    )
}