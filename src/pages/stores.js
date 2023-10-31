import Store from "@/components/store/StoreComponent";
import styles from '@/styles/stores.module.css'
import withAuth from "@/hoc/withAuth";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export async function getStaticProps() {
  const response = await fetch(
    "https://aisthetic.co/api/codingchallenge/stores"
  );
  const stores = await response.json();

  return {
    props: { stores },
  };
}

function Stores({ stores }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStores, setFilteredStores] = useState(stores);

  useEffect(() => {
    if (searchTerm) {
      const filtered = stores.filter((store) =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStores(filtered);
    } else {
      setFilteredStores(stores);
    }
  }, [searchTerm, stores]);

  return (
    <div className={styles.storesContainer}>
      <header className={styles.header}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search Store location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <AiOutlineSearch className={styles.searchIcon} />
        </div>
        <div className={styles.btnContainers}>
          <button className={styles.appointmentBtn}>Book an appointment</button>
        </div>
      </header>
      {filteredStores.map((store, index) => (
        <Store key={index} storeData={store} searchTerm={searchTerm} />
      ))}
    </div>
  );
}

export default withAuth(Stores);
