import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../../Components/Genres";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import SingleContent from "../../Components/SingleContent/SingleContent";
import useGenres from "../../hooks/useGenre";

const Series = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforUrl=useGenres(selectedGenres)
  const fetchMovies = async () => {
    const { data } = await axios.get(
      
        `https://api.themoviedb.org/3/discover/tv?api_key=d54f1a6164bfe4d1e9a8e04d6e9d345c&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate`
      );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page,genreforUrl]);

  return (
    <div>
      <span className="pageTitle">Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        genres={genres}
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Series;
