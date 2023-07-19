import useDocumentResize from '@/hooks/useDocumentResize';
import styles from './index.module.less';
import {useTranslation} from 'react-i18next';
import codePNG from '@/assets/code.png';
import assistantPNG from '@/assets/assistant.png';
import articlePNG from '@/assets/article.png';
import filmPNG from '@/assets/film.png';
import robotPNG from '@/assets/robot.png';
import Card from "@/components/Card";

function Reminder() {
	const {t} = useTranslation();
	const {width} = useDocumentResize();
	const list = [
		{
			id: 'zhichangzhuli',
			icon: assistantPNG,
			name: t('多模型支持'),
			desc: t('支持OpenAI(ChatGPT4)、anthropic(claude-100k)等大模型'),
			color: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 50%, #FF89C0 100%)'
		},
		{
			id: 'dianyingjiaoben',
			icon: filmPNG,
			name: t('插件系统'),
			desc: t('海量插件，自定义插件满足你的各种需求'),
			color: 'linear-gradient(160deg, #8A2BE2 0%, #4258D0 40%, #1FC4CB 100%)'
		},
		{
			id: 'cuanxieduanwen',
			icon: articlePNG,
			name: t('绘画、API代理'),
			desc: (<>
				<p>{t('支持 DALL.E2、stability 绘图模型')}</p>
				<p>{t('支持 API 代理，实时精准计费')}</p>
			</>),
			color: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)'
		},
	];

	return (
		<div className={styles.reminder}>
			<h2 className={styles.reminder_title}>
				<img src={robotPNG} alt=""/>
				{t('欢迎来到')} {import.meta.env.VITE_APP_TITLE}
			</h2>
			<p className={styles.reminder_message}>
				{t('与AI智能聊天，畅想无限可能！基于先进的AI引擎，让你的交流更加智能、高效、便捷！')}
			</p>
			<p className={styles.reminder_message}>
				<span>Shift</span> + <span>Enter</span> {t('换行')}. {t('开头输入')}
				<span>/</span> {t('召唤 Prompt 角色预设')}.
			</p>
			<div className={styles.reminder_question}>
				{width > 600 &&
					list.map((item) => (
						<Card style={{backgroundImage: item.color}} title={item.name} para={item.desc}/>
					))}
			</div>
			<div className={styles.reminder_policy}>
				<a href="/privacy-policy">{t('隐私政策')}</a>
				<a href="/service-terms">{t('服务条款')}</a>
			</div>
		</div>
	);
}

export default Reminder;
