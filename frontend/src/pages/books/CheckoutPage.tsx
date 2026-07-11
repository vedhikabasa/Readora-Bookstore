import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import { FiShoppingBag, FiTruck, FiShield, FiCreditCard } from "react-icons/fi";

interface CartItem {
  _id: string;
  newPrice: number;
}

interface FormData {
  name: string;
  city: string;
  country: string;
  state: string;
  zipcode: string;
  phone: string;
  address: string;
}

interface OrderData {
  name: string;
  email: string | undefined;
  address: {
    street: string;
    city: string;
    country: string;
    state: string;
    zipcode: string;
  };
  phone: string;
  productIds: string[];
  totalPrice: number;
}

const CheckoutPage = () => {
  const cartItems = useSelector(
    (state: { cart: { cartItems: CartItem[] } }) => state.cart.cartItems
  );

  const totalPrice = Number(
    cartItems
      .reduce((acc, item) => acc + item.newPrice, 0)
      .toFixed(2)
  );

  const { currentUser } = useAuth();
  const { register, handleSubmit } = useForm<FormData>();

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  const onSubmit = async (data: FormData) => {
    const newOrder: OrderData = {
      name: data.name,
      email: currentUser?.email ?? undefined,
      address: {
        street: data.address,
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      phone: data.phone,
      productIds: cartItems.map((item) => item._id),
      totalPrice,
    };

    try {
      await createOrder(newOrder).unwrap();

      Swal.fire({
        icon: "success",
        title: "Order Placed Successfully!",
        text: "Thank you for shopping with Readora.",
        confirmButtonColor: "#7c3aed",
      });

      navigate("/orders");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Unable to place your order.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-[1500px] mx-auto px-6 py-16">

      <div className="mb-12">
        <h1 className="text-5xl font-black text-slate-900">
          Checkout
        </h1>

        <p className="text-gray-500 mt-3">
          Complete your purchase by filling in your shipping details.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left Side */}

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 p-10">

            <h2 className="text-2xl font-bold mb-8">
              Shipping Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Full Name
                </label>

                <input
                  {...register("name", { required: true })}
                  className="w-full rounded-xl border border-gray-200 px-5 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Email
                </label>

                <input
                  disabled
                  defaultValue={currentUser?.email ?? ""}
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-5 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Phone
                </label>

                <input
                  {...register("phone", { required: true })}
                  className="w-full rounded-xl border border-gray-200 px-5 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  City
                </label>

                <input
                  {...register("city", { required: true })}
                  className="w-full rounded-xl border border-gray-200 px-5 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Address
                </label>

                <input
                  {...register("address", { required: true })}
                  className="w-full rounded-xl border border-gray-200 px-5 py-3 outline-none focus:border-violet-500"
                />
              </div>
                            <div>
                <label className="block mb-2 font-medium">
                  Country
                </label>

                <input
                  {...register("country", { required: true })}
                  className="w-full rounded-xl border border-gray-200 px-5 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  State
                </label>

                <input
                  {...register("state", { required: true })}
                  className="w-full rounded-xl border border-gray-200 px-5 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Zip Code
                </label>

                <input
                  {...register("zipcode", { required: true })}
                  className="w-full rounded-xl border border-gray-200 px-5 py-3 outline-none focus:border-violet-500"
                />
              </div>
            </div>
          </div>

          {/* Right Side */}

          <div>

            <div className="sticky top-28 bg-white rounded-3xl border border-gray-100 shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-8">
                Order Summary
              </h2>

              <div className="space-y-6">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Items
                  </span>

                  <span className="font-semibold">
                    {cartItems.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="text-green-600 font-semibold">
                    Free
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Payment
                  </span>

                  <span className="font-semibold">
                    Cash On Delivery
                  </span>
                </div>

                <hr />

                <div className="flex justify-between text-3xl font-bold">
                  <span>Total</span>

                  <span className="text-violet-600">
                    ${totalPrice}
                  </span>
                </div>

              </div>

              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-3 text-gray-600">
                  <FiTruck className="text-violet-600" />
                  <span>Free Shipping</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <FiShield className="text-violet-600" />
                  <span>Secure Checkout</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <FiCreditCard className="text-violet-600" />
                  <span>Cash On Delivery</span>
                </div>

              </div>

              <div className="mt-10">

                <label className="flex items-start gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="mt-1"
                  />

                  <span className="text-sm text-gray-500">
                    I agree to the{" "}
                    <Link
                      to="/"
                      className="text-violet-600 hover:underline"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/"
                      className="text-violet-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>.
                  </span>

                </label>

              </div>

              <button
                disabled={!isChecked}
                className="mt-8 w-full rounded-2xl bg-violet-600 py-4 text-lg font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-gray-300 flex items-center justify-center gap-3"
              >
                <FiShoppingBag />
                Place Order
              </button>

              <Link
                to="/cart"
                className="block text-center mt-5 text-violet-600 hover:underline"
              >
                ← Back to Cart
              </Link>

            </div>

          </div>

        </div>

      </form>

    </section>
  );
};

export default CheckoutPage;