import {Form, Link, redirect} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage.js";
import {FormRow, Logo, SubmitBtn} from "../components/index.jsx";
import customFetch from "../utils/customFetch.js";
import{toast} from "react-toastify";

export const action = async ({request}) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    try {
        await customFetch.post('auth/register',data)
        toast.success('Registration successful')
        return redirect('/login')
    }catch (error){
        toast.error(error?.response?.data?.msg)
        return error
    }
}

const Register = () => {

  return (
      <Wrapper>
          <Form method='post' className='form'>
              <Logo/>
              <h4>Register</h4>
              <FormRow type='text' name='name' defaultValue='John'/>
              <FormRow type='text' name='lastName' defaultValue='Smith' labelText='Last Name'/>
              <FormRow type='text' name='location' defaultValue='Earth'/>
              <FormRow type='email' name='email' defaultValue='john@email.com'/>
              <FormRow type='password' name='password' defaultValue='test123'/>

              <SubmitBtn/>
              <p>
                  Already a member ?
                  <Link to='/login'> Login </Link>
              </p>
          </Form>
      </Wrapper>

  );
};

export default Register;
