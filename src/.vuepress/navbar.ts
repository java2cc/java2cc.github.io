import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  { text: "Pricing", icon: "tags", link: "/docs/pricing" },
  {
    text: "Docs", icon: "book", link: "/docs/start",
    /*children: [
      {
        text: "Bar",
        icon: "creative",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "more", link: "" }],
      },
      {
        text: "Foo",
        icon: "config",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "more", link: "" }],
      },
    ],*/
  },
  { text: "Changelog", icon: "tags", link: "/changelog" },
]);