import SingleStore from "@/components/storeDetails/storeDetails";
import withAuth from "@/hoc/withAuth";

async function fetchSingleStoreById(storeId) {
  const response = await fetch(
    `https://aisthetic.co/api/codingchallenge/stores/${storeId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch store data");
  }
  const data = await response.json();
  return data;
}

function StorePage({ store }) {
  return <SingleStore store={store} />;
}

export async function fetchAllStoreIds() {
  const response = await fetch(
    "https://aisthetic.co/api/codingchallenge/stores"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch stores list");
  }
  const stores = await response.json();

  const ids = stores.map((store) => store._id.toString());
  return ids;
}

export async function getStaticPaths() {
  const allStoreIds = await fetchAllStoreIds();
  const paths = allStoreIds.map((storeId) => ({ params: { storeId } }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const store = await fetchSingleStoreById(params.storeId);

  return {
    props: {
      store,
    },
  };
}

export default withAuth(StorePage);
