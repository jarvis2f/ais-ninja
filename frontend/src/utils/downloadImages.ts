import JSZip from "jszip";
import { saveAs } from "file-saver";

export const downloadImagesAsZip = async (imageDataArray: Array<string>) => {
	try {
		const zip = new JSZip();

		const promises = imageDataArray.map((base64Data, index) => {
			return new Promise<void>((resolve) => {
				const img = new Image();
				img.onload = () => {
					const canvas = document.createElement('canvas');
					canvas.width = img.width;
					canvas.height = img.height;

					const ctx = canvas.getContext('2d');
					if (ctx) {
						ctx.drawImage(img, 0, 0);
						canvas.toBlob((blob) => {
							if (blob) {
								zip.file(`image_${index + 1}.png`, blob);
								resolve();
							}
						});
					}
				};
				img.src = `data:image/png;base64,${base64Data}`;
			});
		});

		// 等待所有图片处理完成
		await Promise.all(promises);

		const currentDateTime = new Date().toISOString().slice(0, 10);
		const zip_filename = `DreamStudio_${currentDateTime}.zip`;
		const zipBlob = await zip.generateAsync({type: "blob"});
		saveAs(zipBlob, zip_filename);
	} catch (error) {
		console.error("Error while creating and downloading ZIP:", error);
	}
};
