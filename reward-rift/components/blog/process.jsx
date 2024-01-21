import React from 'react';

const Process = () => {
	return (
		<>
			{/* <!-- Process --> */}
			<section className="relative py-24 dark:bg-jacarta-800">
				<picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
					<img src="/images/gradient_light.jpg" alt="gradient" className="h-full w-full" />
				</picture>
				<div className="container">
					<h2 className="mb-10 text-center font-display text-3xl text-jacarta-700 dark:text-white">
						About the Platform
					</h2>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						
						<div className="relative rounded-2.5xl border border-jacarta-100 bg-white p-10 shadow-[0_5px_0_0_#10b981] transition-shadow hover:shadow-[0_16px_24px_-8px_rgba(16,185,129,.3)] dark:border-jacarta-700 dark:bg-jacarta-700">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
								className="absolute right-3 top-3 h-16 w-16 fill-jacarta-50 dark:fill-jacarta-600"
							>
								<path fill="none" d="M0 0h24v24H0z" />
								<path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
							</svg>
							<div className="mb-6 inline-flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24"
									height="24"
									className="h-12 w-12 fill-green"
								>
									<path fill="none" d="M0 0h24v24H0z" />
									<path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
								</svg>
							</div>
							<h3 className="mb-4 font-display text-lg text-jacarta-700 dark:text-white">
							Creation and Support
							</h3>
							<p className="dark:text-jacarta-300">
							Influencers create profiles, and fans contribute GHO Tokens to support their favorite creators, fueling content creation and enhancements.
							</p>
						</div>
						<div className="relative rounded-2.5xl border border-jacarta-100 bg-white p-10 shadow-[0_5px_0_0_#ef4444] transition-shadow hover:shadow-[0_16px_24px_-8px_rgba(239,68,68,.3)] dark:border-jacarta-700 dark:bg-jacarta-700">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
								className="absolute right-3 top-3 h-16 w-16 fill-jacarta-50 dark:fill-jacarta-600"
							>
								<path fill="none" d="M0 0h24v24H0z" />
								<path d="M10.9 2.1l9.899 1.415 1.414 9.9-9.192 9.192a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414L10.9 2.1zm2.828 8.486a2 2 0 1 0 2.828-2.829 2 2 0 0 0-2.828 2.829z" />
							</svg>
							<div className="mb-6 inline-flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24"
									height="24"
									className="h-12 w-12 fill-red"
								>
									<path fill="none" d="M0 0h24v24H0z" />
									<path d="M10.9 2.1l9.899 1.415 1.414 9.9-9.192 9.192a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 0-1.414L10.9 2.1zm2.828 8.486a2 2 0 1 0 2.828-2.829 2 2 0 0 0-2.828 2.829z" />
								</svg>
							</div>
							<h3 className="mb-4 font-display text-lg text-jacarta-700 dark:text-white">
							Profit Distribution and Engagement
							</h3>
							<p className="dark:text-jacarta-300">
							Influencers share profits back to supporters through token aggregation, while live content screening and interactive features like ticket purchases and emoji sharing incentivize viewer engagement.
							</p>
						</div>
						<div className="relative rounded-2.5xl border border-jacarta-100 bg-white p-10 shadow-[0_5px_0_0_#8358ff] transition-shadow hover:shadow-[0_16px_24px_-8px_rgba(131,88,255,.3)] dark:border-jacarta-700 dark:bg-jacarta-700">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
								className="absolute right-3 top-3 h-16 w-16 fill-jacarta-50 dark:fill-jacarta-600"
							>
								<path fill="none" d="M0 0h24v24H0z" />
								<path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z" />
							</svg>
							<div className="mb-6 inline-flex items-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="24"
									height="24"
									className="h-12 w-12 fill-accent"
								>
									<path fill="none" d="M0 0h24v24H0z" />
									<path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z" />
								</svg>
							</div>
							<h3 className="mb-4 font-display text-lg text-jacarta-700 dark:text-white">
							Inclusivity and Collaboration
							</h3>
							<p className="dark:text-jacarta-300">
							The platform fosters a transparent and direct connection between influencers and fans, ensuring fair rewards distribution based on engagement, empowering fans through community voting, and enabling collaboration among influencers for unique content creation.
							</p>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- end process --> */}
		</>
	);
};

export default Process;
