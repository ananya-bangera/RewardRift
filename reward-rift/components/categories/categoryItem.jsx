import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Likes from "../likes";
import Auctions_dropdown from "../dropdown/Auctions_dropdown";
import { useDispatch, useSelector } from "react-redux";
import { buyModalShow } from "../../redux/counterSlice";
import { BigNumber, ethers } from "ethers";
import SENDER_CONTRACT from "../../abi/contract_address.js";
import SENDER_ABI from "../../abi/sender.json";
import { useAccount } from "wagmi";
import { trendingCategoryData } from "../../data/categories_data.js";
import { set } from "@project-serum/anchor/dist/cjs/utils/features.js";

const CategoryItem = ({influencerData}) => {
  const { sortedtrendingCategoryItemData } = useSelector(
    (state) => state.counter
  );
  const [ categories, setCategories ] = useState([]);
  const dispatch = useDispatch();
  const { address } = useAccount();
  console.log(influencerData);

  useEffect(async () => {
    // if (itemFor === 'userPage') {
   
    const RPCprovider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(SENDER_ABI);
    const sender = new ethers.Contract(
      SENDER_CONTRACT,
      SENDER_ABI,
      RPCprovider.getSigner(address)
    );
	
    // console.log(influencerData.account);
    let  value = await sender.listOfCreatedContents("0x4A9CF09B996F0Ddf5498201f1D6cb8f6C88e3e0e");
    console.log(value.length);
    setCategories(value);
    categories.map((item) => {
      const {
        id,
        image,
        name,
        cid
      } = item;
      console.log(BigNumber.from(id).toNumber());
      console.log(image);
      console.log(name);
      console.log(cid);
    });
    
  }, []);

  return (
    <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
      {categories.map((item) => {
        let {
          id,
          image,
          name,
          cid
        } = item;
        // id = BigNumber.from(id).toNumber();

        // image = 'https://ipfs.io/ipfs/QmXaGYymY9rBdNzHKdhsEjmx8YfiN56jS16jSEBudHk6xx'
        // const itemLink = image
        //   .split("/")
        //   .slice(-1)
        //   .toString()
        //   .replace(".jpg", "")
        //   .replace(".gif", "");
        return (
          <article key={id}>
            <div className="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 rounded-2.5xl block border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
              <figure className="relative">
                {/* <Link href={`/item/${itemLink}`}> */}
                  <a>
                    <img
                      // src={image}
                      src={`https://ipfs.io/ipfs/${image}`}
                      alt="item 5"
                      className="w-full h-[230px] rounded-[0.625rem] object-cover"
                    />
                  </a>
                {/* </Link> */}

               

                {/* <div className="absolute left-3 -bottom-3">
                  <div className="flex -space-x-2">
                    <Link href={`/item/${itemLink}`}>
                      <a>
                        <Tippy content={<span>creator: {creator.name}</span>}>
                          <img
                            src={creator.image}
                            alt="creator"
                            className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                          />
                        </Tippy>
                      </a>
                    </Link>
                    <Link href={`/item/${itemLink}`}>
                      <a>
                        <Tippy content={<span>creator: {owner.name}</span>}>
                          <img
                            src={owner.image}
                            alt="owner"
                            layout="fill"
                            className="dark:border-jacarta-600 hover:border-accent dark:hover:border-accent h-6 w-6 rounded-full border-2 border-white"
                          />
                        </Tippy>
                      </a>
                    </Link>
                  </div>
                </div> */}
              </figure>
              <div className="mt-7 flex items-center justify-between">
                <Link href={{pathname:`/item/${id}`, query:{account: influencerData.account, cid:cid,id:id, image: image, ownerImage: influencerData.image , name: name, creatorname: influencerData.name, text : influencerData.desc}}}>
                  <a>
                    <span className="font-display text-jacarta-700 hover:text-accent text-base dark:text-white">
                      {name}
                    </span>
                  </a>
                </Link>

                {/* auction dropdown  */}
                <Auctions_dropdown classes="dark:hover:bg-jacarta-600 dropup hover:bg-jacarta-100 rounded-full" />
              </div>
              {/* <div className="mt-2 text-sm">
                <span className="dark:text-jacarta-200 text-jacarta-700 mr-1">
                  {price}
                </span>
                <span className="dark:text-jacarta-300 text-jacarta-500">
                  {bidCount}/{bidLimit}
                </span>
              </div> */}

              <div className="mt-8 flex items-center justify-between">
                <button
                  className="text-accent font-display text-sm font-semibold"
                  onClick={() => dispatch(buyModalShow())}
                >
                  Vote Content Now
                </button>
                {/* <Link href={`/item/${itemLink}`}>
                  <a className="group flex items-center">
                    <svg className="icon icon-history group-hover:fill-accent dark:fill-jacarta-200 fill-jacarta-500 mr-1 mb-[3px] h-4 w-4">
                      <use xlinkHref="/icons.svg#icon-history"></use>
                    </svg>
                    <span className="group-hover:text-accent font-display dark:text-jacarta-200 text-sm font-semibold">
                      View History
                    </span>
                  </a>
                </Link> */}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default CategoryItem;
