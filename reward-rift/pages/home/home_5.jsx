import React from "react";
import Collection_category from "../../components/collectrions/collection_category";
import { Feature_collections, HeadLine } from "../../components/component";
import Meta from "../../components/Meta";
import Hero_5 from "../../components/hero/hero_5";
import Process from "../../components/blog/process";
import FilterCategoryItem from "../../components/categories/filterCategoryItem";
import Download from "../../components/blog/download";
import MyComponent from "../../components/mycomponent";
import { Pool, InterestRate } from "@aave/contract-helpers";
import { ethers } from "ethers";
import { web3 } from "@project-serum/anchor";
import { ConnectKitProvider } from "connectkit";
import { useAccount } from "wagmi";


const Home_5 =  () => {
  
  const trial = async()=>{
    console.log(process.env.ALCHEMY_ID);
    const RPCprovider = new ethers.providers.JsonRpcProvider(
      `https://eth-goerli.g.alchemy.com/v2/qxaMbztQO2D3mcHbmLo2NDGLrymAo_PF`
    );
    const pool = new Pool(RPCprovider, {
      POOL: "0x3De59b6901e7Ad0A19621D49C5b52cC9a4977e52", // Goerli GHO market
      WETH_GATEWAY: "0x9c402E3b0D123323F0FCed781b8184Ec7E02Dd31", // Goerli GHO market
    });
    const { address } = useAccount();
  const amount = ethers.utils.parseEther("1");
  console.log(amount);
  const txs = await pool.borrow({
    user: address,
    reserve: "0xcbE9771eD31e761b744D3cB9eF78A1f32DD99211", // Goerli GHO market
    amount: amount,
    interestRateMode: InterestRate.Stable,
    debtTokenAddress: "0x80aa933EfF12213022Fd3d17c2c59C066cBb91c7", // Goerli GHO market
    // onBehalfOf,
    // referralCode,
  });
  console.log(txs[0]);
  const res = await submitTransaction(RPCprovider, txs[0]);
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
   trial();
  return (
    <>
      <Meta title="Home 5 || RewardRift | NFT Marketplace Next.js Template" />

      <Hero_5 />

      <Process />
      <Feature_collections />
      <Collection_category bgWhite={true} />
      <div>
        {/* <!-- Trending Categories --> */}
        <section className="py-24">
          <div className="container">
            <HeadLine
              image="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/26a1.png"
              text="Trending categories"
              classes="mb-8 text-center font-display text-3xl text-jacarta-700 dark:text-white"
            />
            <FilterCategoryItem />
          </div>
        </section>
        {/* <!-- end trending categories --> */}
      </div>
      <Download />
    </>
  );
};

export default Home_5;
