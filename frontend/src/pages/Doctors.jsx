import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();

  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);

  const [showFilter, setShowFilter] = useState("False");

  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the specialist doctors.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "General Physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-fuchsia-300 rounded transition-all cursor-pointer ${
              speciality === "General physician"
                ? "bg-fuchsia-100 text-black"
                : ""
            }`}
          >
            General Physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-fuchsia-300 rounded transition-all cursor-pointer  ${
              speciality === "Gynecologist" ? "bg-fuchsia-100 text-black" : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-fuchsia-300 rounded transition-all cursor-pointer ${
              speciality === "Dermatologist" ? "bg-fuchsia-100 text-black" : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-fuchsia-300 rounded transition-all cursor-pointer ${
              speciality === "Pediatricians" ? "bg-fuchsia-100 text-black" : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-fuchsia-300 rounded transition-all cursor-pointer ${
              speciality === "Neurologist" ? "bg-fuchsia-100 text-black" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-fuchsia-300 rounded transition-all cursor-pointer ${
              speciality === "Gastroenterologist"
                ? "bg-fuchsia-100 text-black"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>

        <div className="w-full grid grid-cols-auto gap-4 gap-y-6 ">
          {filterDoc.map((items, index) => (
            <div
              onClick={() => navigate(`/appointment/${items._id}`)}
              className="border border-fuchsia-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img
                className="bg-fuchsia-100"
                src={items.image}
                alt="doc image"
              />

              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center {$item.available? 'text-green-500:'bg-gray-500'}`}
                >
                  <p
                    className={`w-2 h-2 ${
                      items.available ? "bg-green-500" : "bg-gray-500"
                    }  rounded-full`}
                  >
                    {" "}
                  </p>
                  <p>{items.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="font-medium text-lg text-fuchsia-900">
                  {items.name}
                </p>
                <p className="text-fuchsia-700 text-sm">{items.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
