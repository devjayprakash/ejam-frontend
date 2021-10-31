import React from "react";
import { Button, Card, notification, Table, Tag } from "antd";
import { formatDate } from "../util/helper";
import { useDispatch, useSelector } from "react-redux";
import { DeploymentReducer } from "../util/interface";
import axios from "axios";
import { DELETE_DEPLOYMENT_URL } from "../util/server-urls";
import { deleteDeploymentAction } from "../store/actions";

interface AllDeploymentProps {}

let { Column } = Table;

const AllDeployment: React.SFC<AllDeploymentProps> = () => {
  let deployments = useSelector(
    (state: DeploymentReducer) => state.deployments
  );

  let dispatch = useDispatch();

  if (deployments.isError) {
    return <h1>There was some error</h1>;
  }

  if (deployments.isLoading) {
    return <h1>Loading ..</h1>;
  }

  let deleteDeployment = async (id: string) => {
    try {
      let res = await axios.post(DELETE_DEPLOYMENT_URL, {
        id,
      });
      if (res.data.result) {
        dispatch(deleteDeploymentAction(id));
      } else {
        notification.error({
          message: "There was some issue during deleting the deployment.",
        });
      }
    } catch (err) {
      notification.error({
        message: "There was some issue during deleting the deployment.",
      });
    }
  };

  return (
    <Card className={"mt-6 overflow-x-auto"}>
      <div className="text-xl mb-3">All deployments</div>
      <Table
        loading={deployments.isLoading}
        pagination={false}
        dataSource={deployments.data}
      >
        <Column title={"Name"} key="name" dataIndex={"name"} />
        <Column title={"Url"} key="url" dataIndex={"url"} />
        <Column
          title={"Date"}
          key="deployedAt"
          dataIndex={"deployedAt"}
          render={(date) => <div>{formatDate(new Date(date))}</div>}
        />
        <Column
          title={"Versions"}
          key="versions"
          dataIndex={"versions"}
          render={(data) => {
            return (
              <div>
                {data.map((tag: string) => (
                  <Tag key={Math.random()}>{tag}</Tag>
                ))}
              </div>
            );
          }}
        />
        <Column
          title={"Actions"}
          dataIndex={"_id"}
          render={(id) => {
            return (
              <div>
                <Button
                  onClick={() => deleteDeployment(id)}
                  type={"primary"}
                  danger
                >
                  Delete
                </Button>
              </div>
            );
          }}
        />
      </Table>
    </Card>
  );
};
export default AllDeployment;
