import { SellerAccountFunctions } from "../components/functions/SellerAccountFunctions";
import {useEffect, useState} from "react";
import "../css/AddProductpage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderSimple from "../components/generic/HeaderSimple";
import Footer from "../components/generic/Footer";
import Header from "../components/generic/Header";
import LoadingOverlay from "../components/specific/overlays/LoadingOverlay";
import {SearchProductFunctions} from "../components/functions/SearchProductFunctions";
import {useParams} from "react-router-dom";

const EditProductpage = () => {
    const { editProduct } = SellerAccountFunctions();
    const { getProductInformation } = SearchProductFunctions();
    const { productID } = useParams();

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
    const [loading, setLoading] = useState(true);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchProductDetails = async () => {
            const response = await getProductInformation({ productID });
            if (response.success) {
                setNewProductData({
                    productName: response.productDetails.name,
                    price: response.productDetails.price,
                    inGrams: response.productDetails.inGrams,
                    weight: response.productDetails.weight,
                    energeticValue: response.productDetails.energeticValue,
                    fat: response.productDetails.fat,
                    protein: response.productDetails.protein,
                    carbs: response.productDetails.carbs,
                    fiber: response.productDetails.fiber,
                    salt: response.productDetails.salt,
                });
                setLoading(false);
            } else {
                setResponseMessage(response.message);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productID, getProductInformation]);

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

        return false;
    };

    const resetForm = () => {
        setNewProductData({
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
        setImagePreview(null);
        setErrors({});
        setResponseMessage(""); // Clear response message
    };


    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "productName":
                if (!value || value.trim() === "") {
                    error = "Product name is required.";
                } else if (value.length > 50) {
                    error = "Product name cannot exceed 50 characters.";
                }
                break;

            case "price":
                if (!value || isNaN(value) || value <= 0) {
                    error = "Price must be a positive number.";
                }
                break;

            case "weight":
                if (!value || isNaN(value) || value <= 0) {
                    error = "Weight must be a positive number.";
                }
                break;

            case "energeticValue":
            case "fat":
            case "protein":
            case "carbs":
            case "fiber":
            case "salt":
                if (!value || isNaN(value) || value < 0 || value > 100) {
                    error = `${name.charAt(0).toUpperCase() + name.slice(1)} must be between 0 and 100.`;
                }
                break;

            case "productImage":
                if (!newProductImage) {
                    error = "Product image is required.";
                }
                break;

            default:
                break;
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    };

    const handleChange = ({ currentTarget: input }) => {
        const { name, type, value, checked } = input;

        if (type === "checkbox") {
            setNewProductData({ ...newProductData, [name]: checked });
        } else if (type === "number" && name === "price") {
            const decimalPattern = /^\d*\.?\d*$/;
            if (decimalPattern.test(value)) {
                setNewProductData({ ...newProductData, [name]: value });
                validateField(name, value);
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: "Price must be a valid number." }));
            }
        } else if (type === "number") {
            setNewProductData({ ...newProductData, [name]: parseInt(value) });
            validateField(name, parseInt(value));
        } else {
            setNewProductData({ ...newProductData, [name]: value });
            validateField(name, value);
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
        if (isNaN(newProductData.price) || parseFloat(newProductData.price) <= 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                price: "Price must be a positive number.",
            }));
            return;
        }

        const formattedProductData = {
            ...newProductData,
            price: parseFloat(newProductData.price).toFixed(2),
        };

        const response = await editProduct(e, formattedProductData);

        if (response.success) {
            console.log("successfully added new product");
            setResponseMessage("Product added successfully!");
            resetForm();
        } else {
            setResponseMessage(response.message);
            console.log("adding product failed " + response.message);
        }
    };

    if (loading) {
        return (
            <div>
                <Header />
                <LoadingOverlay />
                <Footer />
            </div>
        );
    }

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
                                    type="text"
                                    name="price"
                                    onChange={handleChange}
                                    value={newProductData.price}
                                    className={`form-control ${errors.price ? "is-invalid" : ""}`}
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
            {errors.productImage && <div className="invalid-feedback">{errors.productImage}</div>}
            <Footer />
        </div>
    );
};

export default EditProductpage;