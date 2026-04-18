import { useParams } from "react-router-dom"
import useFetch from "../useFetch";
export default function ListingDetails(){
    const listingId = useParams();
    const {data, loading, error} = useFetch(`https://events-listing-backend.vercel.app/listings/${listingId.id}`);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
        if (!data) return <p>No Listing with the given id {listingId.id} found</p>;
    
console.log("Listing data is as follows: ",data);
const listing = data.listings || data; 
    return (
        <div>
            <div className="container mt-4">
      <div className="row">

        {/* LEFT SIDE */}
        <div className="col-md-8">

          <h2 className="fw-bold">{listing.eventName}</h2>

          <p className="text-muted">
            Hosted By: <strong>{listing.hoastedBy}</strong>
          </p>

          <img
            src={listing.imageUrl}
            alt={listing.eventName}
            className="img-fluid rounded mb-3"
          />

          {/* Details */}
          <h4 className="fw-bold">Details:</h4>
          <p>{listing.Details}</p>

          {/* Additional Info */}
          <h4 className="fw-bold mt-4">Additional Information:</h4>
          <p><strong>Dress Code:</strong> {listing.dressCode}</p>
          <p><strong>Age Restrictions:</strong> {listing.ageRestriction}</p>

          {/* Tags */}
          <h4 className="fw-bold mt-4">Event Tags:</h4>
          <div>
            {listing.eventTag?.map((tag, index) => (
              <span key={index} className="badge bg-danger me-2 p-2">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-md-4">

          {/* Info Card */}
          <div className="card p-3 shadow-sm mb-4">
            <p>
              🕒 {new Date(listing.eventStart).toLocaleString()} <br />
              to {new Date(listing.eventEnd).toLocaleString()}
            </p>

            <p>📍 {listing.location}</p>

            <h5>₹ 3000</h5>
          </div>

          {/* Speakers */}
          <h4 className="fw-bold">Speakers:</h4>
          <div className="row">
            {listing.speakers?.map((speaker) => (
              <div key={speaker._id} className="col-6 mb-3">
                <div className="card text-center p-2 shadow-sm">
                  <img
                    src={speaker.profileImage}
                    alt={speaker.name}
                    className="rounded-circle mx-auto"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover"
                    }}
                  />
                  <h6 className="mt-2">{speaker.name}</h6>
                  <p className="text-muted small">
                    {speaker.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RSVP Button */}
          <button className="btn btn-danger w-100 mt-3">
            RSVP
          </button>

        </div>

      </div>
    </div>
        </div>
    )
}