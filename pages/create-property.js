import React, { useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import axios from 'axios';
import Link from 'next/link';

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
    <div>
      <Link href="/">Home</Link>
      {success}
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Create Property</h1>

        <label style={{ display: 'block' }} htmlFor="price">
          price
          <input
            type="text"
            name="price"
            id="price"
            value={price}
            onChange={(e) => handleChange(e)}
            placeholder="property price"
          />
        </label>

        <div>
          address
          <input
            type="text"
            name="address"
            id="address"
            value={address.name}
            placeholder="enter location"
            onChange={(evt) => {
              getPlacePredictions({
                input: evt.target.value,
                componentRestrictions: { country: 'ng' },
              });
              handleChange(evt);
            }}
            loading={isPlacePredictionsLoading}
          />
          {placePredictions.map((item) => {
            // console.log(item);
            return (
              <ul>
                <li onClick={() => handleSelect(item)}>
                  {item?.structured_formatting?.main_text}
                </li>
              </ul>
            );
          })}
        </div>

        <label style={{ display: 'block' }} htmlFor="homeType">
          home type
          <select onChange={(e) => handleChange(e)} name="homeType" id="">
            <option value="">select home type</option>
            <option value="apartment">apartment</option>
            <option value="house">house</option>
            <option value="condo">condo</option>
          </select>
        </label>

        <label style={{ display: 'block' }} htmlFor="bedroom">
          bedrooms
          <input
            type="text"
            name="bedroom"
            id="bedroom"
            value={bedroom}
            onChange={(e) => handleChange(e)}
            placeholder="2"
          />
        </label>

        <label style={{ display: 'block' }} htmlFor="bathroom">
          bathrooms
          <input
            type="text"
            name="bathroom"
            id="bathroom"
            value={bedroom}
            onChange={(e) => handleChange(e)}
            placeholder="2"
          />
        </label>

        <label style={{ display: 'block' }} htmlFor="sqft">
          Square feet (sqft)
          <input
            type="text"
            name="sqft"
            id="sqft"
            value={sqft}
            onChange={(e) => handleChange(e)}
            placeholder="800sqft"
          />
        </label>

        <label style={{ display: 'block' }} htmlFor="yearBuilt">
          year built
          <input
            type="text"
            name="yearBuilt"
            id="yearBuilt"
            value={yearBuilt}
            onChange={(e) => handleChange(e)}
            placeholder="2013"
          />
        </label>

        <label style={{ display: 'block' }} htmlFor="description">
          description
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => handleChange(e)}
            placeholder=""
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateProperty;
