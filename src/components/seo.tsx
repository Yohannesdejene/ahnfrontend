import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import { SEO } from "@/types/seo";

export const Seo = (props: SEO) => {
  const { title } = props;

  const fullTitle = title ? title + " " : "";

  return (
    <Helmet>
      <title>{fullTitle}</title>
    </Helmet>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
};
