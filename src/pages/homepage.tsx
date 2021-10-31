import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddDeploymentCard from "../components/AddDeploymentCard";
import AllDeployment from "../components/AllDepoymentCard";
import CountDownCard from "../components/CountDownCard";
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

  let [timer, setTimer] = useState(0);

  let startTimer = () => {
    if (timer === 5) return;
    setTimer((state) => state + 1);

    setTimeout(() => {
      startTimer();
    }, 1000);
  };

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    fetchAllDeployments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={"min-h-screen bg-gray-50"}>
      <Navbar />
      <div className="mx-3 md:mx-24">
        <AddDeploymentCard />
        {timer <= 5 ? <CountDownCard countdown={timer} /> : <AllDeployment />}
      </div>
    </div>
  );
};
export default Homepage;
