import { getServerSession } from "next-auth";
import Dash from "../../../components/Dashboard";
import { auth_options } from "../../lib/auth";

const Dashboard = async () => {
    const session = await getServerSession(auth_options)
    // console.log(session)
    return (
        <div className="">
            <Dash />
        </div>
    )
};

export default Dashboard;