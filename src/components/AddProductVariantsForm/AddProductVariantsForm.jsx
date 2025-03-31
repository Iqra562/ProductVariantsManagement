import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosAdd } from "react-icons/io";

export default function AddProductVariantsForm() {
  const [variantValue, setVariantValue] = useState("");
  const [variantValues, setVariantValues] = useState({});
  const [variants, setVariants] = useState(() => {
    const savedVariants = localStorage.getItem("variants");
    return savedVariants
      ? JSON.parse(savedVariants)
      : [{ variantsName: "", values: [] }];
  });
  const handleProductVariant = (e, index) => {
    const variantName = e.target.value;

    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants];

      if (!updatedVariants[index]) {
        updatedVariants[index] = { variantsName: variantName, values: [] };
      } else {
        updatedVariants[index] = {
          ...updatedVariants[index],
          variantsName: variantName,
        };
      }


      return updatedVariants;
    });
  };
  const handleVariantValues = (index) => {
    if (!variantValue[index]) return;

    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants];

      updatedVariants[index] = {
        ...updatedVariants[index],
        values: [...updatedVariants[index].values, variantValue[index]], // Use the correct value to add value for specific variant
      };

      localStorage.setItem("variants", JSON.stringify(updatedVariants));

      return updatedVariants;
    });

    setVariantValue((prevValues) => ({
      ...prevValues,
      [index]: "", // reset input field
    }));
  };

  const addVariantForm = () => {
    setVariants((prevVariants) => {
      const updatedVariants = [
        ...prevVariants,
        { variantsName: "", values: [] },
      ];


      return updatedVariants;
    });
  };
  const handleRemoveVariantValue = (variantIndex,variantValueIndex, valueToRemove) => {
    setVariants((prevVariants) => {  
      const updatedVariants = [...prevVariants];
      updatedVariants[variantIndex] = {
        ...updatedVariants[variantIndex],
        values: updatedVariants[variantIndex].values.filter(
          (value,index) => index !== variantValueIndex
        ),
      };
  
      return updatedVariants;
    });
  };
  const handleRemoveProductVariant = (index) => {
    setVariants((prevVariants) => {
      const updatedVariants = prevVariants.filter((_, i) => i !== index); // remove the variant of index  when user  click on btn which has this  index
      return updatedVariants;
    });
  };
  

  // update local storage when variants change
  useEffect(() => {
    localStorage.setItem("variants", JSON.stringify(variants));
  }, [variants]);
  return (
    <div className="mt-10 shadow-md shadow-gray-300 pb-2 px-5 rounded-lg ">
      <h1 className="font-bold text-2xl">Product Variants</h1>
      <div>
        {variants.map((variant, index) => (
          <div className=" flex  space-x-2 my-4" key={index}>
            <div className="flex flex-col w-full">
              <label className="text-gray-500 ">Variant Name</label>
              <input
                type="text"
                placeholder="e.g Color"
                value={variant.variantsName}
                className=" outline-none border border-slate-400 rounded-md h-10 px-2 w-full"
                onChange={(e) => handleProductVariant(e, index)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-gray-500 ">Status</label>
              <select
                name="cars"
                id="cars"
                className=" outline-none border border-slate-400 rounded-md h-10 px-2 w-full"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex flex-col w-full ">
              <label className="text-gray-500 ">Variant Value</label>
              <div className="flex items-start space-x-2">
                {variant.values.length > 0 && (
                  <div className="flex flex-wrap  gap-1 w-full ">
                    {variant.values.map((eachVariantValues, variantValueIndex) => (
                      <div
                        key={variantValueIndex}
                        className="flex justify-around p-2 bg-gray-200 rounded-full"
                      >
                        <p className="text-sm">{eachVariantValues}</p>
                        <button className="text-red-700" onClick={()=>handleRemoveVariantValue(index,variantValueIndex,eachVariantValues)}>
                          <RxCross2 className="text-sm" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="relative  ">
                  <input
                    type="text"
                    placeholder="Add value"
                    className="outline-none border border-slate-400 rounded-md h-10 px-2 w-full"
                    value={variantValue[index] || ""}
                    onChange={(e) =>
                      setVariantValue((prevValues) => ({
                        ...prevValues,
                        [index]: e.target.value,
                      }))
                    }
                  />
                  <button className="absolute top-1/3 right-3  flex items-center">
                    <IoIosAdd onClick={() => handleVariantValues(index)} />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex  w-4/12 mt-6">
              <button className="text-white bg-black  rounded h-10 w-full" onClick={()=>handleRemoveProductVariant(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          className="text-white bg-black  px-4 py-2 rounded-lg  "
          onClick={addVariantForm}
        >
          Add Variant
        </button>
      </div>
    </div>
  );
}
