import Store from "../../components/store/StoreComponent";
import { signOut } from "../../lib/firebase";
import { useRouter } from 'next/router';

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

  const router = useRouter();

  function handleSignOut() {
    signOut().then(() => {
      // Use the Next.js router to redirect after signing out
      router.push('/');
    });
  }

  // Render your stores here
  return <div>
      <h1>Stores</h1>
      <button onClick={handleSignOut}>Sign Out</button>
      {stores.map((store, index) => <Store key={index} storeData={store} />)}
  </div>;
}

export default Stores;


