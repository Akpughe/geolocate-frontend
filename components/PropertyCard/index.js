import React from 'react';
import { numberWithCommas } from '../../utilities';
import Link from 'next/link';
const PropertyCard = ({ product, id }) => {
  return (
    <Link href={`/property/${id}`}>
    <div class="relative bg-white rounded-2xl shadow-xl sm:max-w-[18rem] max-w-none cursor-pointer">
      <div class="">
        <div class="flex justify-between w-full absolute py-3 px-4">
          <div class="flex space-x-2">
            <div class="bg-[#43d092] text-white text-xs py-1 px-3 rounded-md cursor-pointer">
              New
            </div>
            <div class="bg-[#468ed2] text-white text-xs py-1 px-2 rounded-md cursor-pointer">
              For sale
            </div>
          </div>
          <div>heart</div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt=""
          class="rounded-2xl"
        />
      </div>
      <div class="py-2 px-4">
        <p class="font-semibold text-gray-800 text-xl">
          $ {numberWithCommas(product?.price)}
        </p>
        <p class="text-sm text-gray-500 py-1">{product?.address?.name}</p>
        <small>{Math.round(product?.distance)} miles away from you</small>
        <div class="flex space-x-2 py-2">
          <div class="flex space-x-2 w-full bg-[#f3f3f3] p-2 rounded-md-2 text-sm">
            room
          </div>
          <div class="flex space-x-2 w-full bg-[#f3f3f3] p-2 rounded-md-2 text-sm">
            bath
          </div>
          <div class="flex space-x-2 w-full bg-[#f3f3f3] p-2 rounded-md-2 text-sm">
            area
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default PropertyCard;
