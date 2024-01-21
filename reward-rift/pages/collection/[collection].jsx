import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection_item_data } from "../../data/collection_data";
import Auctions_dropdown from "../../components/dropdown/Auctions_dropdown";
import Social_dropdown from "../../components/dropdown/Social_dropdown";
import Collection_items from "../../components/collectrions/Collection_items";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Meta from "../../components/Meta";
import { BigNumber, ethers } from "ethers";
import SENDER_CONTRACT from "../../abi/contract_address.js";
import SENDER_ABI from "../../abi/sender.json";
import GHO_TOKEN from "../../abi/gho_address.js";
import GHO_ABI from "../../abi/gho.json";
import RECEIVER_ABI from "../../abi/receiver.json"
import  RECEIVER_CONTRACT from "../../abi/receiver_contract.js";
import { useAccount } from "wagmi";

const Collection = () => {
  const { address } = useAccount();

  const [likesImage, setLikesImage] = useState(false);
  let categories = [];

  const router = useRouter();
  const pid = router.query.collection;
  // const pid = router.query.collection;

  // console.log(infl)
  //   console.log(pid);
  //   console.log(router.query);
  let influencerData = router.query;
  console.log(influencerData);
  const handleLikes = () => {
    if (!likesImage) {
      setLikesImage(true);
    } else {
      setLikesImage(false);
    }
  };
  const voteInfluencer = async () => { 
    const RPCprovider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(SENDER_ABI);
    const sender = new ethers.Contract(
      SENDER_CONTRACT,
      SENDER_ABI,
      RPCprovider.getSigner(address)
    );
    console.log(influencerData.account);
    const gho_tok = "10000000000000000000";
    const gho = new ethers.Contract(GHO_TOKEN ,GHO_ABI, RPCprovider.getSigner(address));

    const tx = await gho.transfer(SENDER_CONTRACT, BigNumber.from(gho_tok));
    await tx.wait();

      console.log(tx);
    const tx2 = await sender.voteForInfluencer(BigNumber.from(gho_tok), influencerData.account);
    await tx2.wait();
    console.log(tx2);
   }
  let loggedDet ;
   const stopFunding = async () => {
    const RPCprovider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(SENDER_ABI);
    const sender = new ethers.Contract(
      SENDER_CONTRACT,
      SENDER_ABI,
      RPCprovider.getSigner(address)
    );
    console.log(influencerData.account);
    const tx = await sender.sendVoteData(influencerData.account);
    // console.log(BigNumber.from(tx[0].tokens).toNumber());
    let votersInfo = [];
    tx.forEach(element => {
      votersInfo.push({
        address: element.voter,
        tokens: BigNumber.from(element.tokens).toString()
      })
    });
    const loggMsg = JSON.stringify({votersInfo:votersInfo, account: influencerData.account});
    console.log(loggMsg); 
    loggedDet = loggMsg;
    const tx2 = await sender.withdrawTokens(GHO_TOKEN, BigNumber.from("12532609583862916517").toBigInt(),RECEIVER_CONTRACT,loggMsg);
    await tx2.wait();
    
   }
   const test = async () => {
    const RPCprovider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(SENDER_ABI);
    const sender = new ethers.Contract(
      SENDER_CONTRACT,
      SENDER_ABI,
      RPCprovider.getSigner(address)
    );
    console.log(influencerData.account);
    const tx = await sender.sendVoteData(influencerData.account);
    // console.log(BigNumber.from(tx[0].tokens).toNumber());
    let votersInfo = [];
    tx.forEach(element => {
      votersInfo.push({
        address: element.voter,
        tokens: BigNumber.from(element.tokens).toString()
      })
    });
    const loggMsg = JSON.stringify({votersInfo:votersInfo, account: influencerData.account});
    console.log(loggMsg);
    loggedDet = loggMsg;
   }

   const distributeFunds = async () => {
    // const RPCprovider = new ethers.providers.Web3Provider(window.ethereum);
    // console.log(SENDER_ABI);
    // const receiver = new ethers.Contract(
    //   RECEIVER_CONTRACT,
    //   RECEIVER_ABI,
    //   RPCprovider.getSigner(address)
    // );
    // const loggedDet = await receiver.getLastReceivedMessageDetails();
    // console.log(loggedDet);
    test();



   }

  useEffect(async () => {
    // if (itemFor === 'userPage') {
    console.log(pid);
    const RPCprovider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(SENDER_ABI);
    const sender = new ethers.Contract(
      SENDER_CONTRACT,
      SENDER_ABI,
      RPCprovider.getSigner(address)
    );
    console.log(influencerData.account);

    categories = await sender.listOfCreatedContents(
      "0x4A9CF09B996F0Ddf5498201f1D6cb8f6C88e3e0e"
    );
    console.log(categories);
    // let images = []
    // val.forEach(async(element) => {
    // 	const id = BigNumber.from(element.id.toString()).toBigInt();
    // 	const resImg = await fetch(
    // 	  `https://bafybeihpjhkeuiq3k6nqa3fkgeigeri7iebtrsuyuey5y6vy36n345xmbi.ipfs.w3s.link/${id}`
    // 	);
    // 	const img = await resImg.json();
    // 	images.push({

    // 		bigImage: `https://w3s.link/ipfs/${img.image}`,
    // 		userImage: `https://w3s.link/ipfs/${img.image}`,
    // 	});

    //   });
    // console.log(influencerData.image);
    // console.log(images)
    // console.log(createdContent)

    // console.log(createdContent);

    // } else {
    // 	setItemData(sortedCollectionData);
    // }
  }, []);

  return (
    <>
      <Meta
        title={`Influencer - ${pid} || RewardRift | NFT Marketplace Next.js Template`}
      />
     
        <div className="pt-[5.5rem] lg:pt-24">
          {/* <!-- Banner --> */}
          <div className="relative h-[300px]">
            <img
              src={`${influencerData.image}`}
              // src ="/images/gradient_light.jpg"
              className="relative h-[300px] w-full"
              alt="banner"
              layout="fill"
              objectFit="cover"
            />
          </div>
          {/* <!-- end banner --> */}
          <div className="mb-8 flex items-center space-x-4 whitespace-nowrap">
          <div className="flex items-center m-8">
            <h1 className="font-display text-jacarta-700 mb-4 text-4xl font-semibold dark:text-white">
              {influencerData.name}
            </h1>
            <p className="dark:text-jacarta-300 mb-10">{influencerData.desc}</p>

            <div className="dark:border-jacarta-600 sm:border-jacarta-100 mt-4 sm:mt-0 sm:w-1/2 sm:border-l sm:pl-4 lg:pl-8">
              <button
                className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-[1/2] rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                onClick={() => voteInfluencer()}
              >
                Fund Influencer
              </button>
              {(influencerData.account === address)?(<><button
                className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-[1/2] rounded-full py-3 px-8 text-center font-semibold m-4 text-white transition-all"
                onClick={() => stopFunding()}
              >
                Withdraw Tokens 
              </button></>):(<></>)}
              {(influencerData.account === address)?(<><button
                className="bg-accent shadow-accent-volume hover:bg-accent-dark inline-block w-[1/2] rounded-full py-3 px-8 text-center font-semibold m-4 text-white transition-all"
                onClick={() => distributeFunds()}
              >
                Distribute Tokens Funded
              </button></>):(<></>)}
            </div>
          </div>
        </div>
        {/* <!-- Profile --> */}
        {collection_item_data
          .filter((item) => item.id === pid)
          .map((item) => {
            const { id, title, image, icon, creator, text, details } = item;

            return (
              <section
                key={id}
                className="dark:bg-jacarta-800 bg-light-base relative pb-12 pt-28"
              >
                {/* <!-- Avatar --> */}
                <div className="absolute left-1/2 top-0 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <figure className="relative h-40 w-40 dark:border-jacarta-600 rounded-xl border-[5px] border-white">
                    <Image
                      src={image}
                      alt={title}
                      layout="fill"
                      objectFit="contain"
                      className="dark:border-jacarta-600 rounded-xl border-[5px] border-white"
                    />
                    <div
                      className="dark:border-jacarta-600 bg-green absolute -right-3 bottom-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white"
                      data-tippy-content="Verified Collection"
                    >
                      {icon && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          className="h-[.875rem] w-[.875rem] fill-white"
                        >
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"></path>
                        </svg>
                      )}
                    </div>
                  </figure>
                </div>

                <div className="container">
                  <div className="text-center">
                    <h2 className="font-display text-jacarta-700 mb-2 text-4xl font-medium dark:text-white">
                      {title}
                    </h2>
                    <div className="mb-8">
                      <span className="text-jacarta-400 text-sm font-bold">
                        Created by{" "}
                      </span>
                      <Link href="/user/avatar_6">
                        <a className="text-accent text-sm font-bold">
                          {creator}
                        </a>
                      </Link>
                    </div>

                    <div className="dark:bg-jacarta-800 dark:border-jacarta-600 border-jacarta-100 mb-8 inline-flex flex-wrap items-center justify-center rounded-xl border bg-white">
                      {details.map(({ id, detailsNumber, detailsText }) => {
                        return (
                          <Link href="#" key={id}>
                            <a className="dark:border-jacarta-600 border-jacarta-100 w-1/2 rounded-l-xl border-r py-4 hover:shadow-md sm:w-32">
                              <div className="text-jacarta-700 mb-1 text-base font-bold dark:text-white">
                                {detailsNumber}
                              </div>
                              <div className="text-2xs dark:text-jacarta-400 font-medium tracking-tight">
                                {detailsText}
                              </div>
                            </a>
                          </Link>
                        );
                      })}
                    </div>

                    <p className="dark:text-jacarta-300 mx-auto max-w-xl text-lg">
                      {text}
                    </p>

                    <div className="mt-6 flex items-center justify-center space-x-2.5 relative">
                      <div className="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white">
                        {/* <Likes data={} /> */}
                        <div
                          className="js-likes relative inline-flex h-10 w-10 cursor-pointer items-center justify-center text-sm"
                          onClick={() => handleLikes()}
                        >
                          <button>
                            {likesImage ? (
                              <svg className="icon dark:fill-jacarta-200 fill-jacarta-500 h-4 w-4">
                                <use xlinkHref="/icons.svg#icon-heart-fill"></use>
                              </svg>
                            ) : (
                              <svg className="icon dark:fill-jacarta-200 fill-jacarta-500 h-4 w-4">
                                <use xlinkHref="/icons.svg#icon-heart"></use>
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      <Social_dropdown />

                      <Auctions_dropdown classes="dark:border-jacarta-600 dark:hover:bg-jacarta-600 border-jacarta-100 dropdown hover:bg-jacarta-100 dark:bg-jacarta-700 rounded-xl border bg-white relative" />
                    </div>
                  </div>
                </div>
              </section>
            );
          })}

        {/* <!-- end profile --> */}
      </div>
      <Collection_items influencerData={influencerData} />
    </>
  );
};

export default Collection;
