import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import {
  clearCart,
  removeFromCart,
} from "../../redux/features/cart/cartSlice";
import { FiShoppingBag, FiTrash2, FiArrowRight } from "react-icons/fi";

interface CartItem {
  _id: string;
  coverImage: string;
  title: string;
  newPrice: number;
  category: string;
}

const CartPage = () => {
  const cartItems = useSelector(
    (state: { cart: { cartItems: CartItem[] } }) => state.cart.cartItems
  );

  const dispatch = useDispatch();

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.newPrice, 0)
    .toFixed(2);

  const handleRemoveFromCart = (product: CartItem) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16">
          <div className="text-7xl mb-6">🛒</div>

          <h2 className="text-4xl font-bold text-slate-900">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mt-4">
            Looks like you haven't added any books yet.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-8 bg-violet-600 text-white px-8 py-4 rounded-xl hover:bg-violet-700 transition"
          >
            Browse Books
            <FiArrowRight />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1500px] mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-5xl font-black text-slate-900">
            Shopping Cart
          </h1>

          <p className="text-gray-500 mt-2">
            {cartItems.length} item(s) in your cart
          </p>
        </div>

        <button
          onClick={handleClearCart}
          className="rounded-xl bg-red-500 px-6 py-3 text-white hover:bg-red-600 transition"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">

          {cartItems.map((product) => (
            <div
              key={product._id}
              className="flex gap-6 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-xl transition"
            >
              <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-center">
                <img
                  src={product.coverImage}
                  alt={product.title}
                  className="h-40 object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">

                <div>
                  <span className="inline-block bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full mb-3 capitalize">
                    {product.category}
                  </span>

                  <h2 className="text-2xl font-bold text-slate-900">
                    {product.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Quantity: 1
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <span className="text-3xl font-bold text-violet-600">
                    ${product.newPrice}
                  </span>

                  <button
                    onClick={() => handleRemoveFromCart(product)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
                  >
                    <FiTrash2 />
                    Remove
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Order Summary */}
        <div>

          <div className="sticky top-28 bg-white rounded-3xl border border-gray-100 shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-8">
              Order Summary
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between text-gray-600">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">
                  Free
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>$0.00</span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span className="text-violet-600">
                  ${totalPrice}
                </span>
              </div>

            </div>

            <Link
              to="/checkout"
              className="mt-10 flex items-center justify-center gap-3 rounded-2xl bg-violet-600 py-4 text-lg font-semibold text-white hover:bg-violet-700 transition"
            >
              <FiShoppingBag />
              Proceed to Checkout
            </Link>

            <Link
              to="/"
              className="mt-5 block text-center text-violet-600 font-medium hover:underline"
            >
              ← Continue Shopping
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CartPage;