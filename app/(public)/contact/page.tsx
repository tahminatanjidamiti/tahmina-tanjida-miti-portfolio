/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    emailjs
      .send(
        process.env.NEXT_PUBLIC_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
        {
          name: form.name,
          email: form.email,
          title: form.subject,
          message: form.message,
        },
         process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setForm({ name: "", email: "", subject: "", message: "" });
          setLoading(false);
        },
        (err) => {
          console.error(err);
          setStatus("Failed to send message. Try again later.");
          setLoading(false);
        }
      );
  };

  return (
    <div>
       <h1 className="text-3xl font-extrabold text-center my-6 pt-6">Contact me?!</h1>
      <form onSubmit={handleSubmit} className="my-10 space-y-4 w-11/12 md:w-8/12 mx-auto p-6 bg-linear-to-br from-gray-900 from-5% via-yellow-700 to-gray-900 rounded">
      <input
        required
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="w-full p-2 rounded bg-white dark:bg-black border border-amber-500"
      />
      <input
        required
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Your Email"
        className="w-full p-2 rounded bg-white dark:bg-black border border-amber-500"
      />
      <input
        name="subject"
        value={form.subject}
        onChange={handleChange}
        placeholder="Subject"
        className="w-full p-2 rounded bg-white dark:bg-black border border-amber-500"
      />
      <textarea
        required
        name="message"
        value={form.message}
        onChange={handleChange}
        rows={5}
        placeholder="Your Message"
        className="w-full p-2 rounded bg-white dark:bg-black border border-amber-500"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-linear-to-r from-gray-700 from-5% via-amber-500 to-gray-700 hover:bg-linear-to-r hover:from-gray-900 hover:from-5% hover:via-amber-500 hover:to-gray-900 py-2 rounded border border-amber-500 hover:font-extrabold hover:text-white dark:hover:text-black"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
      {status && <p className="text-center mt-2 text-green-500">{status}</p>}
    </form>
    </div>
  );
}
