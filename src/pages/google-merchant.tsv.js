import productJSON from "../products.json";
import { toAbsoluteUrl } from "../utils/seo";
import { getImage } from "astro:assets";

import manualMiniImage from "../images/Products/Balers/Mini Automatic.png";
import doubleActionImage from "../images/Products/Balers/Z_Double Action Front Door.png";
import miniPlcImage from "../images/Products/Balers/Mini Plc.png";
import jumboManualImage from "../images/Products/Balers/Jumbo Automatic.png";
import highDensityImage from "../images/Products/Balers/High Density.png";
import verticalImage from "../images/Products/Balers/Vertical Baler copy.png";
import jumboPlcImage from "../images/Products/Balers/Jumbo Plc.png";
import superJumboImage from "../images/Products/Balers/Super Jumbo.png";
import hammerMillImage from "../images/Products/Shredders/Hammer mill copy.png";
import twinShaftImage from "../images/Products/Shredders/Shredder copy.png";
import briquettingImage from "../images/Products/Briquetting/Briquetting.png";

const BRAND_NAME = "Jain Hydraulics Recycling";
const FALLBACK_SITE = new URL("https://www.jainhydraulics.com");

function normalizeFeedText(value) {
	return String(value ?? "")
		.replace(/<[^>]*>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

function formatPrice(priceInr) {
	return `${priceInr.toFixed(2)} INR`;
}

function buildRows(site) {
	const siteUrl = site ?? FALLBACK_SITE;

	return [
		{
			id: "balers_manual_mini",
			title: "Manual Mini Hydraulic Baler Machine",
			description: productJSON.balers.manual_mini.description,
			link: "/products/balers/manual-mini/",
			image: manualMiniImage,
			price: productJSON.balers.manual_mini.startingPriceInr,
			mpn: "manual-mini",
		},
		{
			id: "balers_double_action",
			title: "Hydraulic Double Action Baler Machine",
			description: productJSON.balers.double_action.description,
			link: "/products/balers/double-action/",
			image: doubleActionImage,
			price: productJSON.balers.double_action.startingPriceInr,
			mpn: "double-action",
		},
		{
			id: "balers_mini_plc",
			title: "Mini PLC Hydraulic Baler Machine",
			description: productJSON.balers.mini_plc.description,
			link: "/products/balers/mini-plc/",
			image: miniPlcImage,
			price: productJSON.balers.mini_plc.startingPriceInr,
			mpn: "mini-plc",
		},
		{
			id: "balers_jumbo_manual",
			title: "Jumbo Manual Hydraulic Baler Machine",
			description: productJSON.balers.jumbo_manual.description,
			link: "/products/balers/jumbo-manual/",
			image: jumboManualImage,
			price: productJSON.balers.jumbo_manual.startingPriceInr,
			mpn: "jumbo-manual",
		},
		{
			id: "balers_high_density",
			title: "High Density Hydraulic Baler Machine",
			description: productJSON.balers.high_density.description,
			link: "/products/balers/high-density/",
			image: highDensityImage,
			price: productJSON.balers.high_density.startingPriceInr,
			mpn: "high-density",
		},
		{
			id: "balers_vertical",
			title: "Vertical Hydraulic Baler Machine",
			description: productJSON.balers.vertical.description,
			link: "/products/balers/vertical/",
			image: verticalImage,
			price: productJSON.balers.vertical.startingPriceInr,
			mpn: "vertical",
		},
		{
			id: "balers_jumbo_plc",
			title: "Jumbo PLC Hydraulic Baler Machine",
			description: productJSON.balers.jumbo_plc.description,
			link: "/products/balers/jumbo-plc/",
			image: jumboPlcImage,
			price: productJSON.balers.jumbo_plc.startingPriceInr,
			mpn: "jumbo-plc",
		},
		{
			id: "balers_super_jumbo",
			title: "Super Jumbo Hydraulic Baler Machine",
			description: productJSON.balers.super_jumbo.description,
			link: "/products/balers/super-jumbo/",
			image: superJumboImage,
			price: productJSON.balers.super_jumbo.startingPriceInr,
			mpn: "super-jumbo",
		},
		{
			id: "shredders_hammer_mill",
			title: "Hammer Mill Shredder Machine",
			description: productJSON.shredders.hammer_mill.description,
			link: "/products/shredders/hammer-mill/",
			image: hammerMillImage,
			price: productJSON.shredders.hammer_mill.startingPriceInr,
			mpn: "hammer-mill",
		},
		{
			id: "shredders_twin_shaft",
			title: "Twin Shaft Shredder Machine",
			description: productJSON.shredders.twin_shaft.description,
			link: "/products/shredders/twin-shaft/",
			image: twinShaftImage,
			price: productJSON.shredders.twin_shaft.startingPriceInr,
			mpn: "twin-shaft",
		},
		{
			id: "chip_processing_briquetting",
			title: "Briquetting Machine",
			description: productJSON.chipProcessing.briquetting.description,
			link: "/products/cranes-and-chip-processing/briquetting/",
			image: briquettingImage,
			price: productJSON.chipProcessing.briquetting.startingPriceInr,
			mpn: "briquetting",
		},
	].map((item) => ({
		...item,
		description: normalizeFeedText(item.description),
		link: toAbsoluteUrl(item.link, siteUrl),
		imageLink: "",
		price: formatPrice(item.price),
	}));
}

function toTsv(rows) {
	const headers = [
		"id",
		"title",
		"description",
		"link",
		"image_link",
		"condition",
		"availability",
		"price",
		"brand",
		"identifier_exists",
		"mpn",
	];

	return [
		headers.join("\t"),
		...rows.map((row) =>
			[
				row.id,
				row.title,
				row.description,
				row.link,
				row.imageLink,
				"new",
				"in_stock",
				row.price,
				BRAND_NAME,
				"no",
				row.mpn,
			].join("\t"),
		),
	].join("\n");
}

export async function GET(context) {
	const rows = await Promise.all(
		buildRows(context.site).map(async (item) => {
			const optimizedImage = await getImage({
				src: item.image,
				width: 800,
				quality: 80,
				format: "webp",
			});

			return {
				...item,
				imageLink: toAbsoluteUrl(optimizedImage.src, context.site ?? FALLBACK_SITE),
			};
		}),
	);
	const body = `${toTsv(rows)}\n`;

	return new Response(body, {
		headers: {
			"content-type": "text/tab-separated-values; charset=utf-8",
		},
	});
}
