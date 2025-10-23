export const metadata = {
    title: 'My Users App',
    description: 'Next.js 15 App Router version',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body style={{ fontFamily: 'sans-serif', margin: 0 }}>
          {children}
        </body>
      </html>
    );
  }
  