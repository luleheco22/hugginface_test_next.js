"use client";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useState } from "react";

export default function Home() {
  const [login, setLogin] = useState(true);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-slate-200 rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            {login ? <LoginForm /> : <RegisterForm />}
          </div>
          <div className="w-2/5 bg-violet-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Bienvenido Amigo!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">
              {!login
                ? "Inicia sesión con tu cuenta para empezar a disfrutar de nuestros servicios."
                : "Registrate con tu cuenta para empezar a disfrutar de nuestros servicios."}
            </p>
            <button
              onClick={() => setLogin(!login)}
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-violet-500"
            >
              {!login ? "Iniciar Sesión" : "Registrarse"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
