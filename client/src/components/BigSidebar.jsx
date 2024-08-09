import Wrapper from "../assets/wrappers/BigSidebar.js";
import {useDashboardContext} from "../pages/DashboardLayout.jsx";
import {Logo} from "./index.jsx";
import NavLinks from "./NavLinks.jsx";


const BigSidebar = () => {
    const {showSidebar} = useDashboardContext()
    return(
        <Wrapper>
            <div className={!showSidebar? 'sidebar-container show-sidebar': 'sidebar-container'}>
                <div className="content">
                    <header>
                        <Logo/>
                    </header>
                    <NavLinks isBigSidebar />
                </div>
            </div>
        </Wrapper>
    )
}

export default BigSidebar;
