export default function Custom404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold tracking-tight mb-4">404 👁️‍🗨️</h1>
        <p className="text-xl mb-8">Page Not Found</p>
        <p className="text-gray-400 mb-4">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 mt-4 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
