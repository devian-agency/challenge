const url = "/challenge/series/60-days/"
const imgurl = "/images/challenge/series/60-days/"

export interface Series {
  title: string;
  slug: string;
  image?: string;
  "sub-title": string;
  description: string;
  by: {
    name: string;
    profile?: string;
    github?: string;
    twitter?: string;
  };
  challengedOn: string;
  completedOn?: string;
}

export const series: Series[] = [
  {
    title: "Day 1",
    slug: url + "day-1",
    image: imgurl + "day-1/image.png",
    "sub-title": "Contact Form",
    description: "Build a working contact form, which contains first name, family name, email, subject, and message. It also have it's own error handling and message logs.",
    by: {
      name: "Farhan Ahmad Khan",
      profile: imgurl + "day-1/profile.jpg",
      github: "https://github.com/farhankhan197",
      twitter: "https://x.com/FarhanKhan_twt"
    },
    challengedOn: "30-10-2025",
    completedOn: "01-11-2025",
  },
  {
    title: "Day 2",
    slug: url + "day-2",
    image: imgurl + "day-2/image.png",
    "sub-title": "Theme Switcher with smooth transition",
    description: "Build a Theme Switcher, which have smooth transitions between sun and moon svg icons. You can also control animation duration.",
    by: {
      name: "Ayush Sharma",
      profile: imgurl + "day-2/profile.jpg",
      github: "https://github.com/ayushsharma74",
      twitter: "https://x.com/ayshtwt"
    },
    challengedOn: "02-11-2025",
    completedOn: "04-11-2025",
  }
]