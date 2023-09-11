import { useMemo } from "react";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

// eslint-disable-next-line react/prop-types
const Similar = ({ mediaType, id }) => {
  const { data, loading } = useFetch(
    useMemo(() => {
      return { url: `/${mediaType}/${id}/similar` };
    }, [mediaType, id])
  );

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <Carousel
      title={title}
      data={data?.payload?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Similar;
