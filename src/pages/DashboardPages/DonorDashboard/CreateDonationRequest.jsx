import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../../hooks/useAuth";
import sweetMessage from "../../../Utils/sweetMessage";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const CreateDonationRequest = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const selectedDistrictId = watch("recipientDistrict");

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


  const filteredUpazilas = upazilas.filter(
    (upazila) => upazila.district_id === selectedDistrictId
  );

  const onSubmit = (data) => {
    const donationRequest = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: data.recipientName,
      recipientDistrict: districts.find((d) => d.id === data.recipientDistrict)
        ?.name,
      recipientUpazila: upazilas.find((u) => u.id === data.recipientUpazila)
        ?.name,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate.toISOString().split("T")[0],
      donationTime: data.donationTime.toTimeString().slice(0, 5),
      requestMessage: data.requestMessage,
      donationStatus: "pending",
    };

    console.log("Submitting:", donationRequest);
    
    //save into the database
    axiosSecure
      .post("/donation-request", donationRequest)
      .then((res) => {
       if(res.data.insertedId) {
        sweetMessage('Donation request created successfully.')
       }
      })
      .catch((err) => console.log(err));

    reset();
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4 text-primary">
        Create Donation Request
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div>
          <label className="label">Requester Name</label>
          <input
            className="input input-bordered w-full"
            type="text"
            value={user?.displayName || ""}
            readOnly
          />
        </div>

        <div>
          <label className="label">Requester Email</label>
          <input
            className="input input-bordered w-full"
            type="email"
            value={user?.email || ""}
            readOnly
          />
        </div>

        <div>
          <label className="label">Recipient Name</label>
          <input
            className="input input-bordered w-full"
            {...register("recipientName", {
              required: "Recipient name is required",
            })}
          />
          {errors.recipientName && (
            <p className="text-red-500 text-sm">
              {errors.recipientName.message}
            </p>
          )}
        </div>

        <div>
          <label className="label">District</label>
          <select
            className="select select-bordered w-full"
            {...register("recipientDistrict", { required: true })}
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Upazila</label>
          <select
            className="select select-bordered w-full"
            {...register("recipientUpazila", { required: true })}
            disabled={!selectedDistrictId}
          >
            <option value="">Select Upazila</option>
            {filteredUpazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.id}>
                {upazila.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Hospital Name</label>
          <input
            className="input input-bordered w-full"
            {...register("hospitalName", { required: true })}
          />
        </div>

        <div>
          <label className="label">Full Address</label>
          <input
            className="input input-bordered w-full"
            {...register("fullAddress", { required: true })}
          />
        </div>

        <div>
          <label className="label">Blood Group</label>
          <select
            className="select select-bordered w-full"
            {...register("bloodGroup", { required: true })}
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between">
          <div className="flex-1">
            <label className="label">Donation Date</label>
            <br />
            <Controller
              control={control}
              name="donationDate"
              rules={{ required: "Donation date is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select donation date"
                  minDate={new Date()}
                  className="input input-bordered w-full"
                />
              )}
            />
            {errors.donationDate && (
              <p className="text-red-500 text-sm">
                {errors.donationDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">Donation Time</label>
            <br />
            <Controller
              control={control}
              name="donationTime"
              rules={{ required: "Donation time is required" }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="hh:mm aa"
                  placeholderText="Select donation time"
                  className="input input-bordered w-full"
                />
              )}
            />
            {errors.donationTime && (
              <p className="text-red-500 text-sm">
                {errors.donationTime.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="label">Request Message</label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows="4"
            {...register("requestMessage", {
              required: "Please explain why you need the blood",
            })}
          />
          {errors.requestMessage && (
            <p className="text-red-500 text-sm">
              {errors.requestMessage.message}
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Submit Donation Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
