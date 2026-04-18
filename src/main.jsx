import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import ListingDetails from './pages/ListingDetailsPage.jsx'

const router = createBrowserRouter([
  {path : "/",
    element: <App/>
  },
  {
    path:"/ListingDetails/:id",
    element : <ListingDetails/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>
)
