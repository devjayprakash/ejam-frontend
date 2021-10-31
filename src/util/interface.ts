export interface Deployment {
  _id: string;
  name: string;
  versions: [string];
  url: string;
}

export interface DeploymentsState {
  data: Array<Deployment>;
  isLoading: boolean;
  isError: boolean;
}

export interface DeploymentReducer {
  deployments: DeploymentState;
}

export interface DeploymentState {
  isLoading: boolean;
  data: Array<Deployment>;
  isError: boolean;
}

export interface Action {
  payload: any;
  type: string;
}
