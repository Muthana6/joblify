import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";
import {useLoaderData} from "react-router-dom";
import {JobsContainer, SearchContainer} from "../components/index.jsx";
import {createContext, useContext} from "react";

export const loader = async ({request}) => {
    const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries()
    ])
    console.log(params)
    console.log(request.url)
    try {
        const {data} = await customFetch.get('/jobs',{params})
        // console.log(data, 'here')
        return {data, searchValues: {...params}}
    }catch (error) {
        toast.error(error?.response?.data?.msg)
        return error
    }
}

const ALlJobsContext = createContext()

const AllJobs = () => {
    const {data, searchValues} = useLoaderData()

    return (
        <ALlJobsContext.Provider value={{data, searchValues}}>
            <SearchContainer/>
            <JobsContainer/>
        </ALlJobsContext.Provider>
    );
};

export const useAllJobsContext = () => useContext(ALlJobsContext)

export default AllJobs;
