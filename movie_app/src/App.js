import logo from './logo.svg';
import './App.scss';
import { Provider } from "react-redux";
import store from "./api/apiStore";
import routerConfig from './config/routerConfig';
import { RouterProvider } from 'react-router-dom'

function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={routerConfig()} />
        </Provider>
    );
}

export default App;
