
const NotFound = () => {
  return (
  <>
  <div className="flex flex-col h-screen bg-white">
  <img
    src="https://i.ibb.co/yYyxQyW/404-page-error.png"
    alt=""
    className="object-cover w-full h-3/5"
  />

  <div className="flex items-center justify-center flex-1">
    <div className="max-w-xl px-4 py-8 mx-auto text-center">
      <h1 className="text-xl font-bold tracking-tight text-gray-800 sm:text-2xl">
        We did not find that page.
      </h1>

      <p className="mt-4 text-gray-500">
        Try searching again, or return home to start from the beginning.
      </p>

      <a
        href="/"
        className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring"
      >
        Go Back Home
      </a>
    </div>
  </div>
</div>
  </>
  )
}

export default NotFound