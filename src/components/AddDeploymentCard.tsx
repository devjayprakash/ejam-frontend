import React, { useState } from "react";
import { Card, Input, Col, Row, Button, Alert } from "antd";
import axios from "axios";
import { CREATE_NEW_DEPLOYMENT } from "../util/server-urls";
import { useDispatch } from "react-redux";
import { addDeploymentAction } from "../store/actions";
import { Deployment } from "../util/interface";

interface AddDeploymentCardProps {}

interface DeploymentInfos {
  name: string;
  versions: Array<string>;
  url: string;
  deploymentDate: Date | null;
}

const AddDeploymentCard: React.SFC<AddDeploymentCardProps> = () => {
  let [deploymentInfos, setDeploymentInfos] = useState<DeploymentInfos>({
    name: "",
    versions: [],
    url: "",
    deploymentDate: null,
  });

  let reset = () => {
    setDeploymentInfos({
      name: "",
      versions: [],
      url: "",
      deploymentDate: null,
    });
  };

  let [error, setError] = useState({
    show: false,
    msg: "",
  });

  let dispatch = useDispatch();

  let createNewDeployment = async () => {
    let problems = [];

    if (deploymentInfos.name === "") {
      problems.push("Name should not be empty");
    }
    if (deploymentInfos.url === "") {
      problems.push("Url should not be empty");
    }
    if (deploymentInfos.versions.length === 0) {
      problems.push("Add atleast one version");
    }

    if (problems.length === 0) {
      try {
        let res = await axios.post(CREATE_NEW_DEPLOYMENT, deploymentInfos);
        if (res.data.result) {
          let new_dep: Deployment = res.data.data;
          dispatch(addDeploymentAction(new_dep));
          reset();
        } else {
          setError({
            show: true,
            msg: res.data.msg,
          });
        }
      } catch (err) {
        setError({
          show: true,
          msg: "There was some network issue",
        });
      }
    } else {
      setError({
        show: true,
        msg: problems.join(" || "),
      });
    }
  };

  return (
    <div className={"mt-6"}>
      <Card>
        <div className="text-xl mb-3">Add a new deployment</div>
        {error.show && (
          <Alert
            message={error.msg}
            closable
            onClose={() =>
              setError({
                show: false,
                msg: "",
              })
            }
            type={"error"}
          />
        )}
        <div className="w-full">
          <Row>
            <Col className={"m-2"}>
              <div className="text-xs">Name</div>
              <Input
                value={deploymentInfos.name}
                onChange={(ev) => {
                  setDeploymentInfos({
                    ...deploymentInfos,
                    name: ev.target.value,
                  });
                }}
                placeholder={"Name"}
              />
            </Col>
            <Col className={"m-2"}>
              <div className={"text-xs"}>
                Version (use comma to seprate versions){" "}
              </div>
              <Input
                value={deploymentInfos.versions.join(",")}
                onChange={(ev) => {
                  setDeploymentInfos({
                    ...deploymentInfos,
                    versions: ev.target.value.split(","),
                  });
                }}
                type={"version"}
                placeholder={"Version"}
              />
            </Col>
            <Col className={"m-2"}>
              <div className="text-xs">Deployment date</div>
              <Input
                onChange={(ev) => {
                  setDeploymentInfos({
                    ...deploymentInfos,
                    deploymentDate: new Date(ev.target.value),
                  });
                }}
                type={"date"}
                placeholder={"Deployment date"}
              />
            </Col>
            <Col className={"m-2"}>
              <div className="text-xs">Url</div>
              <Input
                value={deploymentInfos.url}
                onChange={(ev) => {
                  setDeploymentInfos({
                    ...deploymentInfos,
                    url: ev.target.value,
                  });
                }}
                type={"url"}
                placeholder={"Url"}
              />
            </Col>
          </Row>
          <div className="m-3 space-x-3">
            <Button onClick={() => createNewDeployment()} type={"primary"}>
              Add Deployment
            </Button>
            <Button onClick={() => reset()} danger>
              Clear
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default AddDeploymentCard;
