import styles from './index.module.less';
import Layout from "@/components/Layout";
import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {Button, Divider, Image, message, Tooltip, Typography} from "antd";
import {
	CloseOutlined,
	DeleteOutlined,
	DownloadOutlined,
	DownOutlined,
	LeftSquareOutlined,
	UpOutlined
} from "@ant-design/icons";
import {TransformType} from "rc-image/lib/hooks/useImageTransform";
import Config from "./components/config";
import Preview from "@/pages/draw/components/preview";
import {GenerationRequestParams, TextToImageResponse} from "@/types/stable_studio";
import cursor_svg from "@/assets/cursor.svg";
import drawStore from "../../store/draw/slice";
import dayjs from "dayjs";
import {downloadImagesAsZip, generateUUID, joinTrim} from "@/utils";
import {postImagesGenerations} from "@/request/api";
import {StabilityImageInfo} from "@/types";
import useDocumentResize from "@/hooks/useDocumentResize";
import {AnimatePresence, motion} from "framer-motion"

function Draw() {
	const {t} = useTranslation();
	const {isMobile} = useDocumentResize();
	const {stabilityImages, addStabilityImage, deleteStabilityImage, updateStabilityImage} = drawStore();
	const [dreamButtonLoading, setDreamButtonLoading] = React.useState(false);
	const [dreamButtonDisable, setDreamButtonDisable] = React.useState(true);
	const [configVisible, setConfigVisible] = React.useState(false);

	useEffect(() => {
		!isMobile && setConfigVisible(true);
	}, [isMobile]);

	useEffect(() => {
		if (stabilityImages.length > 0 && stabilityImages[0].status === 'loading') {
			let prompts = stabilityImages[0].parameters?.text_prompts;
			if (prompts && prompts.length > 0 && prompts[0].text?.length > 0) {
				setDreamButtonDisable(false);
				return;
			}
		}
		setDreamButtonDisable(true);
	}, [stabilityImages]);

	function handleConfigChange(configs: GenerationRequestParams & { model?: string }) {
		if (stabilityImages.length > 0 && stabilityImages[0].status === 'loading') {
			updateStabilityImage({
				id: stabilityImages[0].id,
				status: 'loading',
				parameters: configs,
			});
		} else {
			addStabilityImage({
				id: generateUUID(),
				status: 'loading',
				parameters: configs,
			});
		}
	}

	function handleDream() {
		let parameters = stabilityImages[0].parameters;
		if (parameters) {
			let params = JSON.parse(JSON.stringify(parameters));
			setDreamButtonLoading(true);
			if (params.text_prompts && params.text_prompts.length > 0) {
				if (params.text_prompts[0].text?.length <= 0) {
					message.error(t('请输入 prompt'));
					return;
				}
				if (params.text_prompts.length > 1 && params.text_prompts[1].text.length <= 0) {
					params.text_prompts.pop()
				}
			}
			// @ts-ignore
			postImagesGenerations('stability', params, {}, {
				timeout: 1000 * 60 * 2, // 2min
			}).then((res) => {
				if (res.code) return;
				updateStabilityImage({
					...stabilityImages[0],
					status: 'finish',
					images: res.data as TextToImageResponse[],
					create_time: new Date(),
				});
			}).finally(() => {
				setDreamButtonLoading(false);
			});
		}
	}

	function DefaultImage() {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
				 stroke="currentColor" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round"
					  d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
			</svg>
		)
	}

	function handleDownloadImages(item: StabilityImageInfo) {
		if (item.images && item.images.length > 0) {
			downloadImagesAsZip(item.images.map((image) => image.base64))
				.catch((err) => {
					message.error(err.message);
				});
		}
	}

	return (
		<div className={styles.draw}>
			<Layout>
				<AnimatePresence>
					<aside className={isMobile ? styles.draw_aside_mobile : styles.draw_aside}>
						<div className={styles.draw_aside_mobile_shrink}
							 style={{display: isMobile ? 'flex' : 'none'}}
							 onClick={() => {
								 setConfigVisible(!configVisible);
							 }}
						>
							{configVisible ? <DownOutlined/> : <UpOutlined/>}
						</div>
						{configVisible && (
							<motion.div
								initial={{opacity: 0, y: 100}}
								animate={{opacity: 1, y: 0}}
								exit={{opacity: 0, y: 100}}
								transition={{delay: 0.1}}
								style={{overflow: 'auto'}}
							>
								<Config onConfigChange={handleConfigChange}/>
							</motion.div>
						)}
						<div className={styles.draw_create}>
							<Button style={{display: 'flex', justifyContent: 'center'}}
									type="primary"
									icon={<img style={{width: '1.3rem'}} src={cursor_svg} alt="cursor"/>}
									loading={dreamButtonLoading}
									disabled={dreamButtonDisable}
									onClick={handleDream}
							>
								Dream
							</Button>
						</div>
					</aside>
				</AnimatePresence>
				<main className={joinTrim([styles.draw_main, isMobile ? styles.draw_main_mobile : undefined])}>
					<div className={styles.draw_iamges}>
						{stabilityImages.map((item, _) => (
							<div className={styles.draw_once}>
								{item.create_time && (
									<Divider children={dayjs(item.create_time).format('YYYY-MM-DD HH:MM:ss')}/>
								)}
								{item.status === 'finish' &&
									<div className={styles.draw_once_head}>
										<div className={styles.draw_once_head_title}>
											<Typography.Text ellipsis style={{maxWidth: '14rem'}}>
												{item.parameters!.text_prompts[0].text}
											</Typography.Text>
											<Tooltip title={t('设置为此配置')}>
												<Button
													icon={<LeftSquareOutlined/>}
													onClick={() => {
														handleConfigChange({
															...item.parameters!,
														});
													}}
												/>
											</Tooltip>
										</div>
										<div className={styles.draw_once_head_operate}>
											<Tooltip title={t('下载 {{count}} 张图片', {count: item.parameters!.samples})}>
												<Button
													icon={<DownloadOutlined/>}
													onClick={() => {
														handleDownloadImages(item);
													}}
												/>
											</Tooltip>
											<Tooltip title={t('删除 {{count}} 张图片', {count: item.parameters!.samples})}>
												<Button
													icon={<DeleteOutlined/>}
													onClick={() => {
														deleteStabilityImage(item.id);
													}}
												/>
											</Tooltip>
										</div>
									</div>
								}
								<div className={styles.draw_once_images}>
									{Array.from({length: item.parameters?.samples || 0}, (_, index) => {
										const image = item.images ? item.images[index] as TextToImageResponse & {
											id: string
										} : undefined;
										return (
											<div className={styles.draw_once_images_item}>
												{(item.status === 'finish' && image?.base64 && (
													<Image
														src={`data:image/png;base64,${image.base64}`}
														rootClassName={isMobile ? 'draw_image_mobile' : 'draw_image'}
														preview={{
															maxScale: 1,
															closeIcon: <CloseOutlined/>,
															imageRender: (originalNode: React.ReactNode, info: {
																transform: TransformType;
															}) => {
																return (
																	<Preview
																		originalNode={originalNode}
																		imageInfo={{
																			id: item.id,
																			index,
																		}}
																	/>
																);
															}
														}}
													/>
												)) || (
													<DefaultImage/>
												)}
											</div>
										)
									})}
								</div>
							</div>
						))}
					</div>
				</main>
			</Layout>
		</div>
	)
}

export default Draw;
