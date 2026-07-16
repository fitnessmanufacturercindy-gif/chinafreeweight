import DeferredHeroVideo from "./DeferredHeroVideo";

export default function LazyHeroVideo() {
  return (
    <div className="hero-video-layer" aria-hidden="true">
      <picture className="hero-poster-picture">
        <source media="(max-width: 700px)" srcSet="/assets/hero-poster-mobile.avif" type="image/avif" />
        <source media="(max-width: 700px)" srcSet="/assets/hero-poster-mobile.webp" type="image/webp" />
        <source srcSet="/assets/hero-poster.avif" type="image/avif" />
        <img
          className="hero-poster-image"
          src="/assets/hero-poster.webp"
          alt=""
          width={720}
          height={960}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
      </picture>
      <DeferredHeroVideo />
    </div>
  );
}
