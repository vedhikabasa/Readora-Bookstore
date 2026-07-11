import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

interface Book {
  _id: string;
  coverImage: string;
  title: string;
  description: string;
  newPrice: number;
  oldPrice: number;
  category: string;
}

const BookCard = ({ book }: { book: Book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product: Book) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 max-w-[300px] mx-auto">
      
      <Link to={`/books/${book._id}`}>
        <div className="bg-gray-50 h-[340px] flex items-center justify-center overflow-hidden">
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-[290px] object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="p-5">

        <p className="text-xs uppercase tracking-widest text-violet-600 font-semibold mb-2">
          {book.category}
        </p>

        <Link to={`/books/${book._id}`}>
          <h3 className="text-xl font-bold text-slate-900 line-clamp-2 hover:text-violet-600 transition">
            {book.title}
          </h3>
        </Link>

        <div className="flex items-center gap-3 mt-5">
          <span className="text-2xl font-bold text-violet-600">
            ${book.newPrice}
          </span>

          <span className="text-gray-400 line-through">
            ${book.oldPrice}
          </span>
        </div>

        <button
          onClick={() => handleAddToCart(book)}
          className="mt-6 w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl py-3 flex items-center justify-center gap-2 transition-all duration-300"
        >
          <FiShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;