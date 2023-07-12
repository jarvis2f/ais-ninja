import styles from './index.module.less'
import {Chart} from "@antv/g2";
import {useEffect, useRef, useState} from "react";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Select} from "antd";
import {APIKeyUsageInfo} from "@/types";
import {useTranslation} from "react-i18next";
import {getAPIKeyUsage, getAPIKeyUsageDaily} from "@/request/api";
import dayjs from "dayjs";
import {Collapse} from "antd/lib";
import {ItemType} from "rc-collapse/es/interface";
import {ProSkeleton} from "@ant-design/pro-components";
import useDocumentResize from "@/hooks/useDocumentResize";

function UserApikeyUsage() {
	const {t} = useTranslation();
	const monthUsageChartContainer = useRef(null);
	const monthUsageChart = useRef(null);
	const [apikeyUsageList, setApikeyUsageList] = useState<Array<APIKeyUsageInfo>>([]);
	const [usageDailyItems, setUsageDailyItems] = useState<ItemType[]>([]);
	const [usageDailyLoading, setUsageDailyLoading] = useState<boolean>(false);
	const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
	const [currentMonthDates, setCurrentMonthDates] = useState<{ label: string, value: string }[]>();
	const [currentDate, setCurrentDate] = useState<string>();
	const documentResize = useDocumentResize();

	useEffect(() => {
		getAPIKeyUsage({month: currentMonth}).then((res) => {
			if (res.code) return;
			setApikeyUsageList(res.data);
		})
	}, [currentMonth]);

	useEffect(() => {
		if (!monthUsageChart.current && documentResize.width > 0) {
			monthUsageChart.current = renderMonthUsageChart(monthUsageChartContainer.current!) as any;
		}
		if (monthUsageChart.current) {
			(monthUsageChart.current as any).changeData(apikeyUsageList);
		}
	}, [apikeyUsageList, documentResize.width]);

	function renderMonthUsageChart(container: HTMLDivElement) {
		const isMobile = documentResize.width < 768;
		const dateLeap = isMobile ? 3 : 2;
		const chart = new Chart({
			width: isMobile ? documentResize.width - 70 : 768,
			height: isMobile ? 300 : 400,
			container: container,
			theme: 'classic',
		});
		chart
			.interval()
			.data(apikeyUsageList)
			.encode('x', 'date')
			.encode('y', 'usage')
			.axis('x', {
				// @ts-ignore
				labelFormatter: (datum, index, data) => {
					const date = dayjs(datum);
					if (data.length >= 29) {
						return index % dateLeap === 0 ? date.format('DD') : '';
					} else {
						return date.format('DD');
					}
				}
			})

		chart
			.title(t('月度使用情况')!)
			.render()
			.then(() => {
				// 渲染成功
				console.log('渲染成功')
			})
			.catch((error) => {
				// 渲染失败
				console.log('渲染失败', error)
			})
		return chart;
	}

	useEffect(() => {
		const currentMonthDates = [];
		const currentMonthDaysCount = new Date(new Date().getFullYear(), currentMonth - 1, 0).getDate();
		for (let i = 1; i <= currentMonthDaysCount; i++) {
			const date = new Date(new Date().getFullYear(), currentMonth - 1, i);
			currentMonthDates.push({
				label: dayjs(date).format('YYYY-MM-DD'),
				value: dayjs(date).format('YYYY-MM-DD')
			});
		}
		setCurrentMonthDates(currentMonthDates);
	}, [currentMonth])

	useEffect(() => {
		if (!currentDate) return;
		setUsageDailyLoading(true);
		getAPIKeyUsageDaily({date: currentDate}).then((res) => {
			if (res.code) return;
			const apikeyUsageDailyList = res.data;
			const usageDailyItems = [];
			for (let i = 0; i < apikeyUsageDailyList.length; i++) {
				const dailyInfo = apikeyUsageDailyList[i];
				const usageDailyItem = {
					key: dailyInfo.item,
					label: renderUsageDailyLabel(dailyInfo.item, dailyInfo.request_count + " 次"),
					children: (
						<Collapse expandIconPosition="end" ghost
								  items={convertHourlyItems(dailyInfo.item, dailyInfo.hourly)}/>
					)
				}
				usageDailyItems.push(usageDailyItem);
			}
			setUsageDailyItems(usageDailyItems);
			// 延迟 500ms 加载，避免闪烁
			setTimeout(() => {
				setUsageDailyLoading(false);
			}, 500);
		})
	}, [currentDate])

	function renderUsageDailyLabel(title: string, subtitle: string) {
		return (
			<div className={styles.usage_daily_label}>
				<span className={styles.usage_daily_label_title}>{title}</span>
				<span className={styles.usage_daily_label_subtitle}>{subtitle}</span>
			</div>
		)
	}

	function convertHourlyItems(prefix: string, hourly: any[]) {
		const hourlyItems: ItemType[] = [];
		for (let j = 0; j < hourly.length; j++) {
			const hourlyInfo = hourly[j];
			const hourlyItem = {
				key: `${prefix}-${hourlyInfo.hour}`,
				label: renderUsageDailyLabel(`${hourlyInfo.hour}:00`, hourlyInfo.request_count + " 次"),
				children: (
					<Collapse ghost expandIconPosition="end"
							  items={convertModelItems(`${prefix}-${hourlyInfo.hour}`, hourlyInfo.models)}/>
				)
			}
			hourlyItems.push(hourlyItem);
		}
		return hourlyItems;
	}

	function convertModelItems(prefix: string, models: any[]) {
		const modelItems: ItemType[] = [];
		for (let k = 0; k < models.length; k++) {
			const modelInfo = models[k];
			const modelItem = {
				key: `${prefix}-${modelInfo.model}-${modelInfo.time}`,
				label: renderUsageDailyLabel(modelInfo.time, modelInfo.request_count + " 次"),
				children: (
					<div className={styles.usage_daily_items_content}>
						<div className={styles.usage_daily_items_content_model}>
							{modelInfo.model}
						</div>
						<div className={styles.usage_daily_items_content_tokens}>
							{modelInfo.prompt_tokens} prompt + {modelInfo.completion_tokens} completion
							= {modelInfo.prompt_tokens + modelInfo.completion_tokens} tokens
						</div>
					</div>
				)
			}
			modelItems.push(modelItem);
		}
		return modelItems;
	}

	function changeMonth(plus: boolean) {
		let newMonth = currentMonth;
		if (plus) {
			newMonth++;
		} else {
			newMonth--;
		}
		if (newMonth < 1) {
			newMonth = 12;
		}
		if (newMonth > 12) {
			newMonth = 1;
		}
		setCurrentMonth(newMonth);
	}

	return (
		<div className={styles.usage}>
			<div className={styles.usage_help}>
				{t('您将在下面找到您组织的 API 使用情况摘要。所有日期和时间均基于 UTC，数据可能会延迟最多 5 分钟。')}
			</div>
			<div className={styles.usage_month}>
				<div className={styles.usage_month_select}>
					<div className={styles.usage_month_select_left} onClick={() => changeMonth(false)}>
						<LeftOutlined/>
					</div>
					<div className={styles.usage_month_select_center}>
						{t('month.' + currentMonth)}
					</div>
					<div className={styles.usage_month_select_right} onClick={() => changeMonth(true)}>
						<RightOutlined/>
					</div>
				</div>
				<div className={styles.usage_month_chart} ref={monthUsageChartContainer}></div>
			</div>
			<div style={documentResize.width < 768 ? {width: '100%'} : {}} className={styles.usage_daily}>
				<div className={styles.usage_daily_title}>
					{t('每日使用情况')}
				</div>
				<div className={styles.usage_daily_select}>
					<Select options={currentMonthDates} style={{width: 160}}
							placeholder={t('选择一天')}
							onSelect={(value) => setCurrentDate(value)}/>
				</div>
				<div className={styles.usage_daily_items}>
					{usageDailyLoading ? <ProSkeleton type='list' pageHeader={false} statistic={false} list={1}/> : (
						<Collapse
							ghost
							expandIconPosition={"end"}
							items={usageDailyItems}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default UserApikeyUsage
