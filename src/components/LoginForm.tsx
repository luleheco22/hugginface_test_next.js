"use client";
import React from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "http://localhost:3000/genius" });
  };

  return (
    <>
      <div className="text-left font-bold">GENIUS</div>
      <div className="py-36">
        <h2 className="text-3xl font-bold">
          {session ? "Cerrar Sesión " : "Iniciar Sesión"}
        </h2>
        <div className="border-2 w-10 border-violet-500 inline-block mb-2"></div>

        <div className="flex flex-col items-center">
          {session ? (
            <button
              className="border-2 border-violet-500 text-violet-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-violet-500 hover:text-white"
              onClick={() => signOut()}
            >
              Cerar Sesión
            </button>
          ) : (
            <button
              className="border-2 border-violet-500 text-violet-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-violet-500 hover:text-white"
              onClick={handleSignIn}
            >
              <FcGoogle />
            </button>
          )}
          {/* <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
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
          <button className="border-2 border-violet-500 text-violet-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-violet-500 hover:text-white">
            Iniciar Sesión
          </button> */}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
