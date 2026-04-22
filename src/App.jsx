import Header from "./components/Header"
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";



function App() {

  const [type, setType] = useState("Both");

  const [listingName, setListingName] = useState("");
 
  
  const {data, loading, error} = useFetch("https://events-listing-backend.vercel.app/listings");
        console.log("Fetched Data:", data);
    
   
        
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data?.listings) return <p>No Listings found</p>; 
  
const filteredByType =
  type === "Both"
    ? data.listings
    : data.listings.filter(
        (listing) =>
          listing.eventType.toLowerCase() === type.toLowerCase()
      );

  const finalDisplay =
  listingName.trim() === ""
    ? filteredByType
    : filteredByType.filter((listing) =>
        listing.eventName?.toLowerCase().includes(listingName.toLowerCase().trim()) ||  
       listing.eventTag?.some(tag =>
          tag.toLowerCase().includes(searchTerm)
        )
      );
  return (
    <>
     <div className="container mt-4">
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2  style={{color: "red", fontStyle: "Pacifico", fontFamily: "cursive"}} className="fw-bolder fs-1">MeetUp</h2>
         <input   
        type="text"
        className="form-select-lg mb-3" 
        aria-label="Large select example"   
        placeholder="Search using Title"
        onChange={(event)=> setListingName(event.target.value)}>  
      </input>
      </div>
        <hr />
        <br />
      {/* Grid */}
      <div className="row">

         <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fs-1 fw-bolder ">MeetUp Events</h2>
         <select   className="form-select-lg mb-3" 
        aria-label="Large select example"   
         placeholder="Select Event Type Online of Offline"
        onChange={(event)=> setType(event.target.value)}>
          <option value={""} disabled selected>Select Event Type</option>
          <option value="Both">Both</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
      </div>
{ finalDisplay.length === 0 ? (
  <p>Could Not Find the searched Listing Title</p>
) : (
        finalDisplay.map((listing) => (
          <div key={listing._id} className="col-md-4 mb-4">
            
            <div className="card h-100 shadow-sm border-0 rounded-4">
              
              {/* Image */}
              <div className="position-relative">
                <img
                  src={listing.imageUrl}
                  className="card-img-top rounded-top-4"
                  alt={listing.eventName}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                {/* Badge */}
                <span className="badge bg-light text-dark position-absolute top-0 start-0 m-2">
                  {listing.eventType === "Online" ? "Online Event" : "Offline Event"}
                </span>
              </div>

              {/* Card Body */}
              <div className="card-body">
                <p className="text-muted mb-1" style={{ fontSize: "0.9rem" }}>
  {listing.eventStart
    ? `${new Date(listing.eventStart).toDateString()} • ${new Date(
        listing.eventStart
      ).toLocaleTimeString()}`
    : "Date not available"}
</p>

               
                <h5 className="fw-bold"> 
                <Link to={`/listingDetails/${listing._id}`} > {listing.eventName}</Link>
                </h5>
                
                <p className="text-muted mb-1">{listing.location}</p>
              </div>
              </div>

            </div>

          
        )))}
      </div>
    </div>
    </>
  )
}

export default App
