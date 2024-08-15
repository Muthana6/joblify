import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import {Form, Link, useSubmit} from "react-router-dom";
import {FormRow, FormRowSelect} from "./index.jsx";
import {JOB_SORT_BY, JOB_STATUS, JOB_TYPE} from "../../../util/constants.js";
import {useAllJobsContext} from "../pages/AllJobs.jsx";

const SearchContainer = () => {
    const {searchValues} = useAllJobsContext()
    const {search, jobStatus, jobType, sort} = searchValues
    const submit = useSubmit()

    const debounce = (onChange)=> {
        let timeout
        return(e) => {
            const form = e.currentTarget.form
            clearTimeout(timeout)
            timeout = setTimeout(()=> {
                onChange(form)
            },2000)
        }
    }
    return(
        <Wrapper>
            <Form className={`form`}>
                <h5 className={`form-title`}>search form</h5>
                <div className={`form-center`}>
                    <FormRow type={`search`} name={`search`} defaultValue={search} onChange={ debounce((form)=> {
                        submit(form)
                    }) }/>

                    <FormRowSelect onChange={(e)=>{
                        submit(e.currentTarget.form)
                    }} labelText={`job status`} name={`jobStatus`} list={[`all`, ...Object.values(JOB_STATUS)]} defaultValue={jobStatus} />

                    <FormRowSelect onChange={(e)=>{
                        submit(e.currentTarget.form)
                    }} labelText={`job type`} name={`jobType`} list={[`all`, ...Object.values(JOB_TYPE)]} defaultValue={jobType} />

                    <FormRowSelect onChange={(e)=>{
                        submit(e.currentTarget.form)
                    }}  name={`sort`} list={[ ...Object.values(JOB_SORT_BY)]} defaultValue={sort} />

                    <Link to={`/dashboard/all-jobs`} className={`btn form-btn delete-btn`}>
                        Reset Search Values
                    </Link>

                </div>
            </Form>
        </Wrapper>
    )
}

export default SearchContainer;
