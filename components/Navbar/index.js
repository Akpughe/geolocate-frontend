import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full p-10">
      <div className="flex items-center space-x-40">
        <div className="font-bold text-2xl capitalize">real estate</div>
        <ul className="sm:flex hidden space-x-10 capitalize">
          <li className="">
            <a
              className="text-gray-700 font-normal text-sm hover:border-b-2 hover:border-b-blue-700 focus:text-blue-700 focus:border-b-blue-700"
              href="#"
            >
              search
            </a>
          </li>
          <li>
            <a className="text-gray-700 font-normal text-sm hover:border-b-2 hover:border-b-blue-700">
              about
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 font-normal text-sm hover:border-b-2 hover:border-b-blue-700"
            >
              help
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 font-normal text-sm hover:border-b-2 hover:border-b-blue-700"
            >
              real estate agent
            </a>
          </li>
          <li>
            <a
              className="text-gray-700 font-normal text-sm hover:border-b-2 hover:border-b-blue-700"
              href=""
            >
              blog
            </a>
          </li>
        </ul>
      </div>

      <div className="flex space-x-5 items-center">
        <div className="text-sm font-semibold cursor-pointer">
          My favourites
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gray-500 rounded-full">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="profile-image"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <span className="text-sm">David</span>
          <span>•</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
