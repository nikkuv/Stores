import Link from "next/link";
import Image from "next/image";

function SingleStore({ store }) {
  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Header Section */}
      <header>
        <Link href="/stores">Back to All store</Link>
        <button>Book an appointment</button>
      </header>

      {/* Store Image and Name */}
      <div className="store-image-section">
        <Image
          src={store.imageURL}
          alt={store.name}
          width={1000}
          height={300}
          objectFit="cover"
        />
        <h2>{store.name}</h2>
      </div>

      {/* Store Description */}
      <p>{store.description}</p>

      {/* Details Section */}
      <div className="details-section">
        {/* Contact Details */}
        <div>
          <h3>Contact Details</h3>
          <p>{store.address.street}</p>
          <p>
            {store.address.code}, {store.address.state}, {store.address.country}
          </p>
          <p>{store.phone}</p>
          <p>{store.email}</p>
        </div>

        {/* Store Timings */}
        <div>
          <h3>Store Timings</h3>
          <div>
            {store.timing && (
              <>
                Open: {store.timings.open} <br />
                Close: {store.timings.close} <br />
                Closed: {store.timings.closed ? "Yes" : "No"}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleStore;
