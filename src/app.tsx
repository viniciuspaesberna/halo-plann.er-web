import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CreateTripPage } from "./pages/create-trip"
import { TripDetailsPage } from "./pages/trip-details"
import { TripDetailsProvider } from "./contexts/trip-details-context"

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTripPage />
  },
  {
    path: '/trips/:tripId',
    element: (
      <TripDetailsProvider>
        <TripDetailsPage />
      </TripDetailsProvider>
    )
  }
])

export const App = () => {
  return (
    <RouterProvider router={router} />
  )
}