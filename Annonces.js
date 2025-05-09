
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Annonces() {
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                <div className="text-lightBlue-500"> Welcome to awer site "Zoom Car"</div>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                ZoomCar is your trusted online destination for buying and selling cars — fast, simple, and stress-free. Whether you're looking to upgrade your ride, find your first car, or sell your current one, ZoomCar connects buyers and sellers in just a few clicks.

                With an easy-to-use platform, powerful search tools, and smart features, ZoomCar makes the process smooth from start to finish.

                List your car, explore thousands of options, or just browse around — at ZoomCar, your next ride is always just a zoom away.
              </p>
              
            </div>
          </div>
        </div>
      </section>
      <section className="pb-16 bg-blueGray-200 relative pt-32">
      <div
        className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
        style={{ transform: "translateZ(0)" }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-blueGray-200 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {carAnnonces.map((car) => (
            <div
              key={car.id}
              className="w-full md:w-6/12 lg:w-4/12 px-4 mb-8"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-blueGray-700 mb-2">
                    {car.title}
                  </h3>
                  <p className="text-orange-500 font-semibold text-lg mb-2">
                    {car.price}
                  </p>
                  <div className="flex flex-wrap text-sm text-blueGray-600 mb-2">
                    <div className="flex items-center mr-4">
                      <FaRoad className="mr-1" /> {car.mileage}
                    </div>
                    <div className="flex items-center mr-4">
                      <FaGasPump className="mr-1" /> {car.fuel}
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" /> {car.year}
                    </div>
                  </div>
                  <button className="mt-2 bg-lightBlue-500 hover:bg-lightBlue-600 text-white font-bold py-2 px-4 rounded w-full">
                    Voir l'annonce
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="pb-16 bg-blueGray-200 relative pt-32">
      <div
        className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
        style={{ transform: "translateZ(0)" }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-blueGray-200 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {carAnnonces.map((car) => (
            <div
              key={car.id}
              className="w-full md:w-6/12 lg:w-4/12 px-4 mb-8"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-blueGray-700 mb-2">
                    {car.title}
                  </h3>
                  <p className="text-orange-500 font-semibold text-lg mb-2">
                    {car.price}
                  </p>
                  <div className="flex flex-wrap text-sm text-blueGray-600 mb-2">
                    <div className="flex items-center mr-4">
                      <FaRoad className="mr-1" /> {car.mileage}
                    </div>
                    <div className="flex items-center mr-4">
                      <FaGasPump className="mr-1" /> {car.fuel}
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" /> {car.year}
                    </div>
                  </div>
                  <button className="mt-2 bg-lightBlue-500 hover:bg-lightBlue-600 text-white font-bold py-2 px-4 rounded w-full">
                    Voir l'annonce
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      <Footer />
    </>
  );
}
;
