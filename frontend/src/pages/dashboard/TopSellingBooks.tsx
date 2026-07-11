import { useFetchAdminStatsQuery } from "../../redux/features/stats/statsApi";

interface Book {
  title: string;
  image: string;
  totalSold: number;
}

const TopSellingBooks = () => {
  const { data, isLoading } = useFetchAdminStatsQuery({}) as any;

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  const books: Book[] = data?.topSellingBooks || [];

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Top Selling Books</h2>

      {books.length === 0 ? (
        <p className="text-gray-500">No sales yet.</p>
      ) : (
        <div className="space-y-4">
          {books.map((book, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border rounded-lg p-4 hover:bg-gray-50"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-16 h-24 object-cover rounded-md"
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm line-clamp-2">
                    {book.title}
                </h3>

                <p className="text-green-600 text-sm font-semibold mt-1">
                  Sold: {book.totalSold}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopSellingBooks;