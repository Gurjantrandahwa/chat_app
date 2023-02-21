import 'rsuite/styles/index.less';
import "./styles/main.scss";
import {Route, Routes} from "react-router-dom";
import SignIn from "./Pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./Pages/Home";

function App() {
    return <div>
        <Routes>
            <Route path={"/signIn"}>
                <SignIn/>
            </Route>
            <PrivateRoute path={"/"}>
                <Home/>
            </PrivateRoute>
        </Routes>
    </div>
}

export default App;
