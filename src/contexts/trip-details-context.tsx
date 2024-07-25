import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/axios";

export type Trip = {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

type TripDetailsContextData = {
  tripId: string | undefined
  trip: Trip | undefined
}

const tripDetailsContext = createContext({} as TripDetailsContextData)

export const TripDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [trip, setTrip] = useState<Trip | undefined>()

  const { tripId } = useParams()

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])

  if (!trip) return 'Trip not found'

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