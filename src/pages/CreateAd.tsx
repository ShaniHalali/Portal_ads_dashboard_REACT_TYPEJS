import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";

function formatDateTimeLocal(value: string) {
  // value נראה כמו 2025-06-21T14:30
  const [date, time] = value.split("T");
  return `${date} ${time}:00`; // מוסיפים שניות
}

const CreateAd = () => {
  // שלב 1: הגדרת סטייט לכל שדה בטופס
  const [adName, setAdName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Hotel");
  const [beginning, setBeginning] = useState("");
  const [expiration, setExpiration] = useState("");
  const [link, setLink] = useState("");
  const [adType, setType] = useState("");
  const [imageLink, setImageLink] = useState("");

  // שלב 2: פעולה שקורית כששולחים את הטופס
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // מונע רענון עמוד

    // הדפסת התוצאה לבדיקה (אחר כך נשלח לשרת עם axios.post)
    const newAd = {
      ad_image_link: imageLink,
      ad_link: link,
      ad_location: location,
      ad_type: adType,
      beginning_date: formatDateTimeLocal(beginning),
      category: category,
      description: description,
      expiration_date: formatDateTimeLocal(expiration),
      name: adName,
      package_name: "Ads",
    };

    try {
      // API
      const response = await axios.post(
        "https://ad-sdk-flask-api.vercel.app/ad_sdk",
        newAd
      );

      console.log("Ad successfully created:", response.data);
      alert("Ad created successfully! 🎉");
      // reset the fiels after sending
      setAdName("");
      setLocation("");
      setDescription("");
      setCategory("");
      setExpiration("");
      setBeginning("");
      setLink("");
      setType("");
      setImageLink("");
    } catch (error) {
      console.error("Error creating ad:", error);
      alert("Failed to create ad. Please try again.");
    }
  };

  return (
    <>
      <Header />

      <div
        style={{
          padding: "50px",
          maxWidth: "350px",
          margin: "0 auto",
          backgroundColor: "#F5F5DC",
          marginTop: "50px",
          marginBottom: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
        }}
      >
        <h1 style={{ marginTop: "0", marginBottom: "10px", color: "black" }}>
          {" "}
          Create New Ad{" "}
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <h3>Ad Name</h3>
          <input
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
            type="text"
            placeholder="Ad Name"
            value={adName}
            onChange={(e) => setAdName(e.target.value)}
            required
          />
          <h3>Location</h3>

          <input
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <h3>Ad description</h3>
          <input
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <h3>Ad category</h3>
          <select
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Hotel">Hotel</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Attraction">Attraction</option>
            <option value="Product">Product</option>
          </select>

          <h3>Beginning date</h3>
          <input
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
            type="datetime-local"
            value={beginning}
            onChange={(e) => setBeginning(e.target.value)}
            required
          />

          <h3>Expiration date</h3>
          <input
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
            type="datetime-local"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            required
          />

          <h3>Website link</h3>
          <input
            placeholder="website link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            style={{ padding: "10px" }}
          />

          <h3>Ad type</h3>
          <select
            value={adType}
            onChange={(e) => setType(e.target.value)}
            style={{ padding: "10px" }}
          >
            <option value="photo">Photo Ad</option>
            <option value="video">Video Ad</option>
          </select>

          <h3>Link of the image</h3>
          <input
            style={{ padding: "10px", borderRadius: "8px", border: "none" }}
            placeholder="imageLink"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            required
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#4D2C91",
              color: "white",
              border: "none",
              borderRadius: "6px",
              marginTop: "30px",
            }}
          >
            Submit Ad
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateAd;