import styles from './index.module.less';
import {joinTrim} from "@/utils";
import React from "react";

interface CardProps {
	title: string;
	para?: string | React.ReactNode;
	onClick?: () => void;
	className?: string;
	style?: React.CSSProperties;
}

function Card(props: CardProps) {

	return (
		<div style={props.style}
			 className={joinTrim([styles.ais_card, props.className])}
			 onClick={props.onClick}>
			<div className={styles.ais_card_content}>
				<p className={styles.ais_card_title}>
					{props.title}
				</p>
				<p className={styles.ais_card_para}>
					{props.para}
				</p>
			</div>
		</div>
	)
}

export default Card;
