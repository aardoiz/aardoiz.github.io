import teacher from "../../public/projects/teacher/logo.png";
import nba from "../../public/projects/nba/homepage.png";
import discharges from "../../public/papers/discharges.png";
import radia from "../../public/papers/radia.png";
import spanishbff from "../../public/papers/spanishbff.png";
import ambiguity from "../../public/papers/ambiguity.png";
import hybrid from "../../public/papers/hybrid.png";
import semeval from "../../public/papers/semeval.png";
import type { ImageMetadata } from "astro";

export const projectPreviews: Record<
  string,
  { image: ImageMetadata; alt: string } | undefined
> = {
  "english-coach": {
    image: teacher,
    alt: "Voice AI Interview Coach interface showing microphone recording, transcription, answer feedback and a suggested response.",
  },
  "nba-game-lab": {
  image: nba,
  alt: "NBA Analytics Agent interface showing basketball analysis and interactive dashboards.",
},
};
export const publicationPreviews: Record<string, ImageMetadata> = {
  "https://www.sciencedirect.com/science/article/pii/S0952197624011862":
    discharges,
  "https://arxiv.org/abs/2403.03538": radia,
  "https://arxiv.org/abs/2302.12746": spanishbff,
  "https://arxiv.org/abs/2302.06426": ambiguity,
  "https://aclanthology.org/2022.smm4h-1.3/": hybrid,
  "https://aclanthology.org/2022.semeval-1.7/": semeval,
};
