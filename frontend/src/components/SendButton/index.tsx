import styles from "./index.module.less";
import {useTranslation} from "react-i18next";
import {joinTrim} from "@/utils";
import UseDocumentResize from "@/hooks/useDocumentResize";

interface SendButtonProps {
	onClick: () => void
	disabled?: boolean
	className?: string
}

function SendButton(props: SendButtonProps) {
	const {t} = useTranslation()
	const {isMobile} = UseDocumentResize()
	return (
		<button
			className={joinTrim([styles.send_button, props.className])}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			<div className={styles.send_button_svg} style={isMobile ? {marginRight: 0} : {}}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
					<path fill="none" d="M0 0h24v24H0z"></path>
					<path fill="currentColor"
						  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
				</svg>
			</div>
			{!isMobile && <span>{t('发送')}</span>}
		</button>
	)
}

export default SendButton
