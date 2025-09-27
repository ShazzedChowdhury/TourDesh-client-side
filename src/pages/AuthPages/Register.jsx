import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { BiEnvelope, BiImageAdd, BiKey, BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router";
import happy from "../../assets/happy.json";
import Social from "../../components/Social";
import Title from "../../components/Title";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/axiosPublic";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, signIn, user, setUser, updateUser } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const password = watch("password");

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Upload avatar to imageBB
      const formData = new FormData();
      formData.append("image", data.avatar[0]);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_imageBB_api_key
        }`,
        formData
      );

      const avatarURL = imgRes.data.data.url;
      console.log("photourl", avatarURL)
      // Prepare user data
      const userData = {
        email: data.email,
        userName: data.name,
        photoURL: avatarURL,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        role: 'donor',
        status: "active",
      };

      //create account with firebase
      createUser(userData.email, data.password)
        .then(async (result) => {
          // Send to your backend API
          await axiosPublic.post("/add-user", userData);

          //update user to the firebase
          updateUser({ displayName: userData.userName, photoURL: userData.photoURL })
            .then((result) => {
              Swal.fire({
                title: "Registration successful",
                icon: "success",
                draggable: true,
              });
              reset();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });

    } catch (err) {
      console.error("Registration failed:", err);
        Swal.fire({
          title: "Something went wrong!",
          icon: "error",
          draggable: true,
        });

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">Email is required</p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">Name is required</p>
        )}

        <input
          type="file"
          accept="image/*"
          {...register("avatar", { required: true })}
          className="file-input file-input-bordered w-full"
        />
        {errors.avatar && (
          <p className="text-red-500 text-sm">Avatar is required</p>
        )}

        <input
          type="text"
          placeholder="Password"
          {...register("password", { required: true, minLength: 6 })}
          className="input input-bordered w-full"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">Min 6 characters</p>
        )}

        <input
          type="text"
          placeholder="Confirm Password"
          {...register("confirm_password", {
            required: true,
            validate: (value) => value === password || "Passwords do not match",
          })}
          className="input input-bordered w-full"
        />
        {errors.confirm_password && (
          <p className="text-red-500 text-sm">
            {errors.confirm_password.message}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="text-sm">
        Already have an account?
        <Link className="text-primary" to="/login">
          Log in
        </Link>{" "}
        now.
      </p>
    </div>
  );
};

export default Register;
