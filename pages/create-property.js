import React, { useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import axios from 'axios';

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
    title: '',
    address: {
      placeId: '',
      name: '',
    },
  });

  const { title, address } = formData;

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
  };

  console.log(formData);
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Create Property</h1>

        <label style={{ display: 'block' }} htmlFor="name">
          name
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => handleChange(e)}
            placeholder="property title"
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
            // console.log(item.description);
            return (
              <ul>
                <li onClick={() => handleSelect(item)}>
                  {item?.structured_formatting?.main_text}
                </li>
              </ul>
            );
          })}
          {/* <select name="" id="">
            {placePredictions.map((item) => {
              return (
                <option value={item.place_id}>
                  {item?.structured_formatting?.main_text}
                </option>
              );
            })}
          </select> */}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateProperty;
