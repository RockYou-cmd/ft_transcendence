import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    optionalField: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      optionalField: '',
    });
  };

  return (
    <div className="w-[60%] mx-auto p-6  bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-white text-2xl mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div>
          <label htmlFor="name" className="text-white ">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-white">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label htmlFor="subject" className="text-white">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label htmlFor="message" className="text-white">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="optionalField" className="text-white">Optional Field:</label>
          <input
            type="text"
            id="optionalField"
            name="optionalField"
            value={formData.optionalField}
            onChange={handleInputChange}
            className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
