import React, { useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const CreateProperty = () => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: 'AIzaSyC9WeMRFmFpLH4ED2zp4LG0PfPsI5r1aj0',
  });
  //   select a place from the list of predictions
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [formData, setFormData] = useState({
    price: '',
    homeType: '',
    bedroom: '',
    bathroom: '',
    yearBuilt: '',
    sqft: '',
    description: '',
    address: {
      placeId: '',
      name: '',
    },
  });
  const [success, setSuccess] = useState('');

  const {
    price,
    homeType,
    bedroom,
    bathroom,
    yearBuilt,
    sqft,
    description,
    address,
  } = formData;

  const handleSelect = (place) => {
    setSelectedPlace(place);
    setFormData({
      ...formData,
      address: {
        placeId: place.place_id,
        name: place.description,
      },
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      'http://localhost:4000/api/create-property',
      formData
    );
    console.log(res.data);
    setSuccess('sucessfully added');
    setFormData({
      price: '',
      homeType: '',
      bedroom: '',
      bathroom: '',
      yearBuilt: '',
      sqft: '',
      description: '',
      address: {
        placeId: '',
        name: '',
      },
    });
  };

  console.log(formData);
  return (
    <>
      <Navbar />
      <main class="sm:px-10 px-5 py-10 w-full">
        <div>
          <h1 class="font-bold text-4xl">Let&#39;s help you sell a home</h1>
        </div>

        <div class="mt-10 max-w-4xl">
          {/* <!-- form --> */}
          <form class="flex flex-col items-start space-y-5" action="">
            <label htmlFor="location" class="block w-72">
              <span class="text-sm font-semibold"> Home address </span>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Location"
                class="mt-2 w-full"
              />
            </label>
            <label htmlFor="price" class="block w-72">
              <span class="text-sm font-semibold"> Set your price </span>
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price"
                class="mt-2 w-full"
              />
            </label>

            <label htmlFor="dropzone-file" class="block w-full cursor-pointer">
              <span class="text-sm font-semibold"> Upload images </span>

              <div class="flex flex-col justify-center items-center pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md-2 mt-2">
                <svg
                  class="mb-3 w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p class="mb-2 text-xs text-gray-500">
                  <span class="font-semibold"> Click to upload images. </span>
                </p>
                <p class="text-xs text-gray-500">PNG, JPG, JPEG</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                name="images"
                class="hidden"
              />
            </label>

            <p class="font-semibold text-2xl py-5">Home Details</p>

            <label htmlFor="homeType" class="block w-72">
              <span class="text-sm font-semibold"> Home type </span>
              <select name="" id="" class="mt-2 w-full">
                <option disabled value="">
                  Select
                </option>
                <option value="">House</option>
                <option value="">Apartment</option>
                <option value="">Condo</option>
                <option value="">Townhouse</option>
                <option value="">Villa</option>
              </select>
            </label>

            <div class="flex space-x-4">
              <label htmlFor="bedroom" class="block w-72">
                <span class="text-sm font-semibold"> Bedrooms </span>
                <input name="bedrooms" type="text" />
              </label>
              <label htmlFor="bathroom" class="block w-72">
                <span class="text-sm font-semibold"> Bathrooms </span>
                <input name="bathroom" type="text" />
              </label>
              <label htmlFor="sqft" class="block w-72">
                <span class="text-sm font-semibold"> Sqft (Lot size) </span>
                <input name="sqft" type="text" />
              </label>
            </div>

            <div class="flex justify-end w-full">
              <button
                type="submit"
                class="bg-blue-500 px-8 py-3 rounded-md text-white font-semibold"
              >
                Submit
              </button>
            </div>
          </form>
          {/* <!-- end form --> */}
        </div>
      </main>
    </>

    // <div>
    //   <Link href="/">Home</Link>
    //   {success}
    //   <form onSubmit={(e) => handleSubmit(e)}>
    //     <h1>Create Property</h1>

    //     <label style={{ display: 'block' }} htmlFor="price">
    //       price
    //       <input
    //         type="text"
    //         name="price"
    //         id="price"
    //         value={price}
    //         onChange={(e) => handleChange(e)}
    //         placeholder="property price"
    //       />
    //     </label>

    //     <div>
    //       address
    //       <input
    //         type="text"
    //         name="address"
    //         id="address"
    //         value={address.name}
    //         placeholder="enter location"
    //         onChange={(evt) => {
    //           getPlacePredictions({
    //             input: evt.target.value,
    //             componentRestrictions: { country: 'ng' },
    //           });
    //           handleChange(evt);
    //         }}
    //         loading={isPlacePredictionsLoading}
    //       />
    //       {placePredictions.map((item) => {
    //         // console.log(item);
    //         return (
    //           <ul>
    //             <li onClick={() => handleSelect(item)}>
    //               {item?.structured_formatting?.main_text}
    //             </li>
    //           </ul>
    //         );
    //       })}
    //     </div>

    //     <label style={{ display: 'block' }} htmlFor="homeType">
    //       home type
    //       <select onChange={(e) => handleChange(e)} name="homeType" id="">
    //         <option value="">select home type</option>
    //         <option value="apartment">apartment</option>
    //         <option value="house">house</option>
    //         <option value="condo">condo</option>
    //       </select>
    //     </label>

    //     <label style={{ display: 'block' }} htmlFor="bedroom">
    //       bedrooms
    //       <input
    //         type="text"
    //         name="bedroom"
    //         id="bedroom"
    //         value={bedroom}
    //         onChange={(e) => handleChange(e)}
    //         placeholder="2"
    //       />
    //     </label>

    //     <label style={{ display: 'block' }} htmlFor="bathroom">
    //       bathrooms
    //       <input
    //         type="text"
    //         name="bathroom"
    //         id="bathroom"
    //         value={bathroom}
    //         onChange={(e) => handleChange(e)}
    //         placeholder="2"
    //       />
    //     </label>

    //     <label style={{ display: 'block' }} htmlFor="sqft">
    //       Square feet (sqft)
    //       <input
    //         type="text"
    //         name="sqft"
    //         id="sqft"
    //         value={sqft}
    //         onChange={(e) => handleChange(e)}
    //         placeholder="800sqft"
    //       />
    //     </label>

    //     <label style={{ display: 'block' }} htmlFor="yearBuilt">
    //       year built
    //       <input
    //         type="text"
    //         name="yearBuilt"
    //         id="yearBuilt"
    //         value={yearBuilt}
    //         onChange={(e) => handleChange(e)}
    //         placeholder="2013"
    //       />
    //     </label>

    //     <label style={{ display: 'block' }} htmlFor="description">
    //       description
    //       <input
    //         type="text"
    //         name="description"
    //         id="description"
    //         value={description}
    //         onChange={(e) => handleChange(e)}
    //         placeholder=""
    //       />
    //     </label>

    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
  );
};

export default CreateProperty;
