import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrashAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { PatternFormat } from "react-number-format";

const Form = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const password = useRef(null);
  const birthday = useRef(null);

  const [edit, setEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!gender) {
      alert("Choose your gender");
      return;
    }

    if (!country) {
      alert("Select your country");
      return;
    }

    const parse_data = JSON.parse(localStorage.getItem("data")) || [];

    if (isEditing) {
      const updatedUser = {
        id: edit.id,
        fname,
        lname,
        username,
        phone,
        password: password.current.value,
        country,
        birthday: birthday.current.value,
        gender,
      };
      setData((prev) =>
        prev.map((item) => (item.id === edit.id ? updatedUser : item))
      );
      setEdit(null);
      setIsEditing(false);
    } else {
      const usernameExists = parse_data.some(
        (item) => item.username === username
      );
      if (usernameExists) {
        alert("Username already exists");
        return;
      }

      const newUser = {
        id: uuidv4(),
        fname,
        lname,
        username,
        phone,
        password: password.current.value,
        country,
        birthday: birthday.current.value,
        gender,
      };
      setData((prev) => [...prev, newUser]);
    }

    setUsername("");
    setFname("");
    setLname("");
    setPhone("");
    setGender("");
    setCountry("");
    password.current.value = "";
    birthday.current.value = "";
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    setUsername(item.username);
    setFname(item.fname);
    setLname(item.lname);
    setPhone(item.phone);
    setGender(item.gender);
    setCountry(item.country);
    password.current.value = item.password;
    birthday.current.value = item.birthday;
    setEdit(item);
    setIsEditing(true);
  };

  return (
    <div className="flex gap-5 min-h-screen p-20 bg-[url('assets/start.jpg')] bg-cover bg-center ">
      <form
        className="w-80 h-[100%] p-5  bg-gray-800 text-indigo-950 rounded-lg "
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-5 text-gray-100 text-center">
          {isEditing ? "Edit User" : "Create User"}
        </h2>

        <input
          required
          className="rounded-md outline-none w-full h-10 px-3 mb-3 border hover:bg-slate-400 "
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          type="text"
          placeholder="First name"
        />
        <input
          required
          className="rounded-md outline-none w-full h-10 px-3 mb-3 border focus:ring-2 focus:ring-green-800"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          type="text"
          placeholder="Last name"
        />
        <input
          required
          className="rounded-md outline-none w-full h-10 px-3 mb-3 border focus:ring-2 focus:ring-blue-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />

        <PatternFormat
          format="+998 ## ### ## ##"
          mask="_"
          required
          value={phone}
          onValueChange={(values) => setPhone(values.formattedValue)}
          placeholder="Phone number"
          className="rounded-md outline-none w-full h-10 px-3 mb-3 border focus:ring-2 focus:ring-blue-400"
        />

        <div className="relative mb-3">
          <input
            minLength={6}
            required
            className="rounded-md outline-none w-full h-10 px-3 border focus:ring-2 focus:ring-blue-400"
            ref={password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <div
            className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        <select
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="rounded-md outline-none w-full h-10 px-3 mb-3 border focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select your country</option>
          <option value="Uzbekistan">Uzbekistan</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Kyrgyzstan">Kyrgyzstan</option>
          <option value="Tajikistan">Tajikistan</option>
        </select>

        <div className="mb-3 text-gray-50 font-bold">
          <h4 className="mb-2">Gender:</h4>
          <div className="flex gap-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Male"
                checked={gender === "Male"}
                onChange={() => setGender("Male")}
                required
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Female"
                checked={gender === "Female"}
                onChange={() => setGender("Female")}
                required
              />
              Female
            </label>
          </div>
        </div>

        <input
          required
          ref={birthday}
          type="date"
          className="rounded-md outline-none w-full h-10 px-3 mb-3 border focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        />

        <button className="w-full rounded-md h-10 bg-slate-500 text-white font-bold hover:bg-green-800 transition">
          {isEditing ? "Save" : "Create"}
        </button>
      </form>

      <div className="flex-1 flex flex-wrap gap-6 items-start py-5 content-start">
        {data?.map((item) => (
          <div
            key={item.id}
            className="w-72 p-5 bg-[url('assets/dd7.webp')] rounded-lg shadow-lg flex flex-col gap-3 items-center"
          >
            <div className="w-20 h-20 bg-slate-500 rounded-full mx-auto"></div>
            <h3 className="font-bold text-xl text-lime-700">{item.fname}</h3>
            <h3 className="font-bold text-xl text-teal-500">{item.lname}</h3>
            <h3 className="font-bold text-xl text-purple-700">
              {item.username}
            </h3>
            <h4 className="font-medium text-violet-500">{item.phone}</h4>
            <h4 className="font-medium text-fuchsia-600">{item.password}</h4>
            <h4 className="font-medium text-pink-600">{item.country}</h4>
            <h4 className="font-medium text-blue-500">{item.gender}</h4>
            <h4 className="font-medium text-yellow-700">{item.birthday}</h4>
            <div className="flex gap-3 justify-center mt-3">
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-600 transition"
              >
                <FaTrashAlt />
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="text-green-800 hover:text-violet-950 transition"
              >
                <FiEdit3 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
