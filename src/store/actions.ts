import { Deployment, DeploymentState } from "../util/interface";
import { ADD_DEPLOYMENT, ALL_DEPLOYMENTS, DELETE_DEPLOYMENT } from "./types";

export let setAllDeploymentsAction = (deploymentState: DeploymentState) => {
  return {
    payload: deploymentState,
    type: ALL_DEPLOYMENTS,
  };
};

export let addDeploymentAction = (deployment: Deployment) => {
  return {
    payload: deployment,
    type: ADD_DEPLOYMENT,
  };
};

export let deleteDeploymentAction = (id: string) => {
  return {
    payload: id,
    type: DELETE_DEPLOYMENT,
  };
};
