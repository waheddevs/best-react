import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import BoltRounded from "@mui/icons-material/BoltRounded";
import SchoolRounded from "@mui/icons-material/SchoolRounded";
import TrendingUpRounded from "@mui/icons-material/TrendingUpRounded";

type HeroVisualProps = {
  label: string;
  title: string;
  progress: string;
};

export function HeroVisual({ label, title, progress }: HeroVisualProps) {
  return (
    <div className="hero-visual" aria-label={label} role="img">
      <div className="hero-visual__2" />
      <div className="hero-visual__3">
        <div className="hero-visual__4">
          <span className="hero-visual__5">{label}</span>
          <span className="hero-visual__6">
            <BoltRounded aria-hidden="true" />
          </span>
        </div>
        <div className="hero-visual__7">
          <div className="hero-visual__8">
            <SchoolRounded aria-hidden="true" sx={{ fontSize: 52 }} />
            <span className="hero-visual__9">
              <TrendingUpRounded aria-hidden="true" />
            </span>
          </div>
        </div>
        <p className="hero-visual__10">{title}</p>
        <div className="hero-visual__11">
          <span className="hero-visual__12">
            <AutoStoriesRounded aria-hidden="true" />
          </span>
          <div className="hero-visual__13">
            <p className="hero-visual__14">{progress}</p>
            <div className="hero-visual__15">
              <div className="hero-visual__16" />
            </div>
          </div>
        </div>
      </div>
      <span className="hero-visual__17" />
      <span className="hero-visual__18" />
    </div>
  );
}
