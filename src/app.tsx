import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { TripDetailsProvider } from './contexts/trip-details-context'
import { ConfirmParticipationPage } from './pages/confirm-participation'
import { CreateTripPage } from './pages/create-trip'
import { TripDetailsPage } from './pages/trip-details'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTripPage />,
  },
  {
    path: '/trips/:tripId',
    element: (
      <TripDetailsProvider>
        <TripDetailsPage />
      </TripDetailsProvider>
    ),
  },
  {
    path: '/trips/:tripId/participants/:participantId/confirm',
    element: (
      <TripDetailsProvider>
        <ConfirmParticipationPage />
      </TripDetailsProvider>
    ),
  },
])

export const App = () => {
  return <RouterProvider router={router} />
}
