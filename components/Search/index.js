import React from 'react'

const Search = ({handleSearch, value, onChange, loading}) => {
  return (
    <div className="flex items-center">
      <form
      onSubmit={handleSearch}
        className="flex sm:space-x-4 space-x-2 items-center sm:px-10 px-5 w-full"
      >
        <div className="sm:w-2/5 w-full">
          <input value={value} onChange={onChange} loading={loading} type="text" placeholder="Enter an Address, City or ZIP code" />
        </div>
        <div>
          <div
            className="sm:flex hidden space-x-2 w-full bg-[#f3f3f3] py-3 px-4 rounded-md-2 text-sm"
          >
            <div>For sale</div>
            <div>•</div>
          </div>
        </div>
        <div>
          <div
            className="sm:flex hidden space-x-2 w-full bg-[#f3f3f3] py-3 px-4 rounded-md-2 text-sm"
          >
            <div>Type: House</div>
            <div>•</div>
          </div>
        </div>
        <div>
          <button
          type='submit'
            className="py-2.5 px-4 bg-blue-500 rounded-md-2 capitalize text-white font-semibold"
          >
            search
          </button>
        </div>
      </form>

      <div className="w-full text-sm sm:block hidden">map view switch</div>
    </div>
  )
}

export default Search