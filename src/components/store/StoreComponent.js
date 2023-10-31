import Link from "next/link";
import Image from "next/image";
import styles from "./StoreComponent.module.css";
import StoreTimingsDropdown from "../storeTimingComponent/StoreTimingsDropdown";

function highlightText(text, highlight) {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { backgroundColor: "yellow" }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
}

function Store({ storeData, searchTerm }) {
  const {
    name,
    phone,
    email,
    imageUrl,
    address: { street, state, country },
    timings,
  } = storeData;

  return (
    <div className={styles.store}>
      <Link href={`/stores/${storeData._id}`}>
        <Image
          src={imageUrl}
          alt={name}
          width={500}
          height={600}
          objectFit="cover"
        />
      </Link>
      <div className={styles.storeDetails}>
        <div className={styles.storeContent}>
          <Link className={styles.storeName} href={`/stores/${storeData._id}`}>
            {searchTerm ? highlightText(name, searchTerm) : name}
          </Link>
          <address className={styles.address}>
            {street}, <br />
            {state}, {country}
          </address>
          <div>
            <a className={styles.contact} href={`tel:${phone}`}>{phone}</a>
            <a className={styles.contact} href={`mailto:${email}`}>{email}</a>
          </div>
          <StoreTimingsDropdown timings={timings} />
        </div>
      </div>
    </div>
  );
}

export default Store;
