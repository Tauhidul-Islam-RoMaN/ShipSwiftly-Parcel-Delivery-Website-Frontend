import { useForm } from "react-hook-form";
import useAuth from "../../../Hook/useAuth";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";
import useBooking from "../../../Hook/useBooking";

const UpdateParcel = () => {
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const [, refetch] = useBooking()

    const { address, deliveryDate, _id, latitude, longitude,  phone, price, receiversName, receiversPhone, type, weight } = useLoaderData()

    const { register, reset, handleSubmit, setValue, formState: { errors } } = useForm()

    const handleWeightChange = (selectedWeight) => {
        const price = {
            '1kg': 50,
            '2kg': 100,
            'more than 2kg': 150,
        };

        // Update the "Price" input value using setValue
        setValue('price', price[selectedWeight] || '');
    };

    const onSubmit = (data) => {
        const updatedBooking = {
            address: data.address,
            deliveryDate: data.deliveryDate,
            bookingDate: today,
            latitude: data.latitude,
            longitude: data.longitude,
            phone: data.phone,
            price: data.price,
            receiversName: data.receiversName,
            receiversPhone: data.receiversPhone,
            type: data.type,
            weight: data.weight,
            status: "pending"
        }
        axiosPublic.patch(`/bookings/${_id}`, updatedBooking)
            .then(res => {
                console.log('booking updated', res.data);
                if (res.data.modifiedCount>0) {
                    reset()
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Booking Updated Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="mx-auto max-w-xl rounded-xl ">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <h2 className="text-3xl font-xl text-center mt-10"> Update Your Booking </h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" readOnly defaultValue={user?.displayName} {...register("name", { required: true })} placeholder="name"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name="email" readOnly defaultValue={user?.email} {...register("email", { required: true })} placeholder="Email"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="number" name="phone"  defaultValue={phone}  {...register("phone", { required: true, maxLength: 11, minLength: 11 })} placeholder="01*********"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.phone && <span className="text-red-600">Please Provide valid Phone Number</span>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Parcel Type</span>
                        </label>
                        <input type="text" name="type"  defaultValue={type}  {...register("type", { required: true })} placeholder="Parcel Type"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.type && <span className="text-red-600">Parcel type is required</span>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Parcel Weight</span>
                        </label>
                        <select  defaultValue={weight} {...register("weight", { required: true })} onChange={(e) => {
                            handleWeightChange(e.target.value);
                        }} className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none">
                            <option disabled value="default">Select a category</option>
                            <option value="1kg">1 Kg</option>
                            <option value="2kg">2 Kg</option>
                            <option value="more than 2kg"> More than 2 Kg</option>
                        </select>
                        {errors.weight && <span className="text-red-600">Parcel weight is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Receiver's Name</span>
                        </label>
                        <input type="text" name="receiversName" defaultValue={receiversName} {...register("receiversName", { required: true })} placeholder="Receiver's name"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.receiversName && <span className="text-red-600">Receiver,s Name  is Required</span>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Receiver's Phone Number</span>
                        </label>
                        <input type="number" name="receiversPhone"  defaultValue={receiversPhone}  {...register("receiversPhone", { required: true, maxLength: 11, minLength: 11 })} placeholder="01*********"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.receiversPhone && <span className="text-red-600">Please Provide valid Phone Number</span>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Parcel Delivery Address</span>
                        </label>
                        <input type="text" name="address"  defaultValue={address}  {...register("address", { required: true })} placeholder="Parcel Delivery Address"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.address && <span className="text-red-600">Parcel delivery address is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Requested Delivery Date</span>
                        </label>
                        <input type="date" name="deliveryDate" defaultValue={deliveryDate}   {...register("deliveryDate", { required: true })} min={tomorrow} placeholder="Expected Delivery Date"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.deliveryDate && <span className="text-red-600">Expected delivery date is required</span>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Delivery Address Latitude</span>
                        </label>
                        <input type="number" step="0.000000001" name="latitude"  defaultValue={latitude}  {...register("latitude", { required: true })} placeholder="21.1213655476"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.latitude && <span className="text-red-600">Delivery address latitude is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Delivery Address Latitude</span>
                        </label>
                        <input type="number" name="longitude" step="0.000000001" defaultValue={longitude}  {...register("longitude", { required: true })} placeholder="21.1213655476"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                        {errors.longitude && <span className="text-red-600">Delivery address longitude is required</span>}

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" name="price" readOnly defaultValue={price} {...register("price", { required: true })} placeholder="Price"
                            className="p-3 w-full text-sm text-black bg-gray-100 border-b-8 border-gray-100 focus:border-[#3bbcc0] rounded focus:outline-none"
                        />
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" className="btn" value="UpdateBooking" />
                    </div>
                </form>
            </div>
        </div>
    );
    };

export default UpdateParcel;