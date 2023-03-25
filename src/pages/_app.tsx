import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useState } from 'react';
import { AuthProvider } from '@/context/AuthContext';





export default function App({ Component, pageProps }: AppProps) {
  



  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
