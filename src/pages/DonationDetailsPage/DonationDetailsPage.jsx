import { useQuery } from '@tanstack/react-query';
import { useLoaderData, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../shared/loading';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import sweetMessage from '../../Utils/sweetMessage';

const DonationDetailsPage = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()
     const [loading, setLoading] = useState(true);
     const [showModal, setShowModal] = useState(false);
    const { data: request={}, isLoading, refetch } = useQuery({
      queryKey: ["request-details", id],
      queryFn: async () => {
        const res = await axiosSecure.get(`/donation-request/${id}`);
        return res.data; 
      },
    });

   
    const handleConfirmDonation = async () => {
      try {
        console.log("working.......")
       const res =  await axiosSecure.patch(`/update-request-status/${id}`, {
          status: "inprogress",
          //   donorName: user.displayName,
          //   donorEmail: user.email,
        });

        console.log(res.data)
        sweetMessage("Donation confirmed!");
        setShowModal(false)
        refetch()
       
      } catch (error) {
        sweetMessage("Something went wrong!", error);
      }
    };


    if(isLoading) {
        return <Loading />
    }

    console.log(request)
    return (
      <div className="p-6 space-y-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold">Donation Request Details</h2>
        <div className="border p-4 rounded shadow">
          <p>
            <strong>Recipient Name:</strong> {request.recipientName}
          </p>
          <p>
            <strong>Location:</strong> {request.addressLine}
          </p>
          <p>
            <strong>Blood Group:</strong> {request.bloodGroup}
          </p>
          <p>
            <strong>Date:</strong> {request.donationDate}
          </p>
          <p>
            <strong>Time:</strong> {request.donationTime}
          </p>
          <p>
            <strong>Status:</strong> {request.donationStatus}
          </p>
          <button
            disabled={request.donationStatus !== "pending"}
            className="btn btn-primary mt-4"
            onClick={() => setShowModal(true)}
          >
            Donate
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
              <h3 className="text-lg font-semibold mb-4">Confirm Donation</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleConfirmDonation();
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-sm font-medium">
                    Donor Name
                  </label>
                  <input
                    type="text"
                    value={user.displayName}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Donor Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
};

export default DonationDetailsPage;