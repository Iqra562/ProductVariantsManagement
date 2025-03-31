import AddProductVariantsForm from "./components/AddProductVariantsForm";
import  CreateVariantCombination from './components/CreateVariantCombination'
import { ProductContextProvider } from "./context/productContextProvider";
import { VariantsCombinationContextProvider } from "./context/VariantsCombinationContextProvider";
export default function App() {
  return (
   <>
   <ProductContextProvider>
    <VariantsCombinationContextProvider>

 <div className="max-w-5xl mx-auto">

   <AddProductVariantsForm/>
   <CreateVariantCombination/>

 </div>
    </VariantsCombinationContextProvider>
   </ProductContextProvider>

    </>
  )
}