import {Form, redirect, useOutletContext} from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import {FormRow, FormRowSelect, SubmitBtn} from "../components/index.jsx";
import {JOB_STATUS, JOB_TYPE} from "../../../util/constants.js";
import customFetch from "../utils/customFetch.js";
import {toast} from "react-toastify";

export const action = async ({request}) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
        await customFetch.post('/jobs', data)
        toast.success('job added successfully')
        return redirect('/dashboard/all-jobs')
    }catch (error){
        toast.error(error?.response?.data?.msg)
        return error
    }
}

const AddJob = () => {
    const {user} = useOutletContext()


    return (
        <Wrapper>
            <Form method="post" className='form'>
                <h4 className="form-title">
                    add job
                </h4>

                <div className="form-center">
                    <FormRow  type="text" name="position" />
                    <FormRow  type="text" name="company" />
                    <FormRow  type="text" name="jobLocation" labelText="job location" defaultValue={user?.location}/>

                    <FormRowSelect name="jobStatus" labelText="jobStatus" defaultValue={JOB_STATUS.PENDING} list={Object.values(JOB_STATUS)}/>
                    <FormRowSelect name="jobType" labelText="job type" defaultValue={JOB_TYPE.FULL_TIME} list={Object.values(JOB_TYPE)}/>
                    <SubmitBtn formBtn />

                </div>
            </Form>
        </Wrapper>
    );
};

export default AddJob;
