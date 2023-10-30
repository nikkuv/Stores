import Store from "@/components/store/StoreComponent";
import { signOut } from "@/lib/firebase";
import { useRouter } from "next/router";
import styles from "@/styles/stores.module.css";
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

  const router = useRouter();

  function handleSignOut() {
    signOut().then(() => {
      // Use the Next.js router to redirect after signing out
      router.push("/");
    });
  }

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

  // Render your stores here
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
        <div>
          <button>Book an appointment</button>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </header>
      {filteredStores.map((store, index) => (
        <Store key={index} storeData={store} searchTerm={searchTerm} />
      ))}
    </div>
  );
}

export default withAuth(Stores);
