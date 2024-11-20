import { SellerAccountFunctions } from "../components/functions/SellerAccountFunctions";
import { useState } from "react";
import "../css/AddProductpage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderSimple from "../components/generic/HeaderSimple";
import Footer from "../components/generic/Footer";

const AddProductpage = () => {
    const { addNewProduct } = SellerAccountFunctions();
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
    const [newProductImage, setNewProductImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [responseMessage, setResponseMessage] = useState("");

    const checkForEmptyFields = () => {
        for (const [key, value] of Object.entries(newProductData)) {
            if (typeof value === "string" && value.trim() === "") {
                setResponseMessage("All fields are required");
                return true;
            }

            if (typeof value === "number" && isNaN(value)) {
                setResponseMessage("All fields are required");
                return true;
            }
        }

        if (newProductImage == null) {
            setResponseMessage("Product image required");
            return true;
        }

        return false;
    };

    const handleChange = ({ currentTarget: input }) => {
        if (input.type === "checkbox") {
            setNewProductData({ ...newProductData, [input.name]: input.checked });
        } else if (input.type === "number") {
            setNewProductData({ ...newProductData, [input.name]: parseInt(input.value) });
        } else if (input.type === "number" && input.name === "price") {
            setNewProductData({ ...newProductData, [input.name]: parseFloat(input.value).toFixed(2) });
        } else {
            setNewProductData({ ...newProductData, [input.name]: input.value });
        }
    };

    const handleImageUpload = (uploadEvent) => {
        const uploadedFile = uploadEvent.target.files[0];
        setNewProductImage(uploadedFile);
        setImagePreview(URL.createObjectURL(uploadedFile));
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();

        if (checkForEmptyFields()) {
            setResponseMessage("All fields are required");
            return;
        }

        const response = await addNewProduct(e, newProductData, newProductImage);

        if (response.success) {
            console.log("successfully added new product");
        } else {
            setResponseMessage(response.message);
            console.log("adding product failed " + response.message);
        }
    };

    return (
        <div>
            <HeaderSimple />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={handleCreateProduct} method="post">
                            <div className="mb-3">
                                <label htmlFor="productName" className="form-label">Product Name</label>
                                <input
                                    type="text"
                                    name="productName"
                                    onChange={handleChange}
                                    value={newProductData.productName}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    name="price"
                                    onChange={handleChange}
                                    value={newProductData.price}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Weight</label>
                                <div className="d-flex">
                                    <input
                                        type="number"
                                        name="weight"
                                        onChange={handleChange}
                                        value={newProductData.weight}
                                        className="form-control me-2"
                                        required
                                    />
                                    <div className="form-check">
                                        <input type="checkbox" id="isGram" name="isGram" className="form-check-input" />
                                        <label htmlFor="isGram" className="form-check-label">grams?</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="energeticValue" className="form-label">Energetic value</label>
                                <input
                                    type="number"
                                    min="0"
                                    name="energeticValue"
                                    onChange={handleChange}
                                    value={newProductData.energeticValue}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fat" className="form-label">Fat</label>
                                <input
                                    type="number"
                                    min="0"
                                    name="fat"
                                    onChange={handleChange}
                                    value={newProductData.fat}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="protein" className="form-label">Protein</label>
                                <input
                                    type="number"
                                    min="0"
                                    name="protein"
                                    onChange={handleChange}
                                    value={newProductData.protein}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="carbs" className="form-label">Carbs</label>
                                <input
                                    type="number"
                                    min="0"
                                    name="carbs"
                                    onChange={handleChange}
                                    value={newProductData.carbs}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fiber" className="form-label">Fiber</label>
                                <input
                                    type="number"
                                    min="0"
                                    name="fiber"
                                    onChange={handleChange}
                                    value={newProductData.fiber}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="salt" className="form-label">Salt</label>
                                <input
                                    type="number"
                                    min="0"
                                    name="salt"
                                    onChange={handleChange}
                                    value={newProductData.salt}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productImage" className="form-label">Product image</label>
                                <input
                                    type="file"
                                    name="productImage"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <input type="submit" value="Submit" className="btn btn-primary" />
                            <p>{responseMessage}</p>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <div className="preview-container">
                            <p>Preview:</p>
                            <div className={`preview-inner-container ${imagePreview ? 'filled' : ''}`}>

                                {imagePreview ? (
                                    <img src={imagePreview} alt="Product Preview" className="img-fluid" />
                                ) : (
                                    <p>No image uploaded</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddProductpage;