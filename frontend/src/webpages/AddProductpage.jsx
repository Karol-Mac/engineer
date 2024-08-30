import {SellerAccountFunctions} from "../components/functions/SellerAccountFunctions";
import {useState} from "react";
import "../css/AddProductpage.css";
import HeaderSimple from "../components/generic/HeaderSimple";
import Footer from "../components/generic/Footer";

const AddProductpage = () => {
    const {addNewProduct} = SellerAccountFunctions()
    const [newProductData, setNewProductData] = useState({
        productName: "",
        price: "",
        inGrams: false,
        weight: "",
        energeticValue: "",
        fat: "",
        protein: "",
        carbs: "",
        fiber: "",
        salt: "",
    });
    const [newProductImage, setNewProductImage] = useState(null)
    const [responseMessage, setResponseMessage] = useState("");
    const checkForEmptyFields = () => {
        Object.entries(newProductData).forEach(([key,value]) => {
            console.log("signupData:"+ key + " "+ value);
            if(typeof value === "string" && value.trim() === ""){
                setResponseMessage("All fields are required");
                return true;
            }

            if(typeof value === "number" && isNaN(value)){
                setResponseMessage("All fields are required");
                return true;
            }
        })

        if(newProductImage == null){
            setResponseMessage("Product image required");
            return true;
        }

        return false;
    }

    const displaydata = () => { //FOR DEBUG
        Object.entries(newProductData).forEach(([key,value]) => {
            console.log("NEW PRODUCT DATA: [key: "+ key + " : value: "+ value + "]");
        })
    }


    const handleChange = ({ currentTarget: input }) => {
        if(input.type === "checkbox"){
            setNewProductData({ ...newProductData, [input.name]: input.checked });
        } else if(input.type === "number"){
            setNewProductData({ ...newProductData, [input.name]: parseInt(input.value) });
        } else if (input.type === "number" && input.name === "price") {
            setNewProductData({ ...newProductData, [input.name]: parseFloat(input.value).toFixed(2) });
        } else {
            setNewProductData({...newProductData, [input.name]: input.value });
        }
    };

    const handleImageUpload = (uploadEvent) =>{
        const uploadedFile = uploadEvent.target.files[0];

        setNewProductImage(uploadedFile);
    }

    const handleCreateProduct = async (e) => {
        e.preventDefault();

        if(checkForEmptyFields()){
            setResponseMessage("All fields are required");
            return;
        }

        // displaydata();
        const response = await addNewProduct(e, newProductData, newProductImage);

        if(response.success){
            console.log("successfuly added new product");
        }else{
            setResponseMessage(response.message);
            console.log("adding product failed "+response.message);
        }
    }

    return (
        <div>
        <HeaderSimple/>
            <div  className="main-container">
                <div id="productPanel" className="form-container">
                    <form onSubmit={handleCreateProduct} method="post">
                        <div className="form-field">
                            <label htmlFor="productName">Product Name</label>
                            <input
                                type="text"
                                name="productName"
                                onChange={handleChange}
                                value={newProductData.productName}
                                required/>
                            <br/>
                        </div>
                        <div className="form-field">
                        <label htmlFor={"price"}>Price</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0.01"
                            name="price"
                            onChange={handleChange}
                            value={newProductData.price}
                            required/>
                        <br/>
                        </div>
                        <div className="product-form">
                            <label>Weight</label>
                            <div className="weight-container">
                                <input
                                    type="number"
                                    name="weight"
                                    onChange={handleChange}
                                    value={newProductData.weight}
                                    required
                                />
                                <div className="checkbox-container">
                                    <input type="checkbox" id="isGram" name="isGram" />
                                    <label htmlFor="isGram">in grams?</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-field">
                        <label htmlFor={"energeticValue"}>Energetic value</label>
                        <input
                            type="number"
                            min="0"
                            name="energeticValue"
                            onChange={handleChange}
                            value={newProductData.energeticValue}
                            required/>
                        <br/>
                        </div>
                        <div className="form-field">
                        <label htmlFor={"fat"}>Fat</label>
                        <input
                            type="number"
                            min="0"
                            name="fat"
                            onChange={handleChange}
                            value={newProductData.fat}
                            required/>
                        <br/>
                        </div>
                        <div className="form-field">
                        <label htmlFor={"protein"}>Protein</label>
                        <input
                            type="number"
                            min="0"
                            name="protein"
                            onChange={handleChange}
                            value={newProductData.protein}
                            required/>
                        <br/>
                        </div>
                        <div className="form-field">
                        <label htmlFor={"carbs"}>Carbs</label>
                        <input
                            type="number"
                            min="0"
                            name="carbs"
                            onChange={handleChange}
                            value={newProductData.carbs}
                            required/>
                        <br/>
                        </div>
                        <div className="form-field">
                        <label htmlFor={"fiber"}>Fiber</label>
                        <input
                            type="number"
                            min="0"
                            name="fiber"
                            onChange={handleChange}
                            value={newProductData.fiber}
                            required/>
                        <br/>
                        </div>
                        <div className="form-field">
                        <label htmlFor={"salt"}>Salt</label>
                        <input
                            type="number"
                            min="0"
                            name="salt"
                            onChange={handleChange}
                            value={newProductData.salt}
                            required/>
                        <br/>
                        </div>
                        <div className="form-field">
                        <label htmlFor={"productImage"}>Product image</label>
                        <input
                            type="file"
                            name="productImage"
                            accept="image/*"
                            onChange={handleImageUpload}
                            required/>
                        <br/>
                        </div>
                        <input type="submit" value="Submit" />
                        <p>{responseMessage}</p>
                    </form>
                    <p>{responseMessage}</p>
                    </div>
                </div>
            <Footer/>
        </div>
    );
};

export default AddProductpage;