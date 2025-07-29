import React from 'react';

const ContactUsSection = () => {
   const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submit logic (e.g., send to database or email)
  };

  return (
    <section className="px-6 py-12 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="textarea textarea-bordered w-full h-32"
            required
          />
          <button className="btn btn-primary w-full">Send Message</button>
        </form>

        {/* Contact Info */}
        <div className="space-y-4 text-lg">
          <p className='font-semibold'>
            If you have any questions about donating or need emergency support,
            feel free to reach out:
          </p>
          <p>
            <strong>Phone:</strong> +880 1234-567890
          </p>
          <p>
            <strong>Email:</strong> support@bloodconnect.org
          </p>
          <p>
            <strong>Office Hours:</strong> Sat - Thu, 9:00 AM – 5:00 PM
          </p>
        </div>
      </div>
    </section>
  )
};

export default ContactUsSection;

