import camposColaborador from './camposColaborador.js';

//validaciones de los campos del colaborador con los campos del objeto camposColaborador
const validaciones = (colaborador) => {
    const listaValidaciones = [];
    for (const campo in camposColaborador) {
        const { tipo, requerido } = camposColaborador[campo];
        if (requerido && !colaborador[campo]) {
            listaValidaciones.push(`El campo ${campo} es requerido`);
            if (colaborador[campo] && typeof colaborador[campo] !== tipo) {
                listaValidaciones.push(`El campo ${campo} debe ser de tipo ${tipo === 'string' ? 'texto' : 'número'}`);
            }
        } else if (colaborador[campo] && typeof colaborador[campo] !== tipo) {
            listaValidaciones.push(`El campo ${campo} debe ser de tipo ${tipo === 'string' ? 'texto' : 'número'}`);
        } else if (campo === 'EDAD' && colaborador[campo] <= 0) {
            listaValidaciones.push(`El campo ${campo} debe ser mayor de 0 años`);
        }
    }
    return listaValidaciones;
}

export default validaciones;