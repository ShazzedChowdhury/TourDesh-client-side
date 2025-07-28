import React from 'react';
import Swal from 'sweetalert2';

const sweetMessage = (content, icon="success") => {
  return Swal.fire({
    position: "center",
    icon: icon,
    title: content,
    showConfirmButton: false,
    timer: 1500,
  });
};

export default sweetMessage;