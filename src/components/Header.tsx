"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const Header: React.FC = () => {
  const { data: session } = useSession();
  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <h1 className="px-5 text-violet-700 font-bold text-2xl">GENIUS</h1>

      <div>
        {session ? (
          <div className="flex items-center">
            <p className="mr-2 font-bold text-slate-400 px-4">
              Hola{" "}
              <span className="text-violet-800 font-bold">
                {session.user?.name}
              </span>
            </p>
            <button
              type="button"
              className="border-2 border-violet-500 text-violet-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-violet-500 hover:text-white"
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};

export default Header;
