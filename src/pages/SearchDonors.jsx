import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/axiosPublic";



const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchDonors = () => {
  const axiosPublic = useAxiosPublic();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
 
  const [donors, setDonors] = useState([]);

  useEffect(() => {
      // Fetch districts
      fetch("/districts.json")
        .then((res) => res.json())
        .then((data) => setDistricts(data[2].data))
        .catch((err) => console.error("Error loading districts:", err));
  
      // Fetch upazilas
      fetch("/upazilas.json")
        .then((res) => res.json())
        .then((data) => setUpazilas(data[2].data))
        .catch((err) => console.error("Error loading upazilas:", err));
    }, []);
  
    const selectedDistrict = districts.find(district => district.name === selectedDistrictName)
    
    useEffect(() => {
      const findUpazilas = upazilas.filter((upazila) => upazila.district_id === selectedDistrict.id);
      setFilteredUpazilas(findUpazilas)
    }, [selectedDistrict])
  const handleSearch = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const { bloodGroup, district, upazila } = Object.fromEntries(
      formData.entries()
    );
    console.log(bloodGroup, district, upazila)
    try {
      const res = await axiosPublic.get("/donors-search", {
        params: {
          bloodGroup,
          recipientDistrict: district,
          recipientUpazila: upazila,
        },
      });
      setDonors(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(donors);
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto min-h-[calc(100vh-324px-89px)]">
      <h2 className="text-2xl font-bold">Search Donors</h2>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        <div>
          <label className="label">Blood Group</label>
          <select
            name="bloodGroup"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">District</label>
          <select
            name="district"
            onChange={(e) => setSelectedDistrictName(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select District</option>
            {districts.map((d, i) => (
              <option key={i} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Upazila</label>
          <select
            name="upazila"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u, i) => (
              <option key={i} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button className="btn btn-primary w-full" type="submit">
            Search
          </button>
        </div>
      </form>

      {/* Results */}
      {donors.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full mt-6">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Blood Group</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, index) => (
                <tr key={donor._id}>
                  <td>{index + 1}</td>
                  <td>{donor.requesterName}</td>
                  <td>{donor.requesterEmail}</td>
                  <td>{donor.bloodGroup}</td>
                  <td>{donor.addressLine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {donors.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          No donors found for this search.
        </div>
      )}
    </div>
  );
};

export default SearchDonors;
