import { useMemo, useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { loading, data } = useFetch(
    useMemo(() => {
      return { url: `/${endpoint}/popular` };
    }, [endpoint])
  );

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">What`s Popular</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel
        data={data?.payload.results}
        loading={loading}
        endpoint={endpoint}
      />
    </div>
  );
};

export default Popular;
