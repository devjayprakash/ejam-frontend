import { createStore } from "redux";
import deploymentReducer from "./reduer";

let store = createStore(deploymentReducer);

export default store;
