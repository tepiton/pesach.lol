import { HtmlBasePlugin, InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import markdownIt from "markdown-it";

export default function(eleventyConfig) {
  
  eleventyConfig.addPassthroughCopy("content/img");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");

  const md = markdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: true
  }).disable("code");

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addCollection("chapters", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/chapters/*.md").sort((a, b) => {
      const aOrder = a.data.order ?? 999;
      const bOrder = b.data.order ?? 999;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.inputPath.localeCompare(b.inputPath);
    });
  });

  eleventyConfig.setServerOptions({
    showAllHosts: true
  });

  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed/feed.xml",
    collection: {
      name: "chapters",
      limit: 10,
    },
    metadata: {
      language: "en",
      title: "My Literary Work",
      subtitle: "A description of this work",
      base: "https://example.com/",
      author: {
        name: "Your Name"
      }
    }
  });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    passthroughFileCopy: true
  };
}
