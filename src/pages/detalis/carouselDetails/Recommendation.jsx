/* eslint-disable react/prop-types */
import { useMemo } from "react";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ mediaType, id }) => {
  const { data, loading } = useFetch(
    useMemo(() => {
      return { url: `/${mediaType}/${id}/recommendations` };
    }, [mediaType, id])
  );

  return (
    <Carousel
      title="Recommendations"
      data={data?.payload?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Recommendation;
