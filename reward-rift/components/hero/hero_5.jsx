import Link from 'next/link';
import React from 'react';
import { hero_5_data } from '../../data/coverflow_data';
import MyComponent from '../mycomponent';
import { ConnectKitButton } from 'connectkit';
import { Pool, InterestRate } from "@aave/contract-helpers";
import { BigNumber , ethers } from "ethers";
import { web3 } from "@project-serum/anchor";
import { ConnectKitProvider } from "connectkit";
import { useAccount } from "wagmi";
import dotenv from 'dotenv';
import  SENDER_ABI  from '../../abi/sender.json'
import  SENDER_CONTRACT  from '../../abi/contract_address.js'
const Hero_5 = () => {
	const { address } = useAccount();
	const borrowTokens = async()=>{
		
		const RPCprovider = new ethers.providers.Web3Provider(window.ethereum)
	
		const pool = new Pool(RPCprovider, {
		  POOL: "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951", // Goerli GHO market
		  WETH_GATEWAY: "0x387d311e47e80b498169e6fb51d3193167d89F7D", // Goerli GHO market
		});
	   
	  
	 
	  const txs = await pool.borrow({
		user: address,
		reserve: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60", // GHOToken
		amount: "20",
		interestRateMode: InterestRate.Variable,
		// debtTokenAddress: "0x54bdE009156053108E73E2401aEA755e38f92098", // Goerli GHO market
		// onBehalfOf: "0xCc673eE49Eb916b33919294D39F0518FdC0DaF0f",
		// referralCode,
	  });
	  // const txs = await pool.borrow({
	  //   user: address,
	  //   reserve: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60", // GHOToken
	  //   amount: "20",
	  //   interestRateMode: InterestRate.Variable
	  //   // debtTokenAddress: "0x54bdE009156053108E73E2401aEA755e38f92098", // Goerli GHO market
	  //   // onBehalfOf,
	  //   // referralCode,
	  // });
	  console.log(txs[0]);
	  const res = await submitTransaction(RPCprovider, txs[0]);
	  console.log(res);
	  }
	const submitTransaction = async(
		provider,transaction
	  )=> {
	   
		  const extendedTxData = await transaction.tx();
		  console.log(extendedTxData)
		  const { from, ...txData } = extendedTxData;
		  const signer = provider.getSigner(from);
		  console.log(txData);
		  console.log(from);
		  const txResponse = await signer.sendTransaction({
			...txData,
			value: txData.value ? BigNumber.from(txData.value).toString() : undefined,
		  });
		  return txResponse;
		}
	return (
		<>
			{/* <!-- Hero --> */}
			
			<section className="relative py-20 md:pt-32">
				<picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
					<img src="/images/gradient.jpg" alt="gradient" className="h-full" />
				</picture>
				<picture className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
					<img src="/images/gradient_dark.jpg" alt="gradient dark" className="h-full" />
				</picture>

				{/* <div className="h-full px-6 xl:px-20"> */}
					{/* <div className="grid h-full items-center gap-4 lg:grid-cols-12"> */}
						<div className="col-span-6 flex h-full flex-col items-center justify-center py-10 md:items-start md:py-20 xl:col-span-5 xl:pl-[20%] xl:pr-[10%]">
							<div className="mb-10 w-full sm:flex sm:space-x-4">
								<div className="mb-4 flex-1 rounded-2lg bg-white p-4 text-center dark:bg-white/[.15]">
									<span className="block font-display text-3xl text-[#8DD059]">10,568</span>
									<span className="block font-display text-sm text-jacarta-500 dark:text-white">
										Influencer
									</span>
								</div>
								<div className="mb-4 flex-1 rounded-2lg bg-white p-4 text-center dark:bg-white/[.15]">
									<span className="block font-display text-3xl text-[#737EF2]">1,200</span>
									<span className="block font-display text-sm text-jacarta-500 dark:text-white">
										Voting Pools
									</span>
								</div>
								<div className="mb-4 flex-1 rounded-2lg bg-white p-4 text-center dark:bg-white/[.15]">
									<span className="block font-display text-3xl text-[#F35BC7]">6,897</span>
									<span className="block font-display text-sm text-jacarta-500 dark:text-white">
										Viewers
									</span>
								</div>
							</div>
							<h1 className="mb-6 text-center font-display text-5xl text-jacarta-700 dark:text-white md:text-left lg:text-5xl xl:text-6xl">
								Create, Fund and Profit from Your Fav Influencers
							</h1>
							
							<p className="mb-8 text-center text-lg dark:text-jacarta-200 md:text-left">
							Sculpting the Future: Unleash Your Influence with RewardRift - Where Fans and Influencers Thrive Together!
							</p>
							<div className="flex space-x-4">
							
								{/* <Link href="/create"> */}
									<button onClick={()=>borrowTokens()} className="w-36 rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark">
										Borrow
									</button>
								{/* </Link> */}
								<Link href="https://gho.aave.com/">
									<a className="w-36 rounded-full bg-white py-3 px-8 text-center font-semibold text-accent shadow-white-volume transition-all hover:bg-accent-dark hover:text-white hover:shadow-accent-volume">
										Supply
									</a>
								</Link>
							{/* </div> */}
						{/* </div> */}

						{/* <!-- Hero images --> */}
						{/* <div className="relative col-span-6 xl:col-span-6 xl:col-start-7">
							<img
								src="/images/hero/badge.png"
								className="absolute top-0 z-10 -ml-16 animate-spin-slow md:top-[12%]"
								alt=""
							/> */}
							{/* <div className="md:flex md:space-x-6 xl:space-x-12">
								{hero_5_data.map((item, index) => {
									const { id, img, title, authorImage, authorName, subItem } = item;
									const itemLink = img
										.split('/')
										.slice(-1)
										.toString()
										.replace('_2lg.jpg', '')
										.replace('.gif', '');
									return (
										<div
											className={
												index === 0
													? 'mb-6 md:flex md:w-1/2 md:items-center'
													: 'space-y-6 md:w-1/2 xl:space-y-12'
											}
											key={id}
										>
											<article>
												<div className="block overflow-hidden rounded-2.5xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700">
													<figure className="relative">
														<Link href={`/item/${itemLink}`}>
															<a>
																<img
																	src={img}
																	alt="item 1"
																	className="w-full object-cover"
																	height="437"
																	width="406"
																/>
															</a>
														</Link>
													</figure>
													<div className="p-6">
														<div className="flex">
															<Link href="/user/avatar_6">
																<a className="shrink-0">
																	<img
																		src={authorImage}
																		alt="avatar"
																		className="mr-4 h-10 w-10 rounded-full"
																	/>
																</a>
															</Link>
															<div>
																<Link href={`/item/${itemLink}`}>
																	<a className="block">
																		<span className="font-display text-lg leading-none text-jacarta-700 hover:text-accent dark:text-white">
																			{title}
																		</span>
																	</a>
																</Link>
																<Link href="/user/avatar_6">
																	<a className="text-2xs text-accent">{authorName}</a>
																</Link>
															</div>
														</div>
													</div>
												</div>
											</article>

											{subItem &&
												subItem.map(({ id, img, title, authorImage, authorName }) => {
													const itemLink = img
														.split('/')
														.slice(-1)
														.toString()
														.replace('.jpg', '')
														.replace('.gif', '')
														.replace('_lg', '');
													return (
														<div className="md:w-3/4" key={id}>
															<article>
																<div className="block overflow-hidden rounded-2.5xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-jacarta-700">
																	<figure className="relative">
																		<Link href={`/item/${itemLink}`}>
																			<a>
																				<img
																					src={img}
																					alt="item 1"
																					className="w-full object-cover"
																					height="437"
																					width="406"
																				/>
																			</a>
																		</Link>
																	</figure>
																	<div className="p-6">
																		<div className="flex">
																			<Link href="/user/avatar_6">
																				<a className="shrink-0">
																					<img
																						src={authorImage}
																						alt="avatar"
																						className="mr-4 h-10 w-10 rounded-full"
																					/>
																				</a>
																			</Link>
																			<div>
																				<Link href={`/item/${itemLink}`}>
																					<a className="block">
																						<span className="font-display text-lg leading-none text-jacarta-700 hover:text-accent dark:text-white">
																							{title}
																						</span>
																					</a>
																				</Link>
																				<Link href="/user/avatar_6">
																					<a className="text-2xs text-accent">{authorName}</a>
																				</Link>
																			</div>
																		</div>
																	</div>
																</div>
															</article>
														</div>
													);
												})}
										</div>
									);
								})}
							</div> */}
						{/* </div> */}
					</div>
				</div>
			</section>
			{/* <!-- end hero --> */}
		</>
	);
};

export default Hero_5;
