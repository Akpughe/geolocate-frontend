import '../styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SessionProvider } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast';
import {useEffect, useState} from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Toaster />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
