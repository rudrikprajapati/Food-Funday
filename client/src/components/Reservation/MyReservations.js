import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ReservationContext from './ReservationContext';

const MyReservations = ({ userId }) => {
  const [reservations, setReservations] = useState([]);
    const { reservationsUpdated } = useContext(ReservationContext);

  useEffect(() => {
    // Fetch user's reservations from the backend API
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/book-table/getByUserId/${userId}`);
        setReservations(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservations();
  }, [userId, reservationsUpdated]);

  return (
    <>
      <div id="my-reservations" className="pad-top-100 pad-bottom-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="wow fadeIn" data-wow-duration="1s" data-wow-delay="0.1s">
                <h2 className="block-title text-center">
                  My Reservations
                </h2>
              </div>

              {reservations.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Booking Date</th>
                      <th>Booking Time</th>
                      <th>Approx Arrival Time</th>
                      <th>No. of Persons</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation._id}>
                        <td>{reservation.booking_date}</td>
                        <td>{reservation.booking_time}</td>
                        <td>{reservation.approx_arrive_time}</td>
                        <td>{reservation.no_of_persons}</td>
                        <td>{reservation.comments}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No reservations found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReservations;
