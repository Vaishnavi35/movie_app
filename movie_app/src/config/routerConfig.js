import { createBrowserRouter } from "react-router-dom";
import Layout from "../Pages/Layout";
import {Details} from "../Pages/Movie/Details";
import { Home } from "../Pages/Movie/Home";
import { FavMovies } from "../Pages/Movie/FavMovies";

function routerConfig() {
    const route = createBrowserRouter(
        [
            {
                path: "/",
                // exact: true,
                Component: Layout,
                children: [
                    {
                        path: "/",
                        // exact: true,
                        Component: Home
                    },
                    {
                        path: "/details",
                        Component: Details
                    },
                    {
                        path: "/:movieId",
                        Component: Details
                    },
                    {
                        path: "/favoriteMovies",
                        Component: FavMovies
                    },
                    {
                        path: "*",
                        Component: () => <h1>404 Not Found</h1>
                    }
                ]
            }
        ]
    );
    
    return route;
}
export default routerConfig;