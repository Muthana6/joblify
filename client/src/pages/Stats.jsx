import customFetch from "../utils/customFetch.js";
import {useLoaderData} from "react-router-dom";
import {StatsContainer} from "../components/index.jsx";
import ChartsContainer from "../components/ChartsContainer.jsx";

export const loader = async ()=>{
    try {
        const {data} = await customFetch.get('/jobs/stats')
        return data
    }catch (error) {
        return error
    }

    return null
}

const Stats = () => {
    const {defaultStats, monthlyApplications} = useLoaderData()
  return (
      <>
        <StatsContainer defaultStats = {defaultStats}/>
          {monthlyApplications?.length > 1 &&
              <ChartsContainer data={monthlyApplications} />
          }
      </>
  );
};

export default Stats;
