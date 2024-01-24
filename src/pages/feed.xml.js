import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(context) {
	return rss({
		// `<title>` field in output xml
		title: "JHR Insights",
		// `<description>` field in output xml
		description: "Dive into the dynamic world of metal and waste recycling processing with 'Insights'—Jain Hydraulics Recycling's blog hub. Stay updated on the latest news, trends, and innovations, as we share valuable insights that shape the sustainable future of recycling. Explore our blog for a deeper understanding of the ever-evolving landscape in metal and waste recycling.",
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#contextsite
		site: context.site,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: await pagesGlobToRssItems(import.meta.glob('./pages/posts/*.{md,mdx}')),
		// (optional) inject custom xml
		customData: `<language>en-us</language>`,
	});
}
