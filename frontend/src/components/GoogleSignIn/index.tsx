import React, {useEffect} from 'react';
import {userAsync} from '@/store/async';

interface CredentialResponse {
	credential: string;
}

declare global {
	interface Window {
		handleCredentialResponse?: (response: CredentialResponse) => void;
	}
}

export function GoogleSignIn(props: {
	clientId: string,
	onSuccess?: () => void
}) {

	useEffect(() => {
		if (!props.clientId) return ;
		const script = document.createElement('script');
		script.src = 'https://accounts.google.com/gsi/client';
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);

		window.handleCredentialResponse = (response) => {
			new Promise((resolve, reject) => {
				userAsync
					.fetchSocialLogin({
						type: 'google',
						credential: response.credential
					}).then(r => {
					if (r.code) {
						reject(false)
						return
					}
					props.onSuccess?.()
					resolve(true)
				}).catch(() => {
					reject(false)
				})
			}).then(r => {
				console.log(r)
			});
		};

		return () => {
			const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
			if (script) {
				document.body.removeChild(script);
			}
			delete window.handleCredentialResponse;
		};
	}, []);

	return (
		<>
			<div id="g_id_onload"
				 data-client_id={props.clientId}
				 data-context="signin"
				 data-ux_mode="popup"
				 data-callback="handleCredentialResponse"
				 data-itp_support="true"
			/>

			<div className="g_id_signin"
				 data-type="icon"
				 data-shape="square"
				 data-theme="outline"
				 data-text="signin_with"
				 data-size="medium"
			/>
		</>
	)
}
