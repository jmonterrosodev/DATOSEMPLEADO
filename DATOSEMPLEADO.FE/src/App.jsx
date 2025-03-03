import { useEffect, useState } from "react";
import axios from './axios.js';
import { ToastContainer, toast } from "react-toastify";
import { FaPlus, FaTrash, FaEdit, FaEye } from "react-icons/fa";
import Modal from "react-modal";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import FormColaborador from "./FormColaborador";

Modal.setAppElement("#root");

function App() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [colaboradores, setColaboradores] = useState([]);
    const [colaborador, setColaborador] = useState({});

    useEffect(() => {
        axios.get("/colaborador")
            .then((response) => {
                setColaboradores(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const Toast = {
        success: (mensaje) => toast.success(mensaje),
        error: (mensaje) => toast.error(mensaje),
        info: (mensaje) => toast.info(mensaje),
        warning: (mensaje) => toast.warning(mensaje),
    };

    const verNivelRiesgo = (edad) => () => {
        if (edad < 18) {
            Toast.warning("EL COLABORADOR ES MENOR DE EDAD");
        } else if (edad >= 18 && edad <= 50) {
            Toast.info("FUERA DE PELIGRO");
        } else if (edad > 25 && edad <= 50) { 
            Toast.warning("TENGA CUIDADO, TOME TODAS LAS MEDIDAS DE PREVENCIÓN");
        } else if (edad > 50) {  
            Toast.error("POR FAVOR QUÉDESE EN CASA");
        }
    };

    const eliminarColaborador = (colaborador) => {
        setColaborador(colaborador);
        setModalIsOpen(true);
    };

    const confirmarEliminar = () => {
        axios.delete(`/colaborador/${colaborador.IDCOLABORADOR}`)
            .then((res) => {
              if (res.status !== 200) {
                Toast.error("Error al eliminar el colaborador");
                return;
              } else {
                axios.get("/colaborador")
                  .then((response) => {
                      setColaboradores(response.data);
                  })
                  .catch((error) => {
                      console.error(error);
                  });
              }
            })
            .catch((error) => {
                console.error(error);
            }
            );

        setModalIsOpen(false);
        Toast.success(`Colaborador ${ colaborador.NOMBRE } ${colaborador.APELLIDO} eliminado con éxito`);
        setColaborador({});
    };

    const cancelarEliminar = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <div>
              <div className="flex justify-between items-center p-4">
                    <h1 className="text-4xl font-semibold">
                        Listado de Colaboradores
                    </h1>
                    <Link to="/colaborador/nuevo" className="text-white bg-green-600 p-2 ml-3 rounded flex items-center">
                        <FaPlus className="mr-2"/> Agregar Colaborador
                    </Link>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <table className="table-auto border-collapse border border-cyan-800 mt-4">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Direccion</th>
                            <th>Edad</th>
                            <th>Profesion</th>
                            <th>Estado Civil</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colaboradores.length > 0 ? (
                            colaboradores.map((colaborador) => (
                                <tr key={colaborador.IDCOLABORADOR}>
                                    <td>{colaborador.NOMBRE}</td>
                                    <td>{colaborador.APELLIDO}</td>
                                    <td>{colaborador.DIRECCION}</td>
                                    <td>{colaborador.EDAD}</td>
                                    <td>{colaborador.PROFESION}</td>
                                    <td>{colaborador.ESTADOCIVIL}</td>
                                    <td className="flex justify-center">
                                        <button onClick={ verNivelRiesgo(colaborador.EDAD) } className="bg-yellow-700 text-white p-1 m-0.5 rounded flex items-center">
                                            Nivel de riesgo
                                            <FaEye className="ml-1" />
                                        </button>
                                        <Link to={`/colaborador/editar/${colaborador.IDCOLABORADOR}`} className="bg-teal-700 text-white p-1 m-0.5 rounded flex items-center">
                                            Editar
                                            <FaEdit className="ml-1" />
                                        </Link>
                                        <button
                                            className="bg-red-700 text-white p-1 m-0.5 rounded flex items-center"
                                            onClick={() => eliminarColaborador(colaborador)}
                                        >
                                            Eliminar
                                            <FaTrash className="ml-1" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No hay colaboradores</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ToastContainer
                theme="dark"
            />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={cancelarEliminar}
                contentLabel="Confirmar Eliminación"
                className="modal"
                overlayClassName="overlay"
            >
              <div className="items-center text-center m-4">
                <h2 className="text-3xl mb-5 font-bold">Eliminar Colaborador</h2>
                <p >¿Realmente desea eliminar el colaborador { colaborador.NOMBRE } { colaborador.APELLIDO } ?</p>
              </div>
              <div className="flex justify-center">
                <button className="bg-green-600 p-1 m-1 rounded" onClick={confirmarEliminar}>
                    Confirmar y eliminar
                </button>
                <button className="bg-red-700 p-1 m-1 rounded" onClick={cancelarEliminar}>No</button>
              </div>
            </Modal>
        </>
    );
}

export default App;
