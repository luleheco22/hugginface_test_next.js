import React, { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
type Props = {};

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit register");
  };

  return (
    <>
      <div className="text-left font-bold">GENIUS</div>
      <div className="py-36">
        <h2 className="text-3xl font-bold">Registrarse</h2>
        <div className="border-2 w-10 border-violet-500 inline-block mb-2"></div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
            <FaRegEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-gray-100 outline-none text-sm flex-1"
            />
          </div>
          <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
            <MdLockOutline className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-gray-100 outline-none text-sm flex-1"
            />
          </div>
          <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
            <MdLockOutline className="text-gray-400 mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Repetir Password"
              className="bg-gray-100 outline-none text-sm flex-1"
            />
          </div>
          <button
            type="submit"
            className="border-2 border-violet-500 text-violet-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-violet-500 hover:text-white"
          >
            Crear Cuenta
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
