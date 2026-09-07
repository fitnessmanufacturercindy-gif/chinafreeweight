export default function DeferredHeroVideo() {
  return (
    <video
      className="hero-bg-video"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
    >
      <source src="/assets/hero-loop-2.mp4" type="video/mp4" media="(min-width: 900px)" />
    </video>
  );
}
