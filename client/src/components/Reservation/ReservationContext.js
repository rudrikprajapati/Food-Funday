// ReservationContext.js
import { createContext, useState } from 'react';

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservationsUpdated, setReservationsUpdated] = useState(false);

  const updateReservations = () => {
    setReservationsUpdated((prevState) => !prevState);
  };

  return (
    <ReservationContext.Provider value={{ reservationsUpdated, updateReservations }}>
      {children}
    </ReservationContext.Provider>
  );
};

export default ReservationContext;
