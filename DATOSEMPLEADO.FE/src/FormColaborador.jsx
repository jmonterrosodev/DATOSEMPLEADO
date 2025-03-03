import { FaSave } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "./axios.js";

function FormColaborador() {
    // Variables de formulario, colaborador y estado de la notificación
    const { id } = useParams();
    const navigate = useNavigate();
    const [colaborador, setColaborador] = useState({
        NOMBRE: "",
        APELLIDO: "",
        DIRECCION: "",
        EDAD: 0,
        PROFESION: "",
        ESTADOCIVIL: "",
    });
    const [errores, setErrores] = useState([]);

    useEffect(() => {
        if (id) {
            axios
                .get(`/colaborador/${id}`)
                .then((response) => {
                    setColaborador(response.data[0]);
                })
                .catch((error) => console.error(error));
        }
    }, [id]);

    const cambioValor = (e) => {
        setColaborador({
            ...colaborador,
            [e.target.name]: e.target.value,
        });
    };

    const guardarColaborador = () => {
        const colaboradorParseEdad = {
            ...colaborador,
            EDAD: isNaN(parseInt(colaborador.EDAD))
                ? colaborador.EDAD
                : parseInt(colaborador.EDAD),
        };

        if (id) {
            // Editar
            axios
                .put(`/colaborador/${id}`, {
                    colaborador: colaboradorParseEdad,
                })
                .then(() => {
                    setErrores([]);
                    toast.success("Colaborador actualizado", {
                        onClose: () => navigate("/")
                    });
                }).catch((error) => {
                    if (error.response && error.response.data) {
                        setErrores(error.response.data);
                    } else {
                        console.error(error);
                    }
                });
        } else {
            // Agregar
            axios
                .post("/colaborador", { colaborador: colaboradorParseEdad })
                .then((res) => {
                    if (res.status !== 200) {
                        toast.error("Error al agregar el colaborador");
                        return;
                    } else {
                        setErrores([])
                        toast.success("Colaborador actualizado", {
                            onClose: () => navigate("/")
                        });
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.data) {
                        setErrores(error.response.data);
                    } else {
                        console.error(error);
                    }
                })
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div>
                <h1 className="text-4xl text-center p-4 font-semibold">
                    {id ? "Editar" : "Agregar"} Colaborador
                </h1>
            </div>
            {errores.length > 0 && (
                <div className="bg-red-900 border border-red-300 text-white px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold text-center block text-white">Errores:</strong>
                    <ul className="list-disc list-inside text-left text-white">
                        {errores.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="text-lg">Nombres</label>
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="p-2 m-2 border border-cyan-800"
                        name="NOMBRE"
                        value={colaborador.NOMBRE}
                        onChange={cambioValor}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg">Apellidos</label>
                    <input
                        type="text"
                        placeholder="Apellido"
                        className="p-2 m-2 border border-cyan-800"
                        name="APELLIDO"
                        value={colaborador.APELLIDO}
                        onChange={cambioValor}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg">Direccion</label>
                    <input
                        type="text"
                        placeholder="Direccion"
                        className="p-2 m-2 border border-cyan-800"
                        name="DIRECCION"
                        value={colaborador.DIRECCION}
                        onChange={cambioValor}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg">Edad</label>
                    <input
                        type="number"
                        placeholder="Edad"
                        className="p-2 m-2 border border-cyan-800"
                        name="EDAD"
                        value={colaborador.EDAD}
                        onChange={cambioValor}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg">Profesion</label>
                    <input
                        type="text"
                        placeholder="Profesion"
                        className="p-2 m-2 border border-cyan-800"
                        name="PROFESION"
                        value={colaborador.PROFESION}
                        onChange={cambioValor}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-lg">Estado Civil</label>
                    <input
                        type="text"
                        placeholder="Estado Civil"
                        className="p-2 m-2 border border-cyan-800"
                        name="ESTADOCIVIL"
                        value={colaborador.ESTADOCIVIL}
                        onChange={cambioValor}
                    />
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={guardarColaborador}
                    className="text-white bg-green-600 p-2 mr-2 rounded flex items-center hover:text-emerald-100 hover:bg-emerald-900"
                >
                    <FaSave className="mr-2" />
                    {id ? "Actualizar" : "Agregar"} Colaborador
                </button>
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                    className="text-white bg-red-700 p-2 rounded flex items-center"
                >
                    Cancelar
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default FormColaborador;
