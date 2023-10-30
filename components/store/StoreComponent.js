import Link from 'next/link';
import Image from 'next/image'; 

function Store({ storeData }) {
  // Extract data from the passed in storeData
  const {
    name,
    phone,
    email,
    imageUrl,
    address: { street, state, country },
    timings,
  } = storeData;

  // Function to get today's opening and closing time
  const getTodayTiming = () => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const today = days[new Date().getDay()];
    const timing = timings[today];
    if (timing.closed) {
      return "Closed Today";
    }
    return `Open - Closes at ${timing.close}`;
  };

  return (
    <div>
      <Image
        src={imageUrl}
        alt={name}
        width={1000} 
        height={300}  
        objectFit="cover"
      />
      <Link href={`/stores/${storeData._id}`}>
        {name}
      </Link>
      <address>
        {street}, <br />
        {state}, {country}
      </address>
      <a href={`tel:${phone}`}>{phone}</a>
      <a href={`mailto:${email}`}>{email}</a>
      <p>{getTodayTiming()}</p>
      <button>Book an appointment</button>
    </div>
  );
}

export default Store;
