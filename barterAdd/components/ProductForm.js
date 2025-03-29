import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useContract } from "@/contract/hooks/useContract";
import addProduct from "@/contract/services/AddProducts";
import { useEffect, useState } from "react";
import useUpload from "@/hooks/usePinata";


export default function ProductForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        type: "",
        condition: "new",
        image: null,
        stock: 1
    });

    const [executeTransaction, setExecuteTransaction] = useState(null);
    const [transactionError, setTransactionError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        const fetchContractFunction = async () => {
            const contractFunction = await useContract({
                functionName: "addProduct",
            });
            setExecuteTransaction(() => contractFunction);
        };

        fetchContractFunction();
    }, []);

    // const callContractFunction = async () => {
    //     if (!executeTransaction) {
    //         console.error("Contract function is not available yet.");
    //         return;
    //     }

    //     //     Price,
    //     //   Stock,
    //     //   ProductName,
    //     //   ProductImage,
    //     //   ProductDescription,
    //     //   ProductType,
    //     //   ProductCondition

    //     await addProduct(
    //         executeTransaction, // shoukd not change this
    //         (formData.price).toString(), //change this with correct state variables
    //         formData.stock, //change this with correct state variables
    //         formData.name, //change this with correct state variables
    //         formData.image, //change this with correct state variables
    //         formData.description, //change this with correct state variables
    //         formData.type, //change this with correct state variables
    //         formData.condition //change this with correct state variables
    //     );
    // };

    const callContractFunction = async () => {
        if (!executeTransaction) {
            setTransactionError("Contract connection not initialized");
            return;
        }

        setTransactionError(null); // Reset error
        setIsSubmitting(true); // Start loading

        try {
            await addProduct(
                executeTransaction,
                formData.price.toString(),
                formData.stock,
                formData.name,
                formData.image,
                formData.description,
                formData.type,
                formData.condition
            );
        } catch (error) {
            // Handle user cancellation
            if (error.code === 4001 || error.code === 4100) { // MetaMask error codes
                setTransactionError("Transaction canceled by user");
            } else if (error.message?.includes("user rejected transaction")) {
                setTransactionError("You rejected the transaction");
            } else {
                setTransactionError(error.message || "Transaction failed");
            }
            console.error("Transaction error:", error);
        } finally {
            setIsSubmitting(false); // Stop loading
        }
    };

    const renderError = () => {
        if (!transactionError) return null;
        return (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-400/30 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 mt-1" />
                <div className="text-red-300 text-sm">
                    {transactionError}
                </div>
            </div>
        );
    };

    // Update the submit button
    <button
        type="button"
        onClick={callContractFunction}
        disabled={isSubmitting}
        className={`w-full py-4 bg-gradient-to-r from-lime-400 to-green-500 rounded-xl
            hover:from-lime-300 hover:to-green-400 hover:shadow-[0_0_30px_-5px_rgba(132,255,0,0.4)]
            active:scale-95 transition-all duration-300 font-bold text-black
            flex items-center justify-center gap-2
            ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
    >
        {isSubmitting ? (
            <div className="flex items-center gap-2">
                <div className="h-5 w-5 border-2 border-lime-700 border-t-lime-400 rounded-full animate-spin" />
                Processing...
            </div>
        ) : (
            <>
                <span className="text-xl">+</span>
                ADD PRODUCT
            </>
        )}
    </button>

    // Add the error display after the button
    {renderError()}


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const uploadResult = await useUpload(e.target.files[0]);
            if (uploadResult.success) {
                setFormData(prev => ({
                    ...prev,
                    image: uploadResult.imageUrl
                }));
            } else {
                console.error("Upload failed:", uploadResult.error);
            }
        }
    };


    return (
        // <div className="max-w-full font-mono mx-auto p-10 bg-white/10 backdrop-blur-lg text-white rounded-2xl shadow-lg">

        //     <div className="mb-10">
        //         <Card className="flex items-start gap-4 bg-zinc-900 p-4">
        //             <div className="mt-1 flex-shrink-0">
        //                 <AlertTriangle className="h-8 w-8 text-red-500" />
        //             </div>
        //             <div className="text-gray-300">
        //                 Keep Your Dashboard Secure! Unauthorized access can lead to malicious listings
        //                 or unwanted products under your account. Protect your assets—never share your
        //                 credentials!
        //             </div>
        //         </Card>
        //     </div>
        //     <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

        //     <form  className="space-y-4">
        //         <div>
        //             <label className="block text-gray-300 text-sm font-medium mb-1">
        //                 Product Name
        //             </label>
        //             <input
        //                 type="text"
        //                 name="name"
        //                 value={formData.name}
        //                 onChange={handleInputChange}
        //                 className="w-full px-4 py-2 bg-[#535353] border border-gray-600 rounded-md focus:ring-2 focus:ring-gray-500 text-white"
        //                 required
        //             />
        //         </div>

        //         <div>
        //             <label className="block text-gray-300 text-sm font-medium mb-1">
        //                 Price in BTX
        //             </label>
        //             <input
        //                 type="number"
        //                 name="price"
        //                 value={formData.price}
        //                 onChange={handleInputChange}
        //                 className="w-full px-4 py-2 bg-[#535353] border border-gray-600 rounded-md focus:ring-2 focus:ring-gray-500 text-white"
        //                 required
        //             />
        //         </div>

        //         <div>
        //             <label className="block text-gray-300 text-sm font-medium mb-1">
        //                 Description
        //             </label>
        //             <textarea
        //                 name="description"
        //                 value={formData.description}
        //                 onChange={handleInputChange}
        //                 className="w-full px-4 py-2 bg-[#535353] border border-gray-600 rounded-md focus:ring-2 focus:ring-gray-500 text-white h-24"
        //                 required
        //             />
        //         </div>

        //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        //             {/* Product Type */}
        //             <div>
        //                 <label className="block text-gray-300 text-sm font-medium mb-1">
        //                     Type
        //                 </label>
        //                 <input
        //                     type="text"
        //                     name="type"
        //                     value={formData.type}
        //                     onChange={handleInputChange}
        //                     // className="w-full px-4 py-2 bg-[#535353] border border-lime-600 rounded-md focus:ring-2 focus:ring-lime-500 text-white"
        //                     className="w-full px-4 py-2 bg-[#535353] border border-lime-600 rounded-md focus:bg-lime-700 focus:ring-2 focus:ring-lime-500 text-white transition-colors duration-300"

        //                     required
        //                 />
        //             </div>

        //             {/* Condition */}
        //             <div>
        //                 <label className="block text-gray-300 text-sm font-medium mb-1">
        //                     Condition
        //                 </label>
        //                 <select
        //                     name="condition"
        //                     value={formData.condition}
        //                     onChange={handleInputChange}
        //                     // className="w-full px-4 py-2 bg-[#535353] border border-gray-600 rounded-md focus:ring-2 focus:ring-gray-500 text-white"
        //                     className="w-full px-4 py-2 bg-[#535353] border border-lime-600 rounded-md focus:bg-lime-700 focus:ring-2 focus:ring-lime-500 text-white transition-colors duration-300"

        //                 >
        //                     <option value="new">New</option>
        //                     <option value="used">Used</option>
        //                     <option value="refurbished">Refurbished</option>
        //                 </select>
        //             </div>

        //             {/* Upload */}
        //             <div>
        //                 <label className="block text-gray-300 text-sm font-medium mb-1">
        //                     Upload
        //                 </label>
        //                 <input
        //                     type="file"
        //                     onChange={handleFileChange}
        //                     className="w-full px-4 py-2 bg-[#535353] border border-gray-600 rounded-md text-white"
        //                     accept="image/*"
        //                 />
        //             </div>

        //             <div>
        //                 <label className="block text-gray-300 text-sm font-medium mb-1">
        //                     stock
        //                 </label>
        //                 <input
        //                     type="Number"
        //                     onChange={handleInputChange}
        //                     className="w-full px-4 py-2 bg-[#535353] border border-gray-600 rounded-md text-white"
        //                 />
        //             </div>

        //             {/* Submit Button */}
        //         </div>
        //             <div className="flex items-end">
        //                 <button
        //                     type="button"
        //                     onClick={callContractFunction}
        //                     className="w-full bg-lime-500 hover:bg-lime-400 cursor-pointer text-white font-bold py-2 px-4 rounded-full"
        //                 >
        //                     Add
        //                 </button>
        //             </div>
        //     </form>
        // </div>
        <div className="max-w-full font-mono mx-auto p-10 bg-black/60 backdrop-blur-2xl border border-lime-400/30 rounded-2xl shadow-2xl shadow-lime-400/10 -z-1">
            <div className="mb-10">
                <Card className="flex items-start gap-4 bg-gradient-to-br from-red-900/80 to-red-800/50 p-4 border border-red-400/30">
                    <div className="mt-1 flex-shrink-0 animate-pulse">
                        <AlertTriangle className="h-8 w-8 text-red-400" />
                    </div>
                    <div className="text-gray-200">
                        <h3 className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent text-lg font-bold mb-2">
                            SECURITY ALERT
                        </h3>
                        Unauthorized access may lead to compromised listings.
                        <span className="text-red-300 font-medium">Keep Your Dashboard Secure! Unauthorized access can lead to malicious listings or unwanted products under your account. Protect your assets—never share your credentials!</span>
                    </div>
                </Card>
            </div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-transparent mb-8">
                ADD PRODUCT
            </h2>

            <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    {/* Product Name */}
                    <div className="group">
                        <label className="block text-lime-300 text-sm font-medium mb-2 tracking-wider">
                            PRODUCT NAME
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 bg-black/40 border-2 border-lime-400/50 rounded-xl 
                             focus:border-lime-400 focus:bg-black/60 focus:ring-4 focus:ring-lime-400/20
                             hover:border-lime-400/80 transition-all duration-300 text-lime-200
                             placeholder:text-lime-400/50"
                            placeholder="ENTER PRODUCT NAME"
                            required
                        />
                    </div>

                    {/* Price Input */}
                    <div className="group relative">
                        <label className="block text-lime-300 text-sm font-medium mb-2 tracking-wider">
                            PRICE (BTX)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full px-5 py-3 bg-black/40 border-2 border-lime-400/50 rounded-xl 
                                 focus:border-lime-400 focus:bg-black/60 focus:ring-4 focus:ring-lime-400/20
                                 hover:border-lime-400/80 transition-all duration-300 text-lime-200
                                 placeholder:text-lime-400/50 pr-16"
                                placeholder="0.00"
                                required
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lime-400/80 font-mono">
                                BTX
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="group">
                        <label className="block text-lime-300 text-sm font-medium mb-2 tracking-wider">
                            DESCRIPTION
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full px-5 py-3 bg-black/40 border-2 border-lime-400/50 rounded-xl 
                             focus:border-lime-400 focus:bg-black/60 focus:ring-4 focus:ring-lime-400/20
                             hover:border-lime-400/80 transition-all duration-300 text-lime-200
                             placeholder:text-lime-400/50 h-32 resize-none"
                            placeholder="DESCRIBE YOUR PRODUCT..."
                            required
                        />
                    </div>

                    {/* Grid Section */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Product Type */}
                        <div className="group">
                            <label className="block text-lime-300 text-sm font-medium mb-2 tracking-wider">
                                TYPE
                            </label>
                            <input
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-black/40 border-2 border-lime-400/50 rounded-xl 
                                 focus:border-lime-400 focus:bg-black/60 focus:ring-4 focus:ring-lime-400/20
                                 hover:border-lime-400/80 transition-all duration-300 text-lime-200
                                 placeholder:text-lime-400/50"
                                placeholder="CATEGORY"
                                required
                            />
                        </div>

                        {/* Condition */}
                        <div className="group">
                            <label className="block text-lime-300 text-sm font-medium mb-2 tracking-wider">
                                CONDITION
                            </label>
                            <select
                                name="condition"
                                value={formData.condition}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-black/40 border-2 border-lime-400/50 rounded-xl 
                                 focus:border-lime-400 focus:bg-black/60 focus:ring-4 focus:ring-lime-400/20
                                 hover:border-lime-400/80 transition-all duration-300 text-lime-200
                                 appearance-none"
                            >
                                <option value="new" className="bg-black">NEW</option>
                                <option value="used" className="bg-black">USED</option>
                                <option value="refurbished" className="bg-black">REFURBISHED</option>
                            </select>
                        </div>

                        {/* Upload */}
                        <div className="group">
                            <label className="block text-lime-300 text-sm font-medium mb-2 tracking-wider">
                                UPLOAD IMAGE
                            </label>
                            <div className="relative border-2 border-lime-400/50 rounded-xl hover:border-lime-400/80 transition-all duration-300">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="opacity-0 absolute w-full h-full cursor-pointer"
                                    accept="image/*"
                                />
                                <div className="px-4 py-3 text-lime-400/80 hover:text-lime-300 transition-colors">
                                    {formData.image ? 'IMAGE SELECTED' : 'CLICK TO UPLOAD'}
                                </div>
                            </div>
                        </div>

                        {/* Stock */}
                        <div className="group">
                            <label className="block text-lime-300 text-sm font-medium mb-2 tracking-wider">
                                STOCK
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-black/40 border-2 border-lime-400/50 rounded-xl 
                                 focus:border-lime-400 focus:bg-black/60 focus:ring-4 focus:ring-lime-400/20
                                 hover:border-lime-400/80 transition-all duration-300 text-lime-200
                                 placeholder:text-lime-400/50"
                                placeholder="QTY"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8">
                        <button
                            type="button"
                            onClick={callContractFunction}
                            className="w-full py-4 bg-lime-600 rounded-xl cursor-pointer
                             hover:from-lime-300 hover:to-green-400 hover:shadow-[0_0_30px_-5px_rgba(132,255,0,0.4)]
                             active:scale-95 transition-all duration-300 font-bold text-black
                             flex items-center justify-center gap-2"
                        >
                            <span className="text-xl">+</span>
                            ADD PRODUCT
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}