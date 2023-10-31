import Link from "next/link";
import Image from "next/image";
import StoreTimingsDropdown from "../storeTimingComponent/StoreTimingsDropdown";
import { signOut } from "@/lib/firebase";
import styles from "@/components/storeDetails/storeDetails.module.css"
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";

function SingleStore({ store }) {
  if (!store) {
    return <div>Loading...</div>;
  }

  const router = useRouter();

  function handleSignOut() {
    signOut().then(() => {
      router.push("/");
    });
  }

  return (
    <div className={styles.singleStore}>
      <header className={styles.header}>
        <div className={styles.back}>
          <AiOutlineArrowLeft />
          <Link className={styles.backToStoreLink} href="/stores">
            Back to All store
          </Link>
        </div>
        <div>
          <button className={styles.appointmentBtn}>Book an appointment</button>
          <button className={styles.signOut} onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </header>

      <div className={styles.singleStoreDetails}>
        <div className={styles.imgContainer}>
          <Image
            src={store.imageUrl}
            alt={store.name}
            width={500}
            height={600}
            objectFit="cover"
            layout="responsive"
          />
        </div>
        <div className={styles.storeWrapper}>
          <div className={styles.storeContent}>
            <h2 className={styles.storeHeading}>{store.name}</h2>
            <p className={styles.description}>{store.description}</p>
            <div className={styles.detailsSection}>
              <div className={styles.contactWrapper}>
                <div className={styles.subHeadingSection}>
                  <h3 className={styles.subHeading}>Contact Details</h3>
                  <div className={styles.description}>
                    <p>{store.address.street}</p>
                    <p>
                      {store.address.code}
                      {store.address.state},{store.address.country}
                    </p>
                  </div>
                  <div className={styles.contact}>
                    <p>{store.phone}</p>
                    <p>{store.email}</p>
                  </div>
                </div>
                <div>
                  <h3 className={styles.subHeading}>Store Timings</h3>
                  <div className={styles.dropdown}>
                    <StoreTimingsDropdown timings={store.timings} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleStore;
