import React, { useState } from 'react';
import { useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const ForgetPasswordPage = () => {
    const { resetPassEmail } = useAuth();
    const [email, setEmail] = useState('');

    return (
      <div>
        <form
          className="fieldset"
          onSubmit={(e) => {
            e.preventDefault();
            resetPassEmail(email)
            .then(() => {
                Swal.fire(`Reset password mail send to  ${email}`);
            })
            .catch((err) => {
                console.log(err)
            })
          }}
        >
          <label className="label">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            required
            className="input"
            placeholder="Email"
          />
          <button type="submit" className="btn btn-primary mt-4">
            Continue
          </button>
        </form>
      </div>
    );
};

export default ForgetPasswordPage;