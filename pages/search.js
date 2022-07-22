import React, { useState, useEffect } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

const Search = () => {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: 'AIzaSyC9WeMRFmFpLH4ED2zp4LG0PfPsI5r1aj0',
  });

  //   useEffect(() => {
  //     // fetch place details for the first element in placePredictions array
  //     if (placePredictions.length)
  //       service.placesService?.getDetails(
  //         {
  //           placeId: placePredictions[0].place_id,
  //         },
  //         (placeDetails) => savePlaceDetailsToState(placeDetails)
  //       );
  //   }, [placePredictions]);

  return (
    <div>
      Search
      <input
        placeholder="Search location"
        onChange={(evt) => {
          getPlacePredictions({
            input: evt.target.value,
            componentRestrictions: { country: 'ng' },
          });
        }}
        loading={isPlacePredictionsLoading}
      />
      {placePredictions.map((item) => {
        console.log(item);
        return (
          <ul>
            <li>{item?.structured_formatting?.main_text}</li>
          </ul>
        );
      })}
    </div>
  );
};

export default Search;
