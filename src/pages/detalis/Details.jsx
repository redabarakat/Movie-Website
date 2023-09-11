import { useParams } from "react-router-dom";
import "./details.scss";
import DetalisBanner from "./detailsBanner/DetalisBanner";
import useFetch from "../../hooks/useFetch";
import { useMemo } from "react";
import Cast from "./cast/Cast";
import VideoSection from "./videoSection/VideoSection";
import Similar from "./carouselDetails/Similar";
import Recommendation from "./carouselDetails/Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(
    useMemo(() => {
      return { url: `/${mediaType}/${id}/videos` };
    }, [mediaType, id])
  );

  const { data: credits, loading: creditsLoading } = useFetch(
    useMemo(() => {
      return { url: `/${mediaType}/${id}/credits` };
    }, [mediaType, id])
  );

  return (
    <div>
      <DetalisBanner
        video={data?.payload?.results?.[0]}
        crew={credits?.payload?.crew}
      />
      <Cast data={credits?.payload?.cast} loading={creditsLoading} />
      <VideoSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
