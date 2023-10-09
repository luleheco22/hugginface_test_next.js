"use client";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Data, Info } from "../../interface/info";
import Detail from "@/components/Detail";

const GeniusPage: React.FC = () => {
  // Definir los estados iniciales
  const [infoAll, setInfotAll] = useState<Info | null>(null); // Información completa
  const [status, setStatus] = useState<string | null>(null); // Estado de procesamiento
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [currentPage, setCurrentPage] = useState<number>(1); // Página actual
  const itemsPerPage = 10; // Cantidad de elementos por página
  const startIndex = (currentPage - 1) * itemsPerPage; // Índice de inicio
  const endIndex = startIndex + itemsPerPage; // Índice de fin

  // Obtener los elementos a mostrar en la página actual
  const itemsToDisplay = infoAll?.data?.slice(startIndex, endIndex);

  // Obtener la información de la API
  const fetchData = async () => {
    setLoading(true);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/hugeface2`
    );
    if (res.data) {
      setInfotAll(res.data);
      setStatus(res.data.status);
      setLoading(false);
      localStorage.setItem("infoAll", JSON.stringify(res.data));
    }
  };

  /* Este useEffect se encarga de realizar la consulta a la API cada 30 segundos si el estado  
    "status" cumple con cierta condición. Además, si hay información almacenada en el localStorage,
    la carga en los estados correspondientes.
    */
  useEffect(() => {
    if (
      status &&
      parseInt(status.split("/")[0]) < parseInt(status.split("/")[1])
    ) {
      const interval = setInterval(() => {
        fetchData();
      }, 30000);
      return () => clearInterval(interval);
    }
    const storedInfoAll = localStorage.getItem("infoAll");
    if (storedInfoAll) {
      setInfotAll(JSON.parse(storedInfoAll));
      setStatus(JSON.parse(storedInfoAll).status);
    }
  }, [status]);

  // Consultar la información de la API
  const handleSubmit = async () => {
    setLoading(true);
    fetchData();
  };

  return (
    <div>
      <Header />
      <>
        <button
          onClick={handleSubmit}
          className={`ml-5 mb-10 border-2 border-violet-500 text-violet-500 rounded-md px-4 py-2 inline-block font-semibold hover:bg-violet-500 hover:text-white ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Consultar Data"}
        </button>

        <h1 className="text-center text-slate-800 mb-3">
          {status && `Data Procesada: ${status}`}
        </h1>
        <div className="flex justify-between px-10 gap-4">
          <div className="w-1/2 bg-slate-200">
            <div>
              <h1 className="text-3xl font-bold">Textos</h1>
              <div className="border-2 w-full border-violet-500 inline-block mb-2"></div>
              {itemsToDisplay?.map((item: Data, index: number) => (
                <div key={index}>
                  <p className="text-violet-800 mt-2">
                    Texto {item.position + 1}:
                  </p>
                  <h2 className="text-slate-500">{item.text.inputs}</h2>
                </div>
              ))}
              {infoAll?.data && (
                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${
                      currentPage === 1
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-violet-500 text-white hover:bg-violet-600 hover:text-white"
                    }`}
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!infoAll?.data || endIndex >= infoAll.data.length}
                    className={`px-4 py-2 rounded-md ${
                      !infoAll?.data || endIndex >= infoAll.data.length
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-violet-500 text-white hover:bg-violet-600 hover:text-white"
                    }`}
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-1/2 bg-violet-300">
            <h1 className="text-3xl font-bold">Detalle</h1>
            <div className="border-2 w-full border-slate-100 inline-block mb-2"></div>
            {itemsToDisplay?.map((item: Data, index: number) => (
              <div key={index}>
                <p className="text-violet-800 mt-4">
                  Texto {item.position + 1}:
                </p>
                <Detail details={item} />
              </div>
            ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default GeniusPage;
