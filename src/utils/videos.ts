import productData from "../products.json";
import { slugifySegment } from "./seo";

type ProductGroup = {
	label: string;
	productType: string;
	basePath: string;
	namesByKey: Record<string, string>;
	products: Record<string, unknown>;
};

export type VideoEntry = {
	id: string;
	slug: string;
	title: string;
	description: string;
	productName: string;
	productType: string;
	productUrl: string;
	url: string;
	embedUrl: string;
	thumbnailUrl: string;
	uploadDate?: string;
};

const videoTitles: Record<string, string> = {
	btPmyA1YCgc: "Jain Hydraulic (JHR) Mini Manual 55 x 24 x 20 Bale - 12 x 12 Baling Press or Hydraulic Press",
	ZJlV58YpluM: "Jain Hydraulics (JHR) Mini Manual 42 x 24 x 20 Bale - 12 x 12 Baling Press or Hydraulic Press",
	xh7DaDRg6OA: "Jain Hydraulics (JHR) Double Action Front Door Bale 24 x 12 Hydraulic Baling Press",
	EeUJEmJQRwM: "JHR (Formerly Jain Hydraulics) Double Action Ejector Baler",
	WuCLOQC_Sis: "Jain Hydraulics (JHR) Mini PLC Top Ejection Hydraulic Baling Press",
	"2AE6gI3q2_Y": "Jain Hydraulics (JHR) Mini PLC Side Ejection Hydraulic Baling Press",
	"pgHV177zd-A": "Jain Hydraulics (JHR) Jumbo Manual 72 x 40 x 30 Bale - 14 x 14 Hydraulic Baling Press Baler",
	"LRHLnlj-K-k": "Jain Hydraulics (JHR) High Density 10 x 10 Baler Better than Chinese Baler High Density Baler",
	yPdiXwVC9QA: "Jain Hydraulics (JHR) High Density Super Jumbo TMT 600 kg Bale Hydraulic Baling Press",
	hp9a1JbKw1U: "Jain Hydraulics (JHR) High Density Baler Better than Chinese Baler",
	"8CEVW4wntqU": "Jain Hydraulics (JHR) Continuous Baler 10 x 10",
	gImL6tR1Sfc: "Jain Hydraulics (JHR) Two Ram Baler For MSW Scrap Bale",
	BQjhgYiP0s0: 'JHR Super Fully Automatic Baling Press/Hydraulic Press machine in corrugated scrap 72" x 40" x 30"',
	kB5g_XI4hcg: "Jain Hydraulics (JHR) Jumbo PLC 72 x 40 x 30 Bale - 14 x 14 Baling Press & Baler",
	"gWv-l8aOSvg": "Jain Hydraulics Baling Press (JHR) PLC 60 x 36 x 24 Side Ejection",
	"FurQZQOu-ME": "JHR (Formerly Jain Hydraulics) Super Jumbo 84 x 44 x 40 Side Ejection Hydraulic Baling Press",
	ZEW22xOKfnQ: "Jain Hydraulics (JHR) Super Jumbo 105 x 50 x 50 Baling Press & Scrap Recycling",
	"8qx5f8JQ8P0": "Jain Hydraulics (JHR) Super Jumbo 84 x 60 x 40 Side Ejection Hydraulic Baling Press",
	HtoAp4uU9jo: 'Jain Hydraulics (JHR) Super Jumbo 84" Hydraulic Press / Baling Press Made in India',
	nNMRc6S8wOc: "Jain Hydraulics (JHR) 75mm Alligator Shear Pipe, TMT Bar Scrap Hydraulic Shear",
	sYBF9kNM1ag: "Jain Hydraulics (JHR) 40mm Alligator Shear Hydraulic Shear Can cut rod, Pipe",
	"45b6Q8uSwfg": "Jain Hydraulics (JHR) JHR (Formerly Jain Hydraulics) Introducing Box Shear",
	vT804ilERQY: "Jain Hydraulics (JHR) Continuous Shear / Gantry Shear / Wide Mouth Shear Shearing Machine",
	BX9g4m6aqdo: "Jain Hydraulics (JHR) Since 1973 Vertical Shear",
	bNGufBRwtpc: "Jain Hydraulics (JHR) Nibbling Machine for Aluminum Interlocking material & Extrusion locking Scrap",
	QRfWCHsqj3I: "Jain Hydraulics (JHR) Hammer Mill Shredder Scrap Processing",
	eDIeRWw67Ek: "Jain Hydraulics (JHR) Twin Shaft Aluminum/ Copper/ Ms / Sludge Shredder",
	LcV6XArJpGk: "Jain Hydraulics (JHR) Twin Shaft Shredder for processing wire.",
	"4O8U83-cBtk": "Jain Hydraulics (JHR) Twin Shaft Shredder for Aluminum Engine Parts / Components",
};

function stripHtml(value = "") {
	return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function clip(value: string, maxLength = 155) {
	if (value.length <= maxLength) {
		return value;
	}

	return `${value.slice(0, maxLength - 3).trim()}...`;
}

function splitVideoIds(ids: unknown) {
	if (!Array.isArray(ids)) {
		return [];
	}

	return ids.flatMap((item) =>
		String(item)
			.split(",")
			.map((id) => id.trim())
			.filter(Boolean),
	);
}

const videoUploadDates: Record<string, string> = {
	btPmyA1YCgc: "2024-01-19T02:03:06-08:00",
	ZJlV58YpluM: "2024-01-18T23:24:15-08:00",
	xh7DaDRg6OA: "2024-01-18T23:55:52-08:00",
	EeUJEmJQRwM: "2022-08-06T05:01:17-07:00",
	WuCLOQC_Sis: "2024-01-20T09:47:31-08:00",
	"2AE6gI3q2_Y": "2024-01-20T08:39:36-08:00",
	"pgHV177zd-A": "2024-01-19T03:20:09-08:00",
	"LRHLnlj-K-k": "2024-01-19T01:53:42-08:00",
	yPdiXwVC9QA: "2024-01-19T03:12:03-08:00",
	hp9a1JbKw1U: "2023-07-08T04:31:32-07:00",
	"8CEVW4wntqU": "2024-01-19T06:22:59-08:00",
	gImL6tR1Sfc: "2024-01-19T18:57:38-08:00",
	BQjhgYiP0s0: "2022-04-14T20:16:04-07:00",
	kB5g_XI4hcg: "2024-01-20T09:32:01-08:00",
	"gWv-l8aOSvg": "2022-08-19T02:40:41-07:00",
	"FurQZQOu-ME": "2024-01-19T00:15:19-08:00",
	ZEW22xOKfnQ: "2024-01-19T09:36:46-08:00",
	"8qx5f8JQ8P0": "2024-01-19T09:10:36-08:00",
	HtoAp4uU9jo: "2024-01-19T02:14:10-08:00",
	nNMRc6S8wOc: "2024-01-19T03:40:42-08:00",
	sYBF9kNM1ag: "2024-01-19T00:44:36-08:00",
	"45b6Q8uSwfg": "2024-01-20T10:16:19-08:00",
	vT804ilERQY: "2024-01-19T19:32:22-08:00",
	BX9g4m6aqdo: "2024-01-20T10:25:10-08:00",
	bNGufBRwtpc: "2024-01-19T18:20:49-08:00",
	QRfWCHsqj3I: "2024-01-19T10:15:09-08:00",
	eDIeRWw67Ek: "2024-01-19T08:51:57-08:00",
	LcV6XArJpGk: "2023-04-14T06:39:19-07:00",
	"4O8U83-cBtk": "2024-01-19T04:18:55-08:00",
};

const productGroups: ProductGroup[] = [
	{
		label: "Baler",
		productType: "Baler",
		basePath: "/products/balers",
		namesByKey: {
			continuous: "Continuous",
			high_density: "High Density",
			horizontal: "Horizontal",
			jumbo_manual: "Jumbo Manual",
			jumbo_plc: "Jumbo PLC",
			manual_mini: "Manual Mini",
			mini_plc: "Mini PLC",
			super_jumbo: "Super Jumbo",
			triple_action: "Triple Action",
			vertical: "Vertical",
			double_action: "Double Action",
		},
		products: productData.balers,
	},
	{
		label: "Shear",
		productType: "Shear",
		basePath: "/products/shears",
		namesByKey: {
			alligator: "Alligator",
			box: "Box",
			continuous: "Continuous",
			nibbling: "Nibbling",
		},
		products: productData.shears,
	},
	{
		label: "Shredder",
		productType: "Shredder",
		basePath: "/products/shredders",
		namesByKey: {
			hammer_mill: "Hammer Mill",
			twin_shaft: "Twin Shaft",
		},
		products: productData.shredders,
	},
];

export function getVideos(): VideoEntry[] {
	return productGroups.flatMap((group) =>
		Object.entries(group.namesByKey).flatMap(([key, productName]) => {
			const product = group.products[key] as
				| {
						description?: string;
						videos?: string[];
				  }
				| undefined;
			const videoIds = splitVideoIds(product?.videos);
			const productSlug = slugifySegment(productName);
			const productUrl = `${group.basePath}/${productSlug}`;
			const description = clip(
				stripHtml(product?.description) ||
					`Watch Jain Hydraulics Recycling's ${productName} ${group.label} machine in action.`,
			);

			return videoIds.map((id, index) => {
				const fallbackTitle =
					videoIds.length > 1
						? `${productName} ${group.label} Machine Video ${index + 1}`
						: `${productName} ${group.label} Machine Video`;
				const title = videoTitles[id] || fallbackTitle;
				const slug =
					videoIds.length > 1
						? `${productSlug}-${slugifySegment(group.label)}-machine-video-${index + 1}`
						: `${productSlug}-${slugifySegment(group.label)}-machine-video`;

				return {
					id,
					slug,
					title,
					description,
					productName,
					productType: group.productType,
					productUrl,
					url: `/videos/${slug}`,
					embedUrl: `https://www.youtube.com/embed/${id}`,
					thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
					uploadDate: videoUploadDates[id] ?? "2026-04-11T00:00:00+05:30",
				};
			});
		}),
	);
}

export function getVideoBySlug(slug: string) {
	return getVideos().find((video) => video.slug === slug);
}

export function getProductVideos(productName: string, productType: string) {
	return getVideos().filter(
		(video) => video.productName === productName && video.productType === productType,
	);
}
