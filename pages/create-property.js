import React, { useState, useEffect } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

const CreateProperty = () => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: API_KEY,
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
  const [show, setShow] = useState(true);

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
    setShow(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'https://geolocate-backend-production-15ee.up.railway.app/api/create-property',
        // 'http://localhost:4000/api/create-property',
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

      toast.success('Property added successfully');
    } catch (err) {
      console.log(err);
      toast.error('Error adding property');
    }
  };

  console.log(formData);
  const optionsWrapperClassName =
    'absolute top-20 overflow-auto bg-white rounded-md shadow-dropdown max-h-60 focus:outline-none divide-y divide-secondary divide-opacity-10 w-[18rem]';
  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     if (window.scrollY > 50) {
  //       return document.querySelector('.searchbar').classList.add('show');
  //     }
  //     return document.querySelector('.searchbar').classList.remove('show');
  //   });
  // });
  return (
    <>
      <Navbar />
      <main className="sm:px-10 px-5 py-10 w-full">
        <div>
          <h1 className="font-bold text-4xl">Let&#39;s help you sell a home</h1>
        </div>

        <div className="mt-10 max-w-4xl">
          {/* <!-- form --> */}
          <form
            className="flex flex-col items-start space-y-5"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label htmlFor="location" className="relative w-72">
              <span className="text-sm font-semibold"> Home address </span>
              <input
                type="text"
                name="address"
                id="address"
                value={address.name}
                onChange={(evt) => {
                  getPlacePredictions({
                    input: evt.target.value,
                    componentRestrictions: { country: 'ng' },
                  });
                  handleChange(evt);
                }}
                loading={isPlacePredictionsLoading}
                placeholder="Location"
                className="mt-2 w-full"
              />
              <div className="">
                <div className={`${optionsWrapperClassName} z-30 bg-gray-100 `}>
                  {show &&
                    placePredictions.map((item) => {
                      console.log(item);
                      return (
                        <ul key={item} className="py-2 px-3 hover:bg-gray-50">
                          <li
                            onClick={() => handleSelect(item)}
                            className=" cursor-pointer"
                          >
                            {item?.structured_formatting?.main_text}
                          </li>
                        </ul>
                      );
                    })}
                </div>
              </div>
            </label>
            <label htmlFor="price" className="block w-72">
              <span className="text-sm font-semibold"> Set your price </span>
              <input
                type="text"
                name="price"
                id="price"
                value={price}
                onChange={(e) => handleChange(e)}
                placeholder="Price"
                className="mt-2 w-full"
              />
            </label>

            <label
              htmlFor="dropzone-file"
              className="block w-full cursor-pointer"
            >
              <span className="text-sm font-semibold"> Upload images </span>

              <div className="flex flex-col justify-center items-center pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md-2 mt-2">
                <svg
                  className="mb-3 w-10 h-10 text-gray-400"
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
                <p className="mb-2 text-xs text-gray-500">
                  <span className="font-semibold">
                    {' '}
                    Click to upload images.{' '}
                  </span>
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                name="images"
                className="hidden"
              />
            </label>

            <p className="font-semibold text-2xl py-5">Home Details</p>

            <label htmlFor="homeType" className="block w-72">
              <span className="text-sm font-semibold"> Home type </span>
              <select
                onChange={(e) => handleChange(e)}
                name="homeType"
                className="mt-2 w-full"
              >
                <option disabled value="">
                  Select
                </option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="villa">Villa</option>
              </select>
            </label>

            <div className="flex space-x-4">
              <label htmlFor="bedroom" className="block w-72">
                <span className="text-sm font-semibold"> Bedrooms </span>
                <input
                  type="text"
                  name="bedroom"
                  id="bedroom"
                  value={bedroom}
                  onChange={(e) => handleChange(e)}
                  placeholder="2"
                />
              </label>
              <label htmlFor="bathroom" className="block w-72">
                <span className="text-sm font-semibold"> Bathrooms </span>
                <input
                  type="text"
                  name="bathroom"
                  id="bathroom"
                  value={bathroom}
                  onChange={(e) => handleChange(e)}
                  placeholder="2"
                />
              </label>
              <label htmlFor="sqft" className="block w-72">
                <span className="text-sm font-semibold"> Sqft (Lot size) </span>
                <input
                  type="text"
                  name="sqft"
                  id="sqft"
                  value={sqft}
                  onChange={(e) => handleChange(e)}
                  placeholder="800sqft"
                />
              </label>
            </div>

            <div className="flex w-full">
              <label htmlFor="description" className="block w-full">
                <span className="text-sm font-semibold"> Description </span>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => handleChange(e)}
                  placeholder=""
                />
              </label>
            </div>

            <div className="flex justify-end w-full">
              <button
                type="submit"
                className="bg-blue-500 px-8 py-3 rounded-md text-white font-semibold"
              >
                Submit
              </button>
            </div>
          </form>
          {/* <!-- end form --> */}
        </div>
      </main>
    </>
  );
};

export default CreateProperty;
