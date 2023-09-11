import { useEffect, useMemo, useState } from "react";
import "./heroBanner.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate("");
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch(
    useMemo(() => {
      return { url: "/movie/popular" };
    }, [])
  );

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.payload?.results[Math.floor(Math.random() * 20)].backdrop_path;
    setBackground(bg);
  }, [data, url.backdrop]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const searchClick = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="wrapper">
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subTitle">
              Millions of movies, TV shows and people to discover, Explore now
            </span>
            <div className="searchInput">
              <input
                onKeyUp={(e) => searchQueryHandler(e)}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                type="text"
                placeholder="Search for a movie or tv show ...."
              />
              <button onClick={searchClick}>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
