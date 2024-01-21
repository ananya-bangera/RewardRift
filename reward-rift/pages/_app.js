import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import Layout from '../components/layout';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useRouter } from 'next/router';
import { MetaMaskProvider } from 'metamask-react';
import Meta from '../components/Meta';
import UserContext from '../components/UserContext';
import { useEffect, useRef } from 'react';
import { ThirdwebProvider } from "@thirdweb-dev/react/solana";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import {goerli, sepolia, polygonMumbai } from "wagmi/chains";


// Change the network to the one you want to use: "mainnet-beta", "testnet", "devnet", "localhost" or your own RPC endpoint
// const desiredNetwork = "sepolia";
const config = createConfig(
	getDefaultConfig({
		// Required API Keys
		alchemyId: process.env.REACT_APP_ALCHEMY_ID, // or infuraId
		walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID,

		// Required
		appName: "RewardRift",

		// Optional
		chains: [ sepolia, polygonMumbai], // default: ["mainnet", "testnet", "devnet", "localhost"]
		appDescription: "Your App Description",
		appUrl: "http://localhost:3000/", // your app's url
		appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
	}),
);

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const pid = router.asPath;
	const scrollRef = useRef({
		scrollPos: 0,
	});
	const wallet = useWallet();

	useEffect(() => {
		// if (pid === '/home/home_8') {
		// 	const html = document.querySelector('html');
		// 	html.classList.remove('light');
		// 	html.classList.add('dark');
		// }
	}, []);

	return (
		<WagmiConfig config={config}>
			<ConnectKitProvider>
				<>
					<Meta title="NFT WORLD" />

					<Provider store={store} wallet={wallet}>
						{/* <ThirdwebProvider network={desiredNetwork} wallet={wallet}> */}
						<ThemeProvider enableSystem={true} attribute="class" >
							<MetaMaskProvider>
								<UserContext.Provider value={{ scrollRef: scrollRef }}>
									{pid === '/login' ? (
										<Component {...pageProps} />
									) : (
										<Layout>
											<Component {...pageProps} />
										</Layout>
									)}
								</UserContext.Provider>
							</MetaMaskProvider>
						</ThemeProvider>
						{/* </ThirdwebProvider> */}
					</Provider>
				</>
				
			</ConnectKitProvider>
		</WagmiConfig>

	);
}

export default MyApp;
