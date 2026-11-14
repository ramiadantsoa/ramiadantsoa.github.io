import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head />
      <body className="min-h-screen w-full bg-white text-gray-800 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}