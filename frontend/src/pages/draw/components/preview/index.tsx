import styles from "./index.module.less";
import {Button, message, Tooltip} from "antd";
import {DeleteOutlined, DownloadOutlined, LeftSquareOutlined} from "@ant-design/icons";
import React, {useMemo} from "react";
import {downloadImagesAsZip, joinTrim} from "@/utils";
import {StabilityImageInfo} from "@/types";
import {DiffusionImageSizeMap, TextToImageParams} from "@/types/stable_studio";
import drawStore from "../../../../store/draw/slice";
import useDocumentResize from "@/hooks/useDocumentResize";
import {useTranslation} from "react-i18next";

interface PreviewProps {
	originalNode?: React.ReactNode;
	imageInfo: {
		id: string;
		index: number;
	}
}

function Preview(props: PreviewProps) {
	const {t} = useTranslation();
	const {stabilityImages, deleteStabilityImage} = drawStore();
	const {isMobile} = useDocumentResize();

	const currentImageInfo = useMemo(() => {
		return stabilityImages.find(item => item.id === props.imageInfo.id) || {} as StabilityImageInfo;
	}, [props.imageInfo.id, stabilityImages]);

	const currentImage = useMemo(() => {
		return currentImageInfo.images?.length && currentImageInfo.images?.length > 0 ? currentImageInfo.images[props.imageInfo.index] : undefined;
	}, [currentImageInfo, props.imageInfo.index]);

	const currentImageSize = useMemo(() => {
		const params = currentImageInfo.parameters;
		if (!params) return '';
		if ((params as TextToImageParams).width && (params as TextToImageParams).height) {
			return `${(params as TextToImageParams).width} x ${(params as TextToImageParams).height}`;
		}
		return '';
	}, [currentImageInfo.parameters]);

	const currentImageRatio = useMemo(() => {
		const params = currentImageInfo.parameters;
		if (!params) return '';
		if ((params as TextToImageParams).width && (params as TextToImageParams).height) {
			return DiffusionImageSizeMap.find(item =>
				item.width === (params as TextToImageParams).width && item.height === (params as TextToImageParams).height)?.ratio;
		}
		return '';
	}, [currentImageInfo.parameters]);

	return (
		<div className={joinTrim([styles.draw_preview, isMobile ? styles.draw_preview_mobile : undefined])}>
			<div className={styles.draw_preview_image}>
				{props.originalNode}
			</div>
			<div className={styles.draw_preview_info}>
				<div className={styles.draw_preview_info_prompt}>
					<span>{t('提示')}</span>
					<p>{currentImageInfo.parameters?.text_prompts[0].text}</p>
				</div>
				<div className={styles.draw_preview_info_operate}>
					<Tooltip title={t('下载')} zIndex={2000}>
						<Button type="text"
								icon={<DownloadOutlined/>}
								disabled={!currentImage?.base64}
								onClick={() => {
									if (!currentImage?.base64) return
									downloadImagesAsZip([currentImage?.base64]).catch(() => {
										message.error('Download failed');
									});
								}}
						/>
					</Tooltip>
					<Tooltip title={t('删除')} zIndex={2000}>
						<Button type="text"
								icon={<DeleteOutlined/>}
								disabled={!currentImage}
								onClick={() => {
									if (!currentImage) return
									deleteStabilityImage(currentImageInfo.id, props.imageInfo.index)
								}}
						/>
					</Tooltip>
					<Tooltip>
						<Button type="text" icon={<LeftSquareOutlined/>} disabled/>
					</Tooltip>
				</div>
				<div className={styles.draw_preview_info_config}>
					<div
						className={styles.draw_preview_info_config_model}>
						<span>{currentImageInfo.parameters?.model}</span>
					</div>
					{currentImageInfo.parameters?.style_preset &&
						<div
							className={styles.draw_preview_info_config_style}>
							<img src={new URL(`../stable-studio-styles/${currentImageInfo.parameters?.style_preset}.png`, import.meta.url).href}
								 alt={currentImageInfo.parameters?.style_preset}/>
							<span>{currentImageInfo.parameters?.style_preset}</span>
						</div>
					}
					<div className={styles.draw_preview_info_configs}>
						<div
							className={styles.draw_preview_info_configs_ratio}>
							<span>{t('比例')}</span>
							<span>{currentImageRatio}</span>
						</div>
						<div
							className={styles.draw_preview_info_configs_size}>
							<span>{t('尺寸')}</span>
							<span>{currentImageSize}</span>
						</div>
						<div
							className={styles.draw_preview_info_configs_seed}>
							<span>{t('种子数')}</span>
							<span>{currentImage?.seed}</span>
						</div>
						<div
							className={styles.draw_preview_info_configs_steps}>
							<span>{t('生成步数')}</span>
							<span>{currentImageInfo.parameters?.steps}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Preview;
