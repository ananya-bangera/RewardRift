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
import { BigNumber , ethers } from "ethers";
import { web3 } from "@project-serum/anchor";
import { ConnectKitProvider } from "connectkit";
import { useAccount } from "wagmi";
import dotenv from 'dotenv';
import  SENDER_ABI  from '../../abi/sender.json'

dotenv.config();

const Home_5 =  () => {
 
  // const trial2  = async()=>{
  //   const abi = [
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "admin",
  //           "type": "address"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "constructor"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "AccessControlBadConfirmation",
  //       "type": "error"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "account",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "bytes32",
  //           "name": "neededRole",
  //           "type": "bytes32"
  //         }
  //       ],
  //       "name": "AccessControlUnauthorizedAccount",
  //       "type": "error"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "owner",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "spender",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": false,
  //           "internalType": "uint256",
  //           "name": "value",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "Approval",
  //       "type": "event"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "facilitatorAddress",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "bytes32",
  //           "name": "label",
  //           "type": "bytes32"
  //         },
  //         {
  //           "indexed": false,
  //           "internalType": "uint256",
  //           "name": "bucketCapacity",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "FacilitatorAdded",
  //       "type": "event"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "facilitatorAddress",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": false,
  //           "internalType": "uint256",
  //           "name": "oldCapacity",
  //           "type": "uint256"
  //         },
  //         {
  //           "indexed": false,
  //           "internalType": "uint256",
  //           "name": "newCapacity",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "FacilitatorBucketCapacityUpdated",
  //       "type": "event"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "facilitatorAddress",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": false,
  //           "internalType": "uint256",
  //           "name": "oldLevel",
  //           "type": "uint256"
  //         },
  //         {
  //           "indexed": false,
  //           "internalType": "uint256",
  //           "name": "newLevel",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "FacilitatorBucketLevelUpdated",
  //       "type": "event"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "facilitatorAddress",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "FacilitatorRemoved",
  //       "type": "event"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "bytes32",
  //           "name": "role",
  //           "type": "bytes32"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "bytes32",
  //           "name": "previousAdminRole",
  //           "type": "bytes32"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "bytes32",
  //           "name": "newAdminRole",
  //           "type": "bytes32"
  //         }
  //       ],
  //       "name": "RoleAdminChanged",
  //       "type": "event"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "bytes32",
  //           "name": "role",
  //           "type": "bytes32"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "account",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "sender",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "RoleGranted",
  //       "type": "event"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "bytes32",
  //           "name": "role",
  //           "type": "bytes32"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "account",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "sender",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "RoleRevoked",
  //       "type": "event"
  //     },
  //     {
  //       "anonymous": false,
  //       "inputs": [
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "from",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": true,
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "indexed": false,
  //           "internalType": "uint256",
  //           "name": "value",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "Transfer",
  //       "type": "event"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "BUCKET_MANAGER_ROLE",
  //       "outputs": [
  //         {
  //           "internalType": "bytes32",
  //           "name": "",
  //           "type": "bytes32"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "DEFAULT_ADMIN_ROLE",
  //       "outputs": [
  //         {
  //           "internalType": "bytes32",
  //           "name": "",
  //           "type": "bytes32"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "DOMAIN_SEPARATOR",
  //       "outputs": [
  //         {
  //           "internalType": "bytes32",
  //           "name": "",
  //           "type": "bytes32"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "FACILITATOR_MANAGER_ROLE",
  //       "outputs": [
  //         {
  //           "internalType": "bytes32",
  //           "name": "",
  //           "type": "bytes32"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "PERMIT_TYPEHASH",
  //       "outputs": [
  //         {
  //           "internalType": "bytes32",
  //           "name": "",
  //           "type": "bytes32"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "facilitatorAddress",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "string",
  //           "name": "facilitatorLabel",
  //           "type": "string"
  //         },
  //         {
  //           "internalType": "uint128",
  //           "name": "bucketCapacity",
  //           "type": "uint128"
  //         }
  //       ],
  //       "name": "addFacilitator",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "allowance",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "spender",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "amount",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "approve",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "balanceOf",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "amount",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "burn",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "decimals",
  //       "outputs": [
  //         {
  //           "internalType": "uint8",
  //           "name": "",
  //           "type": "uint8"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "facilitator",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "getFacilitator",
  //       "outputs": [
  //         {
  //           "components": [
  //             {
  //               "internalType": "uint128",
  //               "name": "bucketCapacity",
  //               "type": "uint128"
  //             },
  //             {
  //               "internalType": "uint128",
  //               "name": "bucketLevel",
  //               "type": "uint128"
  //             },
  //             {
  //               "internalType": "string",
  //               "name": "label",
  //               "type": "string"
  //             }
  //           ],
  //           "internalType": "struct IGhoToken.Facilitator",
  //           "name": "",
  //           "type": "tuple"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "facilitator",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "getFacilitatorBucket",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "getFacilitatorsList",
  //       "outputs": [
  //         {
  //           "internalType": "address[]",
  //           "name": "",
  //           "type": "address[]"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes32",
  //           "name": "role",
  //           "type": "bytes32"
  //         }
  //       ],
  //       "name": "getRoleAdmin",
  //       "outputs": [
  //         {
  //           "internalType": "bytes32",
  //           "name": "",
  //           "type": "bytes32"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes32",
  //           "name": "role",
  //           "type": "bytes32"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "account",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "grantRole",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes32",
  //           "name": "role",
  //           "type": "bytes32"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "account",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "hasRole",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "account",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "amount",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "mint",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "name",
  //       "outputs": [
  //         {
  //           "internalType": "string",
  //           "name": "",
  //           "type": "string"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "nonces",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "owner",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "spender",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "value",
  //           "type": "uint256"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "deadline",
  //           "type": "uint256"
  //         },
  //         {
  //           "internalType": "uint8",
  //           "name": "v",
  //           "type": "uint8"
  //         },
  //         {
  //           "internalType": "bytes32",
  //           "name": "r",
  //           "type": "bytes32"
  //         },
  //         {
  //           "internalType": "bytes32",
  //           "name": "s",
  //           "type": "bytes32"
  //         }
  //       ],
  //       "name": "permit",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "facilitatorAddress",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "removeFacilitator",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes32",
  //           "name": "role",
  //           "type": "bytes32"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "callerConfirmation",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "renounceRole",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes32",
  //           "name": "role",
  //           "type": "bytes32"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "account",
  //           "type": "address"
  //         }
  //       ],
  //       "name": "revokeRole",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "facilitator",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint128",
  //           "name": "newCapacity",
  //           "type": "uint128"
  //         }
  //       ],
  //       "name": "setFacilitatorBucketCapacity",
  //       "outputs": [],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "bytes4",
  //           "name": "interfaceId",
  //           "type": "bytes4"
  //         }
  //       ],
  //       "name": "supportsInterface",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "symbol",
  //       "outputs": [
  //         {
  //           "internalType": "string",
  //           "name": "",
  //           "type": "string"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [],
  //       "name": "totalSupply",
  //       "outputs": [
  //         {
  //           "internalType": "uint256",
  //           "name": "",
  //           "type": "uint256"
  //         }
  //       ],
  //       "stateMutability": "view",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "amount",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "transfer",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     },
  //     {
  //       "inputs": [
  //         {
  //           "internalType": "address",
  //           "name": "from",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "address",
  //           "name": "to",
  //           "type": "address"
  //         },
  //         {
  //           "internalType": "uint256",
  //           "name": "amount",
  //           "type": "uint256"
  //         }
  //       ],
  //       "name": "transferFrom",
  //       "outputs": [
  //         {
  //           "internalType": "bool",
  //           "name": "",
  //           "type": "bool"
  //         }
  //       ],
  //       "stateMutability": "nonpayable",
  //       "type": "function"
  //     }
  //   ];
 
  //   const RPCprovider = new ethers.providers.Web3Provider(window.ethereum);
  //   const gho = new ethers.Contract("0xc4bF5CbDaBE595361438F8c6a187bDc330539c60" ,abi, RPCprovider.getSigner(address));
  //   const tx = await gho.balanceOf("0x92058390beC077c43a0ea2717244B2c1F3CdbdaF");
  //   console.log(SENDER_ABI);
  //   console.log(BigNumber.from(tx).toBigInt());
  //   const sender = new ethers.Contract("0x418a6bb0291d0eD91F3F84647EBBC57466F715E2" ,SENDER_ABI, RPCprovider.getSigner(address));
    
  //   // const tx = await gho.transfer("0x4A9CF09B996F0Ddf5498201f1D6cb8f6C88e3e0e", BigNumber.from("10000000000000000000"));
  //   const tx2 = await sender.sendVoteData("0xCc673eE49Eb916b33919294D39F0518FdC0DaF0f");
  //   const val = await tx2.wait();
  //   // const value = val.events.pop();
  //   // console.log(val.events[0]);
  //   // console.log(val);
  //   // console.log(BigNumber.from(tx).toBigInt());
  // }
 

  //  trial();
  return (
    <>
      <Meta title="Home || RewardRift | NFT Marketplace Next.js Template" />

      <Hero_5 />
      {/* <button
							onClick={() => trial2()}
							className="js-video-modal-trigger absolute top-1/2 left-1/2 flex h-24 w-24 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white transition-transform will-change-transform hover:scale-90"
						>Hello</button> */}

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
            {/* <FilterCategoryItem /> */}
          </div>
        </section>
        {/* <!-- end trending categories --> */}
      </div>
      <Download />
    </>
  );
};

export default Home_5;
