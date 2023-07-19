import styles from "./index.module.less";
import {Button, Card, Input, Modal, Select, Slider, Tooltip, Upload} from "antd";
import {
	EyeFilled,
	EyeInvisibleFilled,
	HolderOutlined,
	InboxOutlined,
	RightOutlined,
	RiseOutlined,
	SlackOutlined,
	StopOutlined
} from "@ant-design/icons";
import {Collapse} from "antd/lib";
import React, {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {
	DiffusionImageSizeMap,
	DiffusionSamplerMap,
	GenerationRequestParams,
	StylePresetMap
} from "@/types/stable_studio";
import {configStore} from "@/store";
import computer_svg from "@/assets/computer.svg";
import phone_svg from "@/assets/phone.svg";
import drawStore from "../../../../store/draw/slice";
import Dice from "@/pages/draw/components/config/dice";
import {RandomPrompt} from "@/pages/draw/components/config/RandomPrompt";

interface ConfigProps {
	onConfigChange: (configs: GenerationRequestParams & { model?: string }) => void;
}

function Config(props: ConfigProps) {
	const {t} = useTranslation();
	const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);
	const [advancedVisable, setAdvancedVisable] = useState(false);
	const {models} = configStore()
	const {stabilityImages} = drawStore();
	const [configs, setConfigs] =
		useState<GenerationRequestParams & { model?: string }>(() => {
			if (stabilityImages.length > 0 && stabilityImages[0].status === 'loading') {
				return stabilityImages[0].parameters as GenerationRequestParams & { model?: string };
			}
			return {
				type: 'text-to-image',
				samples: 4,
				steps: 50,
				sampler: 'DDIM',
				width: 512,
				height: 512,
				text_prompts: [
					{
						text: '',
					},
					{
						text: '',
						weight: -1
					},
				]
			}
		});

	useEffect(() => {
		if (stabilityImages.length > 0 && stabilityImages[0].status === 'loading') {
			setConfigs(configs => {
				return stabilityImages[0].parameters as GenerationRequestParams & { model?: string };
			})
		}
	}, [stabilityImages]);

	useEffect(() => {
		props.onConfigChange(configs);
	}, [configs]);

	const modelOptions = useMemo(() => {
		const modelOptions = models.filter(m => m.supplier === 'stability')
			.map(m => ({label: m.name, value: m.model}))
		setConfigs(configs => {
			return {...configs, model: modelOptions[0].value}
		});
		return modelOptions;
	}, [models]);

	const samplerOptions = useMemo(() => {
		return Object.keys(DiffusionSamplerMap)
			.filter(key => isNaN(Number(key)))
			.map(key => ({label: key, value: key}));
	}, []);

	const stylePresetOptions = useMemo(() => {
		return Object.keys(StylePresetMap)
			.filter(key => isNaN(Number(key)))
			.map(key => {
				return {key: key, src: key};
			});
	}, []);

	const imageSizeSliderValue = useMemo(() => {
		let index = -1;
		if (configs.type == "text-to-image") {
			index = DiffusionImageSizeMap.findIndex(value => value.height === configs.height && value.width === configs.width)
		}
		return index === -1 ? 5 : index + 1;
		// @ts-ignore
	}, [configs.height, configs.width]);

	function handleShufflePrompt(e: any) {
		e.stopPropagation();
		setConfigs({
			...configs,
			text_prompts: [
				{
					...configs.text_prompts[0],
					text: RandomPrompt.get()
				},
				configs.text_prompts[1]
			]
		});
	}

	return (
		<>
			<div className={styles.draw_config}>
				<div className={styles.draw_style}>
					<p>{t('风格')}</p>
					<Button
						className={styles.draw_style_button}
						type="text"
						onClick={() => setIsStyleModalOpen(true)}
					>
						{configs.style_preset && <img
							src={new URL(`../stable-studio-styles/${configs.style_preset}.png`, import.meta.url).href}
							alt={configs.style_preset}/>
						}
						<h4>{configs.style_preset?.toUpperCase() || 'Choose style'}</h4>
						<RightOutlined/>
					</Button>
				</div>
				<div className={styles.draw_prompt}>
					<div className={styles.draw_prompt_positive}>
						<Collapse
							defaultActiveKey={['1']}
						>
							<Collapse.Panel
								header={t('提示')}
								key="1"
								extra={
									<Tooltip title={t('随机提示')}>
										<Button size={"small"} type="text" icon={<Dice/>}
												onClick={handleShufflePrompt}
										/>
									</Tooltip>
								}
							>
								<Input.TextArea placeholder={t('你想要生成什么样的图片？')!} autoSize={true}
												value={configs.text_prompts[0].text}
												onChange={(e) => {
													setConfigs({
														...configs,
														text_prompts: [
															{
																...configs.text_prompts[0],
																text: e.target.value
															},
															configs.text_prompts[1]
														]
													});
												}}
								/>
							</Collapse.Panel>
						</Collapse>
					</div>
					<div className={styles.draw_prompt_negative}>
						<Collapse>
							<Collapse.Panel header={t('反向提示')} key="1">
								<Input.TextArea placeholder={t('你想避免什么？')!} autoSize={true}
												value={configs.text_prompts[1].text}
												onChange={(e) => {
													setConfigs({
														...configs,
														text_prompts: [
															configs.text_prompts[0],
															{
																...configs.text_prompts[1],
																text: e.target.value
															}
														]
													});
												}}
								/>
							</Collapse.Panel>
						</Collapse>
					</div>
				</div>
				<div className={styles.draw_upload}>
					<Collapse>
						<Collapse.Panel header={t('上传图片')} key="1" collapsible={"disabled"}>
							<Upload
								listType='picture'
								maxCount={1}
								// showUploadList={false}
								onChange={(info) => {

								}}
							>
								<p className={styles.draw_upload_icon}>
									<InboxOutlined/>
								</p>
								<p className={styles.draw_upload_text}>{t('使用图像生成图像')}</p>
							</Upload>
						</Collapse.Panel>
					</Collapse>
				</div>
				<div className={styles.draw_setting}>
					<Collapse>
						<Collapse.Panel header={t('设置')} key="1">
							<div className={styles.draw_setting_item}>
								<div className={styles.draw_setting_size}>
									<div className={styles.draw_setting_size_title}>
										<img src={computer_svg} alt="computer"/>
										<span>{DiffusionImageSizeMap[(imageSizeSliderValue || 6) - 1].ratio}</span>
										<img src={phone_svg} alt="phone"/>
									</div>
									<Slider
										min={1}
										max={9}
										defaultValue={5}
										value={imageSizeSliderValue}
										onChange={(value) => {
											setConfigs({
												...configs,
												// @ts-ignore
												height: DiffusionImageSizeMap[value - 1].height,
												width: DiffusionImageSizeMap[value - 1].width
											});
										}}
										tooltip={{
											formatter: (value) => {
												const size = DiffusionImageSizeMap[(value || 6) - 1];
												return `${size.width} x ${size.height}`;
											}
										}}
									/>
								</div>
								<div className={styles.draw_setting_count}>
									<div className={styles.draw_setting_count_title}>
										<span>{t('图片数量')}</span>
										<span>{configs.samples}</span>
									</div>
									<Slider min={1} max={10} value={configs.samples}
											onChange={(e) => {
												setConfigs({
													...configs,
													samples: e
												});
											}}
									/>
								</div>
								<div className={styles.draw_setting_advance_switch}>
									<a onClick={() => {
										setAdvancedVisable(!advancedVisable);
									}}>
										{advancedVisable ? <EyeFilled/> : <EyeInvisibleFilled/>}{t('高级设置')}
									</a>
								</div>
								{advancedVisable &&
									<div className={styles.draw_setting_advance}>
										<div className={styles.draw_setting_advance_item}>
											<span>{t('提示权重')}</span>
											<Input prefix={<HolderOutlined/>} placeholder="Auto"
												   type='number'
												   value={configs.text_prompts[0].weight}
												   onChange={(e) => {
													   setConfigs({
														   ...configs,
														   text_prompts: [
															   {
																   ...configs.text_prompts[0],
																   weight: e.target.value === '' ? undefined : Number(e.target.value)
															   },
															   configs.text_prompts[1]
														   ]
													   });
												   }}
											/>
										</div>
										<div className={styles.draw_setting_advance_item}>
											<span>{t('生成步数')}</span>
											<Input prefix={<RiseOutlined/>}
												   value={configs.steps}
												   type='number'
												   onChange={(e) => {
													   setConfigs({
														   ...configs,
														   steps: e.target.value === '' ? undefined : Number(e.target.value)
													   });
												   }}
											/>
										</div>
										<div className={styles.draw_setting_advance_item}>
											<span>{t('种子数')}</span>
											<Input prefix={<SlackOutlined/>} placeholder="Auto"
												   value={configs.seed}
												   type='number'
												   onChange={(e) => {
													   setConfigs({
														   ...configs,
														   seed: e.target.value === '' ? undefined : Number(e.target.value)
													   });
												   }}
											/>
										</div>
										<div className={styles.draw_setting_advance_item}>
											<span>{t('模型')}</span>
											<Select
												value={configs.model}
												onChange={(value) => {
													setConfigs({
														...configs,
														model: value
													});
												}}
												options={modelOptions}
											/>
										</div>
										<div className={styles.draw_setting_advance_item}>
											<span>{t('采样器')}</span>
											<Select options={samplerOptions}
													value={configs.sampler}
													onChange={(value) => {
														setConfigs({
															...configs,
															sampler: value
														});
													}}
											/>
										</div>
									</div>
								}
							</div>
						</Collapse.Panel>
					</Collapse>
				</div>
			</div>

			<Modal
				title={t('风格')}
				open={isStyleModalOpen}
				onCancel={() => setIsStyleModalOpen(false)}
				footer={null}
				maskClosable={true}
				bodyStyle={{maxHeight: 'calc(100vh - 200px)', overflowY: 'auto'}}
			>
				<Card className={styles.draw_style_images}>
					<Card.Grid key='none' className={styles.draw_style_images_item} onClick={() => {
						setConfigs({
							...configs,
							style_preset: '',
						});
						setIsStyleModalOpen(false);
					}}>
						<StopOutlined/>
						<span>None</span>
					</Card.Grid>
					{stylePresetOptions.map(option => (
						<Card.Grid key={option.key} className={styles.draw_style_images_item} onClick={() => {
							setConfigs({
								...configs,
								style_preset: option.key
							});
							setIsStyleModalOpen(false);
						}}>
							<img src={new URL(`../stable-studio-styles/${option.src}.png`, import.meta.url).href}
								 alt={option.key}/>
							<span>{option.key.toUpperCase()}</span>
						</Card.Grid>
					))}
				</Card>
			</Modal>
		</>
	)
}

export default Config;
