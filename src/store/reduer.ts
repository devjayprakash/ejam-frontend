import { Action, DeploymentReducer } from "../util/interface";
import { ADD_DEPLOYMENT, ALL_DEPLOYMENTS, DELETE_DEPLOYMENT } from "./types";

export const init_state: DeploymentReducer = {
  deployments: {
    isError: false,
    isLoading: false,
    data: [],
  },
};

export let deploymentReducer = (
  state = init_state,
  action: Action
): DeploymentReducer => {
  switch (action.type) {
    case ALL_DEPLOYMENTS:
      return {
        ...state,
        deployments: action.payload,
      };
    case ADD_DEPLOYMENT:
      return {
        ...state,
        deployments: {
          ...state.deployments,
          data: [...state.deployments.data, action.payload],
        },
      };
    case DELETE_DEPLOYMENT:
      return {
        ...state,
        deployments: {
          ...state.deployments,
          data: state.deployments.data.filter(
            (dep) => dep._id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default deploymentReducer;
