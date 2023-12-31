import { useEffect, useState } from 'react';
import { useCountUp } from 'react-countup';



const HomeStatistics = () => {

  const [users, setUsers] = useState([])
  const [booking, setBooking] = useState([])

  useEffect(() => {
    fetch('https://assignment-12-server-pied.vercel.app/users')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUsers(data)
      })
  }, [])

  
  useEffect(() => {
    fetch('https://assignment-12-server-pied.vercel.app/bookings')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setBooking(data)
      })
  }, [])

  const delivered = booking?.filter(item => item.status === "delivered")
  console.log(delivered);

  


  const totalUser = users.length
  const totalBooking = booking.length
  const totalDelivered = delivered.length
  console.log(totalBooking,totalUser,totalDelivered);


  useCountUp({ ref: 'Users', end: totalUser, duration: 10, delay: 2 });
  useCountUp({ ref: 'Booked', end: totalBooking, duration: 10, delay: 2 });
  useCountUp({ ref: 'Delivered', end: totalDelivered, duration: 10, delay: 2 });




  return (
    <div className='bg-[#3bbcc0] flex gap-10 flex-col lg:flex-row items-center justify-evenly py-10'>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> Number of Parcel Booked </h5>
          <div className='text-center font-bold text-3xl' id="Booked"> </div>
        </div>
      </div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> Number of Parcel Delivered </h5>
          <div className='text-center font-bold text-3xl' id="Delivered"> </div>

        </div>
      </div>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> Number of Registered Users </h5>
          <div className='text-center font-bold text-3xl' id="Users"> </div>
        </div>
      </div>
    </div>
  );
};
export default HomeStatistics;
