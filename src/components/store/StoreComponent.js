import Link from "next/link";
import Image from "next/image";
import styles from "./StoreComponent.module.css";
import StoreTimingsDropdown from "../storeTimingComponent/StoreTimingsDropdown";
import { useRef, useEffect } from "react";

function highlightText(text, highlight) {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { backgroundColor: "black", color: "white" }
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
  const storeRef = useRef(null);

  const {
    name,
    phone,
    email,
    imageUrl,
    address: { street, state, country },
    timings,
  } = storeData;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (storeRef.current) {
      observer.observe(storeRef.current);
    }

    return () => {
      if (storeRef.current) {
        observer.unobserve(storeRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.store} ref={storeRef}>
      <div className={styles.imgContainer}>
        <Link href={`/stores/${storeData._id}`}>
          <Image
            src={imageUrl}
            alt={name}
            width={500}
            height={600}
            objectFit="cover"
            layout="responsive"
          />
        </Link>
      </div>

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
            <a className={styles.contact} href={`tel:${phone}`}>
              {phone}
            </a>
            <a className={styles.contact} href={`mailto:${email}`}>
              {email}
            </a>
          </div>
          <StoreTimingsDropdown timings={timings} />
        </div>
      </div>
    </div>
  );
}

export default Store;
