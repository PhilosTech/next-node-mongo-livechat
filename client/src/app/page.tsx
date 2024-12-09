import Image from "next/image";

export default function HomePage() {
  const isAuthenticated = false;

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute w-32 h-32 text-indigo-500 opacity-30 animate-float"
          style={{ top: "10%", left: "20%" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" fill="currentColor" />
        </svg>

        <svg
          className="absolute w-40 h-40 text-purple-500 opacity-30 animate-float-reverse"
          style={{ top: "50%", left: "70%" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <polygon points="50,0 100,100 0,100" fill="currentColor" />
        </svg>

        <svg
          className="absolute w-24 h-24 text-pink-500 opacity-30 animate-float"
          style={{ top: "70%", left: "40%" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path
            d="M50 0 L61 35 H98 L68 57 L79 92 L50 72 L21 92 L32 57 L2 35 H39 L50 0"
            fill="currentColor"
          />
        </svg>
      </div>

      <header className="z-10 bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">LiveChat</h1>
          <nav>
            <a
              href="/about"
              className="text-gray-700 hover:text-indigo-500 px-4"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-indigo-500 px-4"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="z-10 flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome to LiveChat
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Connect with friends and colleagues in real-time.
          </p>
          <div className="space-x-4">
            {isAuthenticated ? (
              <a
                href="/chat"
                className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none"
              >
                Go to Chat
              </a>
            ) : (
              <>
                <a
                  href="/login"
                  className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="z-10 bg-gray-200 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} LiveChat. All rights reserved.
          </p>
        </div>
      </footer>

      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <svg
          className="w-full h-full animate-spin-slow"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.3"
            d="M0,96L60,112C120,128,240,160,360,176C480,192,600,192,720,186.7C840,181,960,171,1080,138.7C1200,107,1320,53,1380,26.7L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
