/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./detalisBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import PlayIcon from "../PlayIcon";

import VideoPopup from "../../../components/videopopup/VideoPopup";

const DetalisBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { url } = useSelector((state) => state.home);
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(
    useMemo(() => {
      return { url: `/${mediaType}/${id}` };
    }, [mediaType, id])
  );
  console.log(video);
  const director = crew?.filter((cre) => cre.job === "Director");
  const Writer = crew?.filter(
    (cre) =>
      cre.job === "Screenplay" || cre.job === "Story" || cre.job === "Writer"
  );

  const genresData = data?.payload?.genres.map((g) => g.id);

  const toHoursAndMinutes = (runtime) => {
    const Hours = Math.floor(runtime / 60);
    const Minutes = runtime % 60;
    return `${Hours}h${Minutes > 0 ? `${Minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {data && (
            <>
              <div className="backdrop-img ">
                <Img src={url.backdrop + data?.payload?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data?.payload?.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data?.payload?.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data?.payload?.title || data?.payload?.name} (${dayjs(
                        data?.payload?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data?.payload?.tagline}</div>
                    <Genres data={genresData} />
                    <div className="row">
                      <CircleRating
                        rating={data?.payload?.vote_average.toFixed(1)}
                      />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">
                        {data?.payload?.overview}
                      </div>
                    </div>

                    <div className="info">
                      {data?.payload?.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data?.payload?.status}</span>
                        </div>
                      )}
                      {data?.payload?.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data?.payload?.release_date).format(
                              "MMM D, YYYY"
                            )}
                          </span>
                        </div>
                      )}
                      {data?.payload?.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Run Time: </span>
                          <span className="text">
                            {toHoursAndMinutes(data?.payload?.runtime)}
                          </span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {director.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {Writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {Writer?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {Writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {data?.payload?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Created By: </span>
                        <span className="text">
                          {data?.payload?.created_by?.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {data?.payload?.created_by?.length - 1 !== i &&
                                ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetalisBanner;
