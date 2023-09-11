import axios from "axios";

// how to import anything from file {.env}
// by use (import.meta.env.the name of variable in file)
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

// global default settings for axios to use when any request is made
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${TMDB_TOKEN}`;
