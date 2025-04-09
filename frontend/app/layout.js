export const metadata = {
  title: 'Contact App',
  description: 'A contact management application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">
        <header>
          <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <a className="text-2xl font-bold text-gray-700 hover:text-gray-900" href="/">
                Contact App
              </a>
              
              <div className="flex space-x-4">
                <a
                  className="text-gray-700 hover:text-gray-900 font-medium"
                  href="/login"
                >
                  Login
                </a>
                <a
                  className="text-gray-700 hover:text-gray-900 font-medium"
                  href="/contacts"
                >
                  Contacts
                </a>
              </div>
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
