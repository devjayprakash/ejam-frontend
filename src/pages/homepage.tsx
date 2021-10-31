import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AddDeploymentCard from "../components/AddDeploymentCard";
import AllDeployment from "../components/AllDepoymentCard";
import Navbar from "../components/Navbar";
import { setAllDeploymentsAction } from "../store/actions";
import { FETCH_ALL_DEPLOYMENTS } from "../util/server-urls";

interface HomepageProps {}

const Homepage: React.SFC<HomepageProps> = () => {
  let dispatch = useDispatch();

  let fetchAllDeployments = async () => {
    try {
      let deployments = await axios.get(FETCH_ALL_DEPLOYMENTS);
      if (deployments.data.result) {
        dispatch(
          setAllDeploymentsAction({
            isLoading: false,
            isError: false,
            data: deployments.data.data,
          })
        );
      } else {
        setAllDeploymentsAction({
          isLoading: false,
          isError: true,
          data: [],
        });
      }
    } catch (err) {
      setAllDeploymentsAction({
        isLoading: false,
        isError: true,
        data: [],
      });
    }
  };

  useEffect(() => {
    fetchAllDeployments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={"min-h-screen bg-gray-50"}>
      <Navbar />
      <div className="mx-3 md:mx-24">
        <AddDeploymentCard />
        <AllDeployment />
      </div>
    </div>
  );
};
export default Homepage;
