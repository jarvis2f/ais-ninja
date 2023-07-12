import {UserInfo} from '@/types'
import styles from './index.module.less'
import {Space, Statistic, Tooltip} from 'antd'
import {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import normal_member_png from '@/assets/normal_member.svg';
import vip_member_png from '@/assets/vip_member.svg';
import pro_member_png from '@/assets/pro_member.svg';
import business_member_png from '@/assets/business_member.svg';

type User = UserInfo & {
	vip_icon?: {
		name: string;
		icon: string;
	}
}

function UserInfoCard(props: { info?: UserInfo, children?: React.ReactNode; }) {
	const {t} = useTranslation()

	const vipIcon: { [key: number]: { name: string, icon: string } } = {
		0: {
			name: t('普通用户'),
			icon: normal_member_png,
		},
		1: {
			name: t('高级会员'),
			icon: vip_member_png,
		},
		2: {
			name: t('专业会员'),
			icon: pro_member_png,
		},
		3: {
			name: t('企业会员'),
			icon: business_member_png,
		},
	}

	const vipDay = useMemo(() => {
		if (!props.info?.vip_expire_time) return 0
		const today = new Date()
		today.setHours(0, 0, 0, 0)
		const todayTime = today.getTime()
		const levelExpireTime = new Date(props.info?.level_expire_time || 0).getTime()
		if (levelExpireTime < todayTime) return 0
		const time = Math.ceil((levelExpireTime - todayTime) / 86400000)
		return time
	}, [props])

	const isSvip = useMemo(() => {
		if (!props.info?.svip_expire_time) return 0
		const today = new Date()
		today.setHours(0, 0, 0, 0)
		const todayTime = today.getTime()
		const svipExpireTime = new Date(props.info?.svip_expire_time || 0).getTime()
		if (svipExpireTime < todayTime) return 0
		const time = Math.ceil((svipExpireTime - todayTime) / 86400000)
		return time
	}, [props])


	const info = useMemo(() => {
		const info = props.info as User
		if (info) {
			const level = info.level
			info.vip_icon = vipIcon[level]
		}
		return info;
	}, [props])

	return (
		<div className={styles.userInfo}>
			<div className={styles.userInfo_card}>
				<img className={styles.userInfo_avatar} src={info?.avatar} alt=""/>
				<div className={styles.userInfo_info}>
					<div className={styles.userInfo_info_title}>
						<span>{info?.nickname}</span>
						<Tooltip title={info.vip_icon?.name}><img src={info.vip_icon?.icon} alt=""/></Tooltip>
					</div>
					<span className={styles.userInfo_info_account}>{info?.account}</span>
				</div>
				<div className={styles.userInfo_vip}>
					<Space wrap size="large">
						<Statistic title={t('积分')} value={info?.integral}/>
						<Statistic title={`${info.vip_icon?.name}${t('(天)')}`} value={vipDay}/>
					</Space>
				</div>
			</div>
			{props.children}
		</div>
	)
}

export default UserInfoCard
