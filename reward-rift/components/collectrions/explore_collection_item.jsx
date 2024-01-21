import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Feature_collections_data from "../../data/Feature_collections_data";
import { BigNumber, ethers } from "ethers";
import SENDER_CONTRACT from "../../abi/contract_address.js";
import SENDER_ABI from "../../abi/sender.json";
import { useAccount } from "wagmi";

const Explore_collection_item = ({ itemFor ,filterText }) => {
  const { sortedCollectionData } = useSelector((state) => state.counter);
  const { address } = useAccount();

  const [itemData, setItemData] = useState([]);

  useEffect(async () => {
    // if (itemFor === 'userPage') {
    const RPCprovider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(SENDER_ABI);
    const sender = new ethers.Contract(
	  SENDER_CONTRACT,
      SENDER_ABI,
      RPCprovider.getSigner(address)
    );
    let val = await sender.listOfInfluencers();
	// console.log(val);
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
	console.log(val)
	// console.log(images)
	setItemData(val);
    console.log(itemData);

    // } else {
    // 	setItemData(sortedCollectionData);
    // }
  }, []);

  return (
    <>
      {itemData.map((item) => {
        const { id,  image, name, desc, account, category, itemsCount, userName } = item;
		console.log(filterText);
		console.log(category);
		if(category == filterText || filterText === 'All')
        {return (
          <article key={id}>
            <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2xl border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
              <Link href={{pathname:`/collection/${id}`, query:{
				  id: id,
				  name: name,
				  account: account,
				  category: category,
				  image: image,
          desc: desc
			  }}}>
                <a className="flex space-x-[0.625rem]">
                  {/* <span className="w-[74.5%]"> */}
                  <img
                    src={image}
                    alt="item 1"
                    className="h-full w-full rounded-[0.625rem] object-cover"
                    loading="lazy"
                  />
                  {/* </span> */}
                  {/* <span className="flex w-1/3 flex-col space-y-[0.625rem]">
										<img
											src={subImage1}
											alt="item 1"
											className="h-full rounded-[0.625rem] object-cover"
											loading="lazy"
										/>
										<img
											src={subImage2}
											alt="item 1"
											className="h-full rounded-[0.625rem] object-cover"
											loading="lazy"
										/>
										<img
											src={subImage3}
											alt="item 1"
											className="h-full rounded-[0.625rem] object-cover"
											loading="lazy"
										/>
									</span> */}
                </a>
              </Link>

			  <Link href={{pathname:`/collection/${id}`, query:{
				id: id,
				  name: name,
				  account: account,
				  category: category,
				  image: image
			  }}}>
                <a className="font-display hover:text-accent dark:hover:text-accent text-jacarta-700 mt-4 block text-base dark:text-white">
                  {name}
                </a>
              </Link>

              <div className="mt-2 flex items-center justify-between text-sm font-medium tracking-tight">
                <div className="flex flex-wrap items-center">
                  <Link href="/user/avatar_6">
                    <a className="mr-2 shrink-0">
                      <img
                        src={image}
                        alt="owner"
                        className="h-5 w-5 rounded-full"
                      />
                    </a>
                  </Link>
                  <span className="dark:text-jacarta-400 mr-1">by</span>
                  <Link href="/user/avatar_6">
                    <a className="text-accent">
                      <span>{userName}</span>
                    </a>
                  </Link>
                </div>
                <span className="dark:text-jacarta-300 text-sm">
                  {itemsCount} Items
                </span>
              </div>
            </div>
          </article>
        );}
      })}
    </>
  );
};

export default Explore_collection_item;
