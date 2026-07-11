import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useFetchBookByIdQuery } from "../../redux/features/books/booksApi";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

  const dispatch = useDispatch();

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl font-semibold">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-500 text-xl">
        Failed to load book details.
      </div>
    );

  return (
    <section className="max-w-[1400px] mx-auto py-16 px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-start">

        {/* Left */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 flex flex flex-col items-center shadow-xl border border-gray-100">
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-[520px] object-contain drop-shadow-2xl hover:scale-105 hover:-rotate-1 transition-all duration-500"
          />

          <div className="mt-8 grid grid-cols-3 gap-4 text-center w-full">

  <div>
    <p className="text-2xl">📦</p>
    <p className="text-sm font-medium mt-2">
      Free Shipping
    </p>
  </div>

  <div>
    <p className="text-2xl">🔒</p>
    <p className="text-sm font-medium mt-2">
      Secure Payment
    </p>
  </div>

  <div>
    <p className="text-2xl">↩️</p>
    <p className="text-sm font-medium mt-2">
      7 Day Return
    </p>
  </div>

</div>
        </div>

        {/* Right */}
        <div>

          <span className="inline-block bg-violet-100 text-violet-700 px-4 py-2 rounded-full font-medium mb-5 capitalize">
            {book.category}
          </span>

          <h1 className="text-5xl font-black text-slate-900 leading-tight">
            {book.title}
          </h1>

          <p className="mt-4 text-lg text-gray-500">
            by <span className="font-semibold">{book.author || "Admin"}</span>
          </p>

          <div className="flex items-center gap-3 mt-6">
            <span className="text-yellow-500 text-xl">★★★★★</span>

            <span className="text-gray-500">(4.8)</span>
          </div>

          <div className="mt-8 flex items-end gap-4 flex-wrap">
  <span className="text-5xl font-black text-violet-600">
    ${book.newPrice}
  </span>

  <span className="text-2xl text-gray-400 line-through mb-1">
    ${book.oldPrice}
  </span>

  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
    Save{" "}
    {Math.round(
      ((book.oldPrice - book.newPrice) / book.oldPrice) * 100
    )}
    %
  </span>
</div>

          <div className="mt-10 space-y-5">

            <hr className="my-8 border-gray-200" />

            <div>
              <h3 className="font-bold text-lg mb-2">
                Description
              </h3>

              <p className="text-gray-600 leading-8 whitespace-pre-line">
                {book.description}
              </p>
            </div>

           <div className="flex gap-10 mt-8">

  <div>
    <p className="text-sm text-gray-400">
      Published
    </p>

    <p className="font-semibold">
      {new Date(book.createdAt).toLocaleDateString()}
    </p>
  </div>

  <div>
    <p className="text-sm text-gray-400">
      Category
    </p>

    <p className="font-semibold capitalize">
      {book.category}
    </p>
  </div>

</div>

          </div>

          <button
            onClick={() => handleAddToCart(book)}
            className="mt-12 w-full md:w-fit bg-violet-600 hover:bg-violet-700 text-white px-12 py-4 rounded-2xl flex items-center justify-center gap-3 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
          >
            <FiShoppingCart size={22} />
            Add to Cart
          </button>

        </div>

      </div>
    </section>
  );
};

export default SingleBook;