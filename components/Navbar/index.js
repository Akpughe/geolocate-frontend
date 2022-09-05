import React, { useState } from 'react';
import Link from 'next/link';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);
  const [show, setShow] = useState(false);

  return (
    <nav className="flex items-center justify-between w-full p-10 z-50">
      <div className="flex items-center space-x-40">
        <Link href="/">
          <div className="font-bold text-2xl capitalize cursor-pointer">
            real estate
          </div>
        </Link>
        <ul className="sm:flex hidden space-x-10 capitalize">
          <li className="">
            <a className="text-gray-700 cursor-pointer font-normal text-sm hover:border-b-2 hover:border-b-blue-700 focus:text-blue-700 focus:border-b-blue-700">
              search
            </a>
          </li>
          <li>
            <a className="text-gray-700 cursor-pointer font-normal text-sm hover:border-b-2 hover:border-b-blue-700">
              about
            </a>
          </li>
          <li>
            <a className="text-gray-700 cursor-pointer font-normal text-sm hover:border-b-2 hover:border-b-blue-700">
              help
            </a>
          </li>
          <li>
            <a className="text-gray-700 font-normal text-sm hover:border-b-2 hover:border-b-blue-700">
              real estate agent
            </a>
          </li>
          <li>
            <a className="text-gray-700 font-normal text-sm hover:border-b-2 hover:border-b-blue-700">
              blog
            </a>
          </li>
        </ul>
      </div>

      <div className="flex space-x-5 items-center">
        <div className="text-sm font-semibold cursor-pointer">
          My favourites
        </div>
        {session ? (
          <div className="relative flex items-center space-x-2 cursor-pointer">
            <div className="w-10 h-10 bg-gray-500 rounded-full">
              <img
                src={session.user.image}
                alt="profile-image"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <span className="text-sm">{session.user.name}</span>
            <span onClick={() => setShow(!show)}>
              <RiArrowDropDownLine size={25} />
            </span>

            {show && (
              <div onClick={() => signOut()} className="absolute right-0 top-8  px-4 py-1 rounded-md-2 bg-white border border-red-600">
               <span className="text-sm text-black font-semibold capitalize hover:text-red-500">
                sign out
                </span> 
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="text-sm font-semibold cursor-pointer"
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
