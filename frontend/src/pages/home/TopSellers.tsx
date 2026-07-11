import { useState } from "react";
import BookCard from "../books/BookCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const categories = [
  "Choose a genre",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
  "Thriller",
];

interface TopSellersProps {
  search: string;
}

interface Book {
  _id: string;
  coverImage: string;
  title: string;
  description: string;
  newPrice: number;
  oldPrice: number;
  category: string;
}

const TopSellers = ({ search }: TopSellersProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState("Choose a genre");

  const { data: books = [] } = useFetchAllBooksQuery(search);

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book: Book) =>
            book.category.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  return (
    <div className="py-10">
      <div className="mb-8">
  <h2 className="text-4xl font-bold text-slate-900">
    Best Selling Books
  </h2>

  <p className="text-gray-500 mt-2">
    Discover the most loved books by our readers.
  </p>
</div>

      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="border border-gray-200 rounded-xl px-5 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-2xl font-semibold text-gray-500">
            No books found
          </h3>
        </div>
      ) : (
       <Swiper
  spaceBetween={40}
  navigation={true}
  breakpoints={{
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  }}
  modules={[Pagination, Navigation]}
  className="mySwiper"
>
          {filteredBooks.map((book: Book) => (
            <SwiperSlide key={book._id}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default TopSellers;