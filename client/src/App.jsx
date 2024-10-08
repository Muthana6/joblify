import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {
    HomeLayout,
    Landing,
    Register,
    Login,
    AddJob,
    Stats,
    AllJobs,
    Profile,
    Admin,
    Error,
    DashboardLayout,
    EditJob
} from './pages'

import {action as registerAction} from "./pages/Register.jsx";
import {action as loginAction} from "./pages/Login.jsx";
import {action as addJobAction} from "./pages/AddJob.jsx";
import {action as editJobAction} from "./pages/EditJob.jsx";


import {loader as dashboardLoader} from "./pages/DashboardLayout.jsx";
import {loader as allJobsLoader} from "./pages/AllJobs.jsx"
import {loader as editJobLoader} from "./pages/EditJob.jsx"


const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem("darkTheme") === 'true';
    document.body.classList.toggle('dark-theme', isDarkTheme);
    return isDarkTheme;
}

const isDarkThemeEnabled = checkDefaultTheme()
const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout/>,
        errorElement:<Error/> ,
        children: [
            {
                index: true,
                element: <Landing/>
            },
            {
                path: 'register',
                element: <Register/>,
                action: registerAction
            },
            {
                path: 'login',
                element: <Login/>,
                action: loginAction
            },
            {
                path: 'dashboard',
                element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled}/>,
                loader: dashboardLoader,
                children:[
                    {
                        index: true,
                        element: <AddJob/>,
                        action: addJobAction
                    },
                    {
                        path:'stats',
                        element: <Stats/>
                    }
                    ,
                    {
                        path:'all-jobs',
                        element: <AllJobs/>,
                        loader: allJobsLoader
                    }
                    ,
                    {
                        path:'profile',
                        element: <Profile/>
                    }
                    ,
                    {
                        path:'admin',
                        element: <Admin/>
                    }
                    ,
                    {
                        path:'edit-job/:id',
                        element: <EditJob/>,
                        loader: editJobLoader,
                        action: editJobAction
                    }
                ]
            }
        ]
    }
])

const App = () => {
    return <RouterProvider router={router}/>
}
export default App
