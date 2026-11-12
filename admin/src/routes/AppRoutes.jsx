import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import AppLayout from '../components/AppLayout';
import Add from '../pages/Add';
import List from '../pages/List';
import Orders from '../pages/Orders';
import PageNotFound from '../pages/PageNotFound';
import Home from '../pages/Home';

const router = createBrowserRouter([
    {
        element : <App/>,
        children:[
            {
                path:"/",
                element:<AppLayout/>,
                children:[
                    {
                        index : true,
                        element:<Add/>
                    },
                    {
                        path : "/list",
                        element : <List/>
                    },
                    {
                        path : "/add",
                        element : <Add/>
                    },
                    {
                        path : "/orders",
                        element : <Orders/>
                    },
                ]
            },
            {
                path : "*",
                element:<PageNotFound/>
            }
        ]
    }
])

export default router;