function estados(state = [], action){
    switch (action.type){
        case 'SET_LIBRO':
            return state.concat([action.text])
        case 'SET_NIVEL':
            return state.concat([action.text])
        case 'SET_UNIDAD':
            return state.concat([action.text])
        default:
            return state;

    }
}

export default estados;