import "bootstrap/dist/css/bootstrap.min.css"
export default function Header(){
    return (
        <div className="container mb-4 form-control">
            <div className="row g-3">
        <h1 className="col-md-10">Meetup</h1>
        <div className="col-md-2">
    
    <select type="text"  id="inputZip" aria-placeholder="Type of Event....">
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
        <option value="Both">Both</option>
    </select>
  </div>
        </div>
        </div>
    )
}