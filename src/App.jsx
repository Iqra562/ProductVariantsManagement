import AddProductVariantsForm from "./components/AddProductVariantsForm/AddProductVariantsForm";
import FetchProductVariant from "./components/FetchProductVariant/FetchProductVariant";
import { ProductContextProvider } from "./context/productContextProvider";
export default function App() {
  return (
   <>
   <ProductContextProvider>

 <div className="max-w-5xl mx-auto">

   <AddProductVariantsForm/>
   <FetchProductVariant/>
 </div>
   </ProductContextProvider>

    </>
  )
}