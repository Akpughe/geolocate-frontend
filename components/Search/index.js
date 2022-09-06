import React, { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';

const Search = ({
  handleSearch,
  value,
  onChange,
  loading,
  enabled,
  setEnabled,
}) => {
  console.log('enabled', enabled);
  
  return (
    <div className="flex items-center w-full bg-white">
      <form
        onSubmit={handleSearch}
        className="flex sm:space-x-4 space-x-2 items-center sm:px-10 px-5 w-full"
      >
        <div className="sm:w-2/5 w-full">
          <input
            value={value}
            onChange={onChange}
            loading={loading}
            type="text"
            placeholder="Enter an Address, City or ZIP code"
          />
        </div>
        <div>
          <div className="sm:flex hidden space-x-2 w-full bg-[#f3f3f3] py-3 px-4 rounded-md-2 text-sm">
            <div>For sale</div>
            <div>•</div>
          </div>
        </div>
        <div>
          <div className="sm:flex hidden space-x-2 w-full bg-[#f3f3f3] py-3 px-4 rounded-md-2 text-sm">
            <div>Type: House</div>
            <div>•</div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="py-2.5 px-4 bg-blue-500 rounded-md-2 capitalize text-white font-semibold"
          >
            search
          </button>
        </div>
      </form>

      <div className="w-full text-sm sm:flex items-center hidden">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white`}
          />
        </Switch>
        <span className="text-xs ml-2 font-semibold">Map view</span>
      </div>
    </div>
  );
};

export default Search;
