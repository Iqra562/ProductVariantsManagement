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
      
      const handleChange = (event) => {
        setSelectedValues(event.target.value);
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

    <div>
        <div className='flex flex-col'>
            <label className='text-gray-500 ' >Color</label>
    <Select
        multiple
        value={selectedValues}
        onChange={handleChange}
        renderValue={(selected) => (
          <div>
            {selected.map((value) => (
                
              <Chip key={value} label={value} style={{ margin: 2 }} />
                
            ))}
          </div>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      </div>
      </div>
</div>
</>
    )
}