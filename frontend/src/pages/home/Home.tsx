import Banner from "./Banner";
import TopSellers from "./TopSellers";
import Recommened from "./Recommened";
import News from "./News";
import { useSearchParams } from "react-router";

const Home = () => {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  return (
    <>
      <Banner />
      <TopSellers search={search} />
      <Recommened />
      <News />
    </>
  );
};

export default Home;