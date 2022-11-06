import React from 'react';
// import { Ring } from '@uiball/loaders';

const Login = ({ handleShow }) => {
  return (
    <div
      className="relative z-40"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity"></div>

      <div className="fixed inset-0 z-10 grid place-items-center overflow-y-auto">
        <div className="flex min-h-full w-1/3 items-end justify-center text-center sm:items-center sm:p-0">
          {/* {loading && (
            <div className="absolute top-1/2 z-50">
              <Ring
                size={40}
                lineWeight={5}
                speed={2}
                color="black"
              />
            </div>
          )} */}

          <form
            // onSubmit={pinOptionPayment}
            className={`relative w-full transform space-y-12 overflow-hidden rounded-lg bg-white p-10 text-left shadow-xl transition-all sm:my-8`}
            // className={`${
            //   loading && `opacity-20`
            // } relative w-full transform space-y-12 overflow-hidden rounded-lg bg-white p-10 text-left shadow-xl transition-all sm:my-8`}
          >
            <div className="">
              <div className="">
                <div className="space-y-10 text-center sm:mt-0 sm:text-left">
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <h3
                        className="text-xl font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Welcome back
                      </h3>
                    </div>
                    <svg
                      onClick={() => handleShow('')}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 cursor-pointer hover:opacity-70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>

                  <div className="text-lg capitalize font-semibold">
                    {/* Complete your payment */}
                  </div>

                  <ul className="grid w-full gap-6">
                    <input
                      name="email"
                      // value={phone}
                      // onChange={handleChangePin}
                      type="text"
                      className="mt-0 w-full border-0 bg-transparent border-b-2 border-gray-200 px-0.5 focus:border-black focus:ring-0"
                      placeholder="Email"
                      required
                    />
                    <input
                      name="password"
                      // value={pin}
                      // onChange={handleChangePin}
                      type="password"
                      className="mt-0 w-full border-0 bg-transparent border-b-2 border-gray-200 px-0.5 focus:border-black focus:ring-0"
                      placeholder="Password"
                      required
                    />
                  </ul>
                </div>
              </div>
            </div>
            <div className="">
              <button
                type="submit"
                className="bg-black hover:bg-gray-600 text-white btn btn-block flex items-center justify-between rounded-md border-none px-6 py-4 capitalize"
              >
                <div>Login</div>
              </button>
              <button
                onClick={() => handleShow('register')}
                className="text-xs font-semibold"
              >
                Create account?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
