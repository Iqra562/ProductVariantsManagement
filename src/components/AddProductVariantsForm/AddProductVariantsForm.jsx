import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosAdd } from "react-icons/io";

export default function AddProductVariantsForm(){
    const [variantNumber, setVariantNumber] = useState(2);
    const [variants, setVariants] = useState(() => {
        const savedVariants = localStorage.getItem("variants");
        return savedVariants ? JSON.parse(savedVariants) : [];
    });

    const handleProductVariant = (e, index) => {
        const variantName = e.target.value;

        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];

            if (!updatedVariants[index]) {
                updatedVariants[index] = { [variantName]: [] };
            } else {
                const oldKey = Object.keys(updatedVariants[index])[0];
                updatedVariants[index] = { [variantName]: updatedVariants[index][oldKey] || [] };
            }

            localStorage.setItem("variants", JSON.stringify(updatedVariants));

            return updatedVariants;
        });
    };

    // update local storage when variants change
    useEffect(() => {
        localStorage.setItem("variants", JSON.stringify(variants));
    }, [variants]);
    return(
      <div className="mt-10 shadow-md shadow-gray-300 pb-2 px-5 rounded-lg ">
<h1 className="font-bold text-2xl">Product Variants</h1>
<div>
    {Array.from({length:variantNumber},(_,index)=>(

        <div className=" flex  space-x-2 my-4" key={index}>
    <div className="flex flex-col w-full">
        <label className="text-gray-500 ">Variant Name</label>
        <input type="text" placeholder="e.g Color" className=" outline-none border border-slate-400 rounded-md h-10 px-2 w-full"  onChange={(e)=>handleProductVariant(e,index)}/>
    </div>
    <div className="flex flex-col w-full">
        <label className="text-gray-500 ">Status</label>
      <select name="cars" id="cars" className=" outline-none border border-slate-400 rounded-md h-10 px-2 w-full" >
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
 
</select>
    </div>
      <div className="flex flex-col w-full ">
        <label className="text-gray-500 ">Variant Value</label>
        <div className="flex items-start space-x-2">
        <div className="grid grid-cols-3 gap-1 w-full ">
  <div className="flex justify-around p-2 bg-gray-200 rounded-full">
    <p className="text-sm">red</p>
    <button className="text-red-700">
      <RxCross2 className="text-sm" />
    </button>
  </div>
  <div className="flex p-2 bg-gray-200 rounded-full">
    <p className="text-sm">red</p>
    <button className="text-red-700">
      <RxCross2 className="text-sm" />
    </button>
  </div>
  <div className="flex p-2 bg-gray-200 rounded-full">
    <p className="text-sm">red</p>
    <button className="text-red-700">
      <RxCross2 className="text-sm" />
    </button>
  </div>
  <div className="flex p-2 bg-gray-200 rounded-full">
    <p className="text-sm">red</p>
    <button className="text-red-700">
      <RxCross2 className="text-sm" />
    </button>
  </div>
  



</div>
<div className="relative  ">
  <input
    type="text"
    placeholder="Add value"
    className="outline-none border border-slate-400 rounded-md h-10 px-2 w-full"
  />
  <button className="absolute top-1/3 right-3  flex items-center">
    <IoIosAdd />
  </button>
</div>

  


    </div>
    </div>
     <div className="flex  w-4/12 mt-6">

        <button className="text-white bg-black  rounded h-10 w-full" >Remove</button>
     </div>
</div>
 ))}
<button className="text-white bg-black  px-4 py-2 rounded-lg  ">Add Variant</button>
</div>


      </div>
    )
}