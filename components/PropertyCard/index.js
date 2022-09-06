import React from 'react';
import { numberWithCommas } from '../../utilities';
import Link from 'next/link';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

const PropertyCard = ({ product, id }) => {
  const [isFavourite, setIsFavourite] = React.useState(false);

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-xl sm:max-w-[18rem] max-w-none cursor-pointer">
      <div className="">
        <div className="flex justify-between w-full absolute py-3 px-4">
          <div className="flex space-x-2">
            <div className="bg-[#43d092] text-white text-xs py-1 px-3 rounded-md cursor-pointer">
              New
            </div>
            <div className="bg-[#468ed2] text-white text-xs py-1 px-2 rounded-md cursor-pointer">
              For sale
            </div>
          </div>
          <div onClick={handleFavourite}>
            {isFavourite ? (
              <MdFavorite size={20} color="red" />
            ) : (
              <MdFavoriteBorder size={20} color="white" />
            )}
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt=""
          className="rounded-2xl"
        />
      </div>
      <Link href={`/property/${id}`}>
        <div className="py-2 px-4">
          <p className="font-semibold text-gray-800 text-xl">
            $ {numberWithCommas(product?.price)}
          </p>
          <p className="text-sm text-gray-500 py-1">{product?.address?.name}</p>
          <small>{Math.round(product?.distance)} miles away from you</small>
          <div className="flex space-x-2 py-2">
            <div className="flex space-x-2 w-full bg-[#f3f3f3] p-2 rounded-md-2 text-sm">
              room
            </div>
            <div className="flex space-x-2 w-full bg-[#f3f3f3] p-2 rounded-md-2 text-sm">
              bath
            </div>
            <div className="flex space-x-2 w-full bg-[#f3f3f3] p-2 rounded-md-2 text-sm">
              area
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
