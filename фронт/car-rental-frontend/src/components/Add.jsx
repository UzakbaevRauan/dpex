import React, { useState } from "react";
import { cloudinaryUpload } from "../utils";
import { toast } from "react-toastify";
import '../styless/add.css';

export default function AddProduct() {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState(new Date().getFullYear());
    const [bodyType, setBodyType] = useState("");
    const [seats, setSeats] = useState(5);
    const [price, setPrice] = useState("");
    const [transmission, setTransmission] = useState("");
    const [location, setLocation] = useState("");
    const [mainPhoto, setMainPhoto] = useState(null);
    const [description, setDescription] = useState("");

    const handleMainPhotoChange = (e) => {
        setMainPhoto(e.target.files[0]);
    };

    const handleSubmit = async () => {
        // Загрузка изображения на Cloudinary
        try {
            const mainPhotoUrl = mainPhoto ? (await cloudinaryUpload(mainPhoto))[0].secure_url : null;

            // Сбор данных о продукте
            const productData = {
                brand,
                model,
                year,
                body_type: bodyType,
                seats,
                price,
                transmission,
                location,
                main_photo: mainPhotoUrl,
                description,
            };

            // Отправка данных на сервер
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                toast("Successfully Added Product To Database", {
                    type: "success",
                });
            } else {
                toast.error("Error Adding Product To Database");
            }
        } catch (error) {
            console.error("Error uploading main photo to Cloudinary:", error);
            toast.error("Error Adding Product To Database");
        }
    };

    return (
        <div className="admin__section">
        <h2>Add Product</h2>
        <div className="flex-container">
            <div className="flex-item">
                <div class="group">
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required="required" /><span class="highlight"></span><span class="bar"></span>
                    <label>Brand:</label>
                </div>
                <div class="group">
                    <input type="text" value={year} onChange={(e) => setYear(e.target.value)} required="required" /><span class="highlight"></span><span class="bar"></span>
                    <label>Year:</label>
                </div>
                <div class="group">
                    <input type="number" value={seats} onChange={(e) => setSeats(e.target.value)} required="required" /><span class="highlight"></span><span class="bar"></span>
                    <label>Seats:</label>
                </div>
                <div class="group">
                    <input type="text" value={transmission} onChange={(e) => setTransmission(e.target.value)} required="required" /><span class="highlight"></span><span class="bar"></span>
                    <label>Transmission:</label>
                </div>
                <div class="group">
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="5" required="required"></textarea><span class="highlight"></span><span class="bar"></span>
                    <label>Description:</label>
                </div>
            </div>
            <div className="flex-item">
                <div class="group">
                    <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required="required" /><span class="highlight"></span><span class="bar"></span>
                    <label>Model:</label>
                </div>
                <div class="group">
                    <input type="text" value={bodyType} onChange={(e) => setBodyType(e.target.value)} required="required" /><span class="highlight"></span><span class="bar"></span>
                    <label>Body Type:</label>
                </div>
                <div class="group">
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required="required" /><span class="highlight"></span><span class="bar"></span>
                    <label>Price:</label>
                </div>
                <div class="group">
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required="required" /><span class="highlight"></span><span class="bar"></span>
                    <label>Location:</label>
                </div>
                <div class="group">
                    <input type="file" accept="image/*" onChange={handleMainPhotoChange} required="required" /><span class="highlight"></span><span class="bar"></span>
                    <label>Main Photo:</label>
                </div>
            </div>
        </div>
        <button className="admin__section-button" onClick={handleSubmit}>
            Add To Inventory
        </button>
        <br />
    </div>
    
    
    );
}
