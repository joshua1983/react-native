import { createStore } from 'redux';
import AppReducer from './modulos/core/reducers';

const store = createStore(AppReducer);

export default store;