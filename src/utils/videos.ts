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
