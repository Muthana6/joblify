import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";
import {useLoaderData} from "react-router-dom";
import {JobsContainer, SearchContainer} from "../components/index.jsx";
import {createContext, useContext} from "react";

export const loader = async () => {
    try {
        const {data} = await customFetch.get('/jobs')
        // console.log(data, 'here')
        return {data}
    }catch (error) {
        toast.error(error?.response?.data?.msg)
        return error
    }
}

const ALlJobsContext = createContext()

const AllJobs = () => {
    const {data} = useLoaderData()

    return (
        <ALlJobsContext.Provider value={{data}}>
            <SearchContainer/>
            <JobsContainer/>
        </ALlJobsContext.Provider>
    );
};

export const useAllJobsContext = () => useContext(ALlJobsContext)

export default AllJobs;
