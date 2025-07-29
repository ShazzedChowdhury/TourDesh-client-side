import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import sweetMessage from "../Utils/sweetMessage";


const EditProfile = () => {
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const { user, updateUser } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const selectedDistrict = watch("district");

  


  useEffect(() => {
    // Load district and upazila data from public folder
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data[2].data));

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data[2].data));
  }, []);

  useEffect(() => {
    const filtered = upazilas.filter(
      (up) => up.district_id === selectedDistrict
    );
    setFilteredUpazilas(filtered);
  }, [selectedDistrict, upazilas]);

  const onSubmit = async (data) => {
    console.log(data)
    try {
     const res = await axiosSecure.patch("/profile-update", data);
     if(res.data.modifiedCount){
        updateUser({ displayName: data.userName, photoURL: data.photoURL })
        .then(() => {
            sweetMessage("Profile updated successfully.")
        })
        .catch(err => console.log(err))
        setIsEditing(false);
     }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Profile Information</h2>
        {!isEditing ? (
          <button
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </button>
        )}
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Name</label>
          <input
            defaultValue={user?.displayName}
            {...register("userName", { required: true })}
            className="input input-bordered w-full"
            disabled={!isEditing}
          />
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}
        </div>

        <div>
          <label className="label">Email</label>
          <input
            defaultValue={user?.email}
            {...register("email")}
            className="input input-bordered w-full"
            disabled
          />
        </div>

        <div>
          <label className="label">District</label>
          <select
            defaultValue={user?.displayName}
            {...register("district", { required: true })}
            className="select select-bordered w-full"
            disabled={!isEditing}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.district && (
            <span className="text-red-500">District is required</span>
          )}
        </div>

        <div>
          <label className="label">Upazila</label>
          <select
            {...register("upazila", { required: true })}
            className="select select-bordered w-full"
            disabled={!isEditing}
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
          {errors.upazila && (
            <span className="text-red-500">Upazila is required</span>
          )}
        </div>

        <div>
          <label className="label">Blood Group</label>
          <select
            {...register("bloodGroup", { required: true })}
            className="select select-bordered w-full"
            disabled={!isEditing}
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
          {errors.bloodGroup && <span className="text-red-500">Required</span>}
        </div>

        <div>
          <label className="label">Avatar URL</label>
          <input
            defaultValue={user?.photoURL}
            {...register("photoURL")}
            className="input input-bordered w-full"
            disabled={!isEditing}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
