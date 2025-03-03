//objeto de campos de colaborador
const  camposColaborador = {
    NOMBRE: {
        tipo: 'string',
        requerido: true,
    },
    APELLIDO: {
        tipo: 'string',
        requerido: true,
    },
    DIRECCION: {
        tipo: 'string',
        requerido: false,
    },
    EDAD: {
        tipo: 'number',
        requerido: true,
    },
    PROFESION: {
        tipo: 'string',
        requerido: false,
    },
    ESTADOCIVIL: {
        tipo: 'string',
        requerido: false,
    }
}

export default camposColaborador;