import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/axios";
import { LoadingPage } from "../pages/loading";

export type Trip = {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

type TripDetailsContextData = {
  tripId: string | undefined
  trip: Trip
}

const tripDetailsContext = createContext({} as TripDetailsContextData)

export const TripDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [trip, setTrip] = useState<Trip>()

  const { tripId } = useParams()

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])

  if (!trip) return <LoadingPage />

  return (
    <tripDetailsContext.Provider value={{
      tripId,
      trip
    }}>
      {children}
    </tripDetailsContext.Provider>
  )
}

export const useTripDetails = () => {
  return useContext(tripDetailsContext)
}