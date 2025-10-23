"use client";
import { useState } from "react";
import { z } from "zod";

// ✅ Define validation schema with Zod
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .regex(/^(\+?\d{1,3}[- ]?)?\d{7,15}$/, "Invalid phone number format"),
  website: z
    .string()
    .min(1, "Website is required")
    .transform((val) => (val.startsWith("http") ? val : `https://${val}`)),
  street: z.string().min(1, "Street is required"),
  suite: z.string().min(1, "Suite is required"),
  city: z.string().min(1, "City is required"),
  zipcode: z.string().min(1, "Zipcode is required"),
  lat: z
    .string()
    .min(1, "Latitude is required")
    .refine((val) => !isNaN(Number(val)), { message: "Latitude must be a number" }),
  lng: z
    .string()
    .min(1, "Longitude is required")
    .refine((val) => !isNaN(Number(val)), { message: "Longitude must be a number" }),
  companyName: z.string().min(1, "Company name is required"),
  catchPhrase: z.string().min(1, "Catch phrase is required"),
  bs: z.string().min(1, "Business strategy is required"),
});

export default function CreateUserModal({ onClose, onUserCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    lat: "",
    lng: "",
    companyName: "",
    catchPhrase: "",
    bs: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = userSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      // ✅ Safe access to error list
      result.error?.issues?.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    const data = result.data;

    const newUser = {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      website: data.website,
      address: {
        street: data.street,
        suite: data.suite,
        city: data.city,
        zipcode: data.zipcode,
        geo: { lat: data.lat, lng: data.lng },
      },
      company: {
        name: data.companyName,
        catchPhrase: data.catchPhrase,
        bs: data.bs,
      },
    };

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("Failed to create user");

      const createdUser = await res.json();
      onUserCreated(createdUser);
      onClose();
    } catch (err) {
      console.error("Error creating user:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-2xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Create New User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* BASIC INFO */}
          <div className="grid grid-cols-2 gap-4">
            {["name", "username", "email", "phone", "website"].map((field) => (
              <div key={field}>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`border rounded-lg p-2 w-full ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>

          {/* ADDRESS */}
          <h3 className="text-lg font-medium text-gray-700 mt-4">Address</h3>
          <div className="grid grid-cols-2 gap-4">
            {["street", "suite", "city", "zipcode", "lat", "lng"].map((field) => (
              <div key={field}>
                <input
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`border rounded-lg p-2 w-full ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>

          {/* COMPANY */}
          <h3 className="text-lg font-medium text-gray-700 mt-4">Company</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "companyName", placeholder: "Company Name" },
              { name: "catchPhrase", placeholder: "Catch Phrase" },
              { name: "bs", placeholder: "Business Strategy" },
            ].map(({ name, placeholder }) => (
              <div key={name}>
                <input
                  type="text"
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  className={`border rounded-lg p-2 w-full ${
                    errors[name] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`px-4 py-2 rounded-lg text-white transition ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {submitting ? "Saving..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
