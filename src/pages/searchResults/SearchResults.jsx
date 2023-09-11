import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import noResults from "../../assets/no-results.png";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import "./searchResults.scss";

const SearchResults = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  const dispatch = useDispatch();

  const fetchInitialData = useCallback(() => {
    setLoading(true);
    dispatch(fetchDataFromApi({ url: `/search/multi?query=${query}&page=1` }))
      .unwrap()
      .then((res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query, dispatch]);

  // funtion to fetch data with inifinte scroll compoent
  const fetchNextPageDate = () => {
    dispatch(
      fetchDataFromApi({ url: `/search/multi?query=${query}&page=${pageNum}` })
    )
      .unwrap()
      .then((res) => {
        if (data?.results) {
          // eslint-disable-next-line no-unsafe-optional-chaining
          setData({ ...data, results: [...data?.results, ...res.results] });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      });
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [fetchInitialData]);

  return (
    <div className="searchResultsPage">
      {loading ? (
        <Spinner initial={true} />
      ) : (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <React.Fragment>
              <div className="pageTitle">{`Search ${
                data.total_results > 1 ? "results" : "result"
              } of ${query}`}</div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageDate}
                hasMore={pageNum <= data?.total_pages ? true : false}
                loader={<Spinner />}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {data?.results?.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </React.Fragment>
          ) : (
            <span>
              Sorry, Results not found <img src={noResults} />{" "}
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResults;
