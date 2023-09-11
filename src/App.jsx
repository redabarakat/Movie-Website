import { useCallback, useEffect } from "react";
import "./utils/globalApi";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  PageNotFound,
  Details,
  Explore,
  Home,
  SearchResults,
} from "./pages/export.js";
import { Header, Footer } from "./components/export.js";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

function App() {
  const dispatch = useDispatch();

  // functions to get the genres types from api
  const genresCall = useCallback(async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(dispatch(fetchDataFromApi({ url: `genre/${url}/list` })));
    });

    const data = await Promise.all(promises);

    data.map(({ payload }) => {
      return payload.genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  }, [dispatch]);

  // use Effect to run Api request
  useEffect(() => {
    dispatch(fetchDataFromApi({ url: "/configuration" })).then((res) => {
      const url = {
        backdrop: res.payload.images.secure_base_url + "original",
        poster: res.payload.images.secure_base_url + "original",
        profile: res.payload.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });

    genresCall();
  }, [dispatch, genresCall]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
