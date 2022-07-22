import { useState, useEffect } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import Link from 'next/link';
import axios from 'axios';
export default function Home() {
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: 'AIzaSyC9WeMRFmFpLH4ED2zp4LG0PfPsI5r1aj0',
  });
  const [value, setValue] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const res = await axios.get(
      `http://localhost:4000/api/search-property?q=${value}`
    );

    setProducts(res.data);
    console.log(res.data);
  };

  // console.log(products);

  return (
    <>
      <main>
        <form onSubmit={(e) => handleSearch(e)}>
          Search
          <input
            placeholder="Search property"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            // loading={isPlacePredictionsLoading}
          />
          <button type="submit">search</button>
        </form>
        <Link href="/create-property">
          <div>+ add property</div>
        </Link>
        {products.length == 0 ? (
          <p>No result</p>
        ) : (
          products?.map((item) => {
            console.log(item);
            return (
              <ul key={item._id}>
                <li>{item?.title}</li>
                <small>{item?.address?.name}</small>
              </ul>
            );
          })
        )}
      </main>
    </>
  );
}
