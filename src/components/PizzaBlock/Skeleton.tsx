import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="137" cy="134" r="134" /> 
    <rect x="0" y="317" rx="10" ry="10" width="280" height="93" /> 
    <rect x="0" y="420" rx="10" ry="10" width="86" height="30" /> 
    <rect x="0" y="275" rx="10" ry="10" width="280" height="30" /> 
    <rect x="139" y="420" rx="10" ry="10" width="142" height="40" />
  </ContentLoader>
)

export default Skeleton