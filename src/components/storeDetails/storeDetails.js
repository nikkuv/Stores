import Link from "next/link";
import Image from "next/image";
import StoreTimingsDropdown from "../storeTimingComponent/StoreTimingsDropdown";
import styles from "./storeDetails.module.css";

function SingleStore({ store }) {
  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.singleStore}>
      {/* Header Section */}
      <header>
        <Link href="/stores">Back to All store</Link>
        <button>Book an appointment</button>
      </header>

      {/* Store Image and Name */}
      <div className={styles.singleStoreDetails}>
        <div>
          <Image
            src={store.imageUrl}
            alt={store.name}
            width={500}
            height={600}
            objectFit="cover"
          />
        </div>

        <div>
          <h2>{store.name}</h2>
          <p>{store.description}</p>
          <div className="details-section">
            {/* Contact Details */}
            <div>
              <h3>Contact Details</h3>
              <p>{store.address.street}</p>
              <p>
                {store.address.code}, {store.address.state},{" "}
                {store.address.country}
              </p>
              <p>{store.phone}</p>
              <p>{store.email}</p>
            </div>

            {/* Store Timings */}
            <div>
              <h3>Store Timings</h3>
              <div>
                <StoreTimingsDropdown timings={store.timings} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleStore;
