import "./CreateAd.css";
import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios";

function formatDateTimeLocal(value: string) {
  // value will look like:  2025-06-21 T 14:30
  const [date, time] = value.split("T");
  return `${date} ${time}:00`;
}

const CreateAd = () => {
  //hook for the form values
  const [formData, setFormData] = useState({
    adName: "",
    location: "",
    description: "",
    category: "Hotel",
    beginningDate: "",
    expirationDate: "",
    weblink: "",
    adType: "",
    imageLink: "",
  });

  const [adTypeTitle, setTypeTitle] = useState({
    typeTitle: "Ad Type",
    linkTypeTitle: "Link of the image",
  });

  function getSelectedType(type: string) {
    const typeTitle = "Ad " + type;
    const linkTypeTitle = "Link of the " + type;
    setTypeTitle({ typeTitle: typeTitle, linkTypeTitle: linkTypeTitle });
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name == "adType") {
      getSelectedType(value);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newAd = {
      ad_image_link: formData.imageLink,
      ad_link: formData.weblink,
      ad_location: formData.location,
      ad_type: formData.adType,
      beginning_date: formatDateTimeLocal(formData.beginningDate),
      category: formData.category,
      description: formData.description,
      expiration_date: formatDateTimeLocal(formData.expirationDate),
      name: formData.adName,
      package_name: "Ads",
    };

    const begin = new Date(formData.beginningDate);
    const end = new Date(formData.expirationDate);
    if (begin > end) {
      alert(
        "Failed to create ad: beginning date is later than expiration date."
      );
      return;
    }

    try {
      // API
      const response = await axios.post(
        "https://ad-sdk-flask-api.vercel.app/ad_sdk",
        newAd
      );

      console.log("Ad successfully created:", response.data);
      alert("Ad created successfully! 🎉");
      // reset the fiels after sending
      setFormData({
        adName: "",
        location: "",
        description: "",
        category: "Hotel",
        beginningDate: "",
        expirationDate: "",
        weblink: "",
        adType: "",
        imageLink: "",
      });
    } catch (error) {
      console.error("Error creating ad:", error);
      alert("Failed to create ad. Please try again.");
    }
  };

  return (
    <>
      <Header />

      <div className="create-new-ad-card">
        <h1>Create New Ad</h1>

        <form onSubmit={handleSubmit}>
          <h3>Ad Name</h3>

          <input
            name="adName"
            type="text"
            placeholder="Ad Name"
            value={formData.adName}
            onChange={handleChange}
            required
          />
          <h3>Location</h3>

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <h3>Ad description</h3>

          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <h3>Ad category</h3>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Hotel">Hotel</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Attraction">Attraction</option>
            <option value="Product">Product</option>
          </select>

          <h3>Beginning date</h3>

          <input
            name="beginningDate"
            type="datetime-local"
            value={formData.beginningDate}
            onChange={handleChange}
            required
          />

          <h3>Expiration date</h3>

          <input
            name="expirationDate"
            type="datetime-local"
            value={formData.expirationDate}
            onChange={handleChange}
            required
          />

          <h3>Website link</h3>

          <input
            name="weblink"
            placeholder="website link"
            value={formData.weblink}
            onChange={handleChange}
            required
          />

          <h3>{adTypeTitle.typeTitle}</h3>
          <select name="adType" value={formData.adType} onChange={handleChange}>
            <option value="" disabled>
              Select
            </option>
            <option value="photo">Photo Ad</option>
            <option value="video">Video Ad</option>
          </select>

          <h3>{adTypeTitle.linkTypeTitle}</h3>

          <input
            name="imageLink"
            placeholder="imageLink"
            value={formData.imageLink}
            onChange={handleChange}
            required
          />

          <button className="submit-button" type="submit">
            Submit Ad
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateAd;
