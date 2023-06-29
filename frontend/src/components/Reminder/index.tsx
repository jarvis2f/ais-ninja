import useDocumentResize from '@/hooks/useDocumentResize';
import styles from './index.module.less';
import {useTranslation} from 'react-i18next';
import codePNG from '@/assets/code.png';
import assistantPNG from '@/assets/assistant.png';
import articlePNG from '@/assets/article.png';
import filmPNG from '@/assets/film.png';
import robotPNG from '@/assets/robot.png';

function Reminder() {
	const {t} = useTranslation();
	const {width} = useDocumentResize();
	const list = [
		{
			id: 'zhichangzhuli',
			icon: assistantPNG,
			name: t('职场助理'),
			desc: t('作为手机斗地主游戏的产品经理，该如何做成国内爆款？')
		},
		{
			id: 'dianyingjiaoben',
			icon: filmPNG,
			name: t('电影脚本'),
			desc: t('写一段电影脚本，讲一个北漂草根创业逆袭的故事')
		},
		{
			id: 'cuanxieduanwen',
			icon: articlePNG,
			name: t('撰写短文'),
			desc: t('写一篇短文，用故事阐释幸福的意义')
		},
		{
			id: 'daimabianxie',
			icon: codePNG,
			name: t('代码编写'),
			desc: t('使用JavaScript写一个获取随机数的函数')
		}
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
						<div key={item.id} className={styles.reminder_question_item}>
							<img src={item.icon} alt=""/>
							<h3>{item.name}</h3>
							<p>{item.desc}</p>
						</div>
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
