import type { AppProps } from 'next/app';
import '@/styles/main.scss';
import Navbar from '@/components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="app-container">
      <Navbar />
      <main className="container">
        <Component {...pageProps} />
      </main>
    </div>
  );
}