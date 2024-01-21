// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";
import { GhoToken } from "https://github.com/aave/gho-core/blob/main/src/contracts/gho/GhoToken.sol";
/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/// @title - A simple contract for sending string data across chains.
contract Sender is OwnerIsCreator {
    // Custom errors to provide more descriptive revert messages.
    error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees); // Used to make sure contract has enough balance.

    // Event emitted when a message is sent to another chain.
    event MessageSent(
        bytes32 indexed messageId, // The unique ID of the CCIP message.
        uint64 indexed destinationChainSelector, // The chain selector of the destination chain.
        address receiver, // The address of the receiver on the destination chain.
        string text, // The text being sent.
        address feeToken, // the token address used to pay CCIP fees.
        uint256 fees // The fees paid for sending the CCIP message.
    );

    IRouterClient private s_router;

    LinkTokenInterface private s_linkToken;
    struct InfluencerProfile{
        uint256 id;
        string name;
        string image;
        string category;
        string desc;
        address account;
        bool askVotes;
    }
    struct WebContent {
        uint256 id;
        string name;
        string cid;
        string image;
        uint256 author;
    }
    struct Votes{
        address voter;
        uint256 tokens;
    }
    mapping(uint256 => InfluencerProfile) idToInfluencer;
    mapping(address => uint256) addToIdInfl;
    mapping(uint256 => WebContent) idToContent;
    mapping(address => uint256[]) addToCreatedContents;
    uint256 webContentIds;
    uint256 influencerCount;
    mapping(address => uint256) influencerVotes;
    mapping(address => Votes[]) influencerToVoterInfo;
    mapping(address => uint256) infVoters;

    /// @notice Constructor initializes the contract with the router address.
    /// @param _router The address of the router contract.
    /// @param _link The address of the link contract.
    constructor(address _router, address _link) {
        s_router = IRouterClient(_router);
        s_linkToken = LinkTokenInterface(_link);
    }
    function becomeInfleuncer(string memory _name, string memory _desc,  string memory _category, string memory _image) external {
        
        InfluencerProfile memory influencer = InfluencerProfile({id: influencerCount,name:_name,account: msg.sender, image:_image, category:_category, desc: _desc ,askVotes: true});
        idToInfluencer[influencerCount] = influencer;
        addToIdInfl[msg.sender] = influencerCount;
        influencerCount = influencerCount+1;
        
    }
    function shutDownVoting(address _influencer) external {
        idToInfluencer[addToIdInfl[_influencer]].askVotes = false;
    }
    function startVoting(address _influencer) external {
        idToInfluencer[addToIdInfl[_influencer]].askVotes = true;
    }
    function createContent (string memory _name, string memory _image, string memory _cid) external {    
        WebContent memory webcontent = WebContent({id: webContentIds, name: _name, image:_image , cid: _cid, author: addToIdInfl[msg.sender]});
        idToContent[webContentIds] = webcontent;
        addToCreatedContents[msg.sender].push(webContentIds);
        webContentIds = webContentIds+1;
    }

    function listOfInfluencers () external view returns (InfluencerProfile[] memory){
        InfluencerProfile[] memory listOfInf = new InfluencerProfile[](influencerCount);
        for(uint256 i = 0;i< influencerCount;i++){
            listOfInf[i] = idToInfluencer[i];
        }
        return listOfInf;
    }

    function listOfCreatedContents (address _author)external  view returns (WebContent[] memory) {
        uint256[] memory createdContentIds = addToCreatedContents[_author];
        WebContent[] memory webcontentsForInf = new WebContent[](createdContentIds.length);
        for(uint256 i = 0; i < createdContentIds.length; i++) {
            webcontentsForInf[i] = idToContent[createdContentIds[i]];
        }
        return webcontentsForInf;
    }

    function voteForInfluencer(uint256 _amount, address _influencer) external {
        influencerVotes[_influencer] +=  _amount;
        influencerToVoterInfo[_influencer].push(Votes({voter:msg.sender, tokens: _amount}));
        infVoters[_influencer]+=1;
    }

    function voteForContent(uint256 _amount, uint256 _influencer) external {
        influencerVotes[idToInfluencer[_influencer].account] +=  _amount;
    }

    function numberofInfluencerVoters(address _influencer) external returns(uint256){
        return infVoters[_influencer];
    }
    function redistributeTokens(uint256 profit, address token)external {
        GhoToken gho = GhoToken(token);
        uint256 _amount = influencerVotes[msg.sender]; // profit + amount
        for(uint256 i =0; i<influencerToVoterInfo[msg.sender].length; i++){
            gho.transfer(influencerToVoterInfo[msg.sender][i].voter,influencerToVoterInfo[msg.sender][i].tokens+profit);
        }
        delete influencerToVoterInfo[msg.sender];
    }
    function balanceOf(address _token) external returns (uint256){
        GhoToken gho = GhoToken(_token);
        return gho.balanceOf(msg.sender);
    }

    function mintTok(address _token, uint256 _amount) external returns (uint256){
        GhoToken gho = GhoToken(_token);
        gho.mint(msg.sender,_amount);
    }
    function burnTok(address _token, uint256 _amount) external returns (uint256){
        GhoToken gho = GhoToken(_token);
        gho.burn(_amount);
    }

    function sendVoteData(address _influencer)external view returns(Votes[] memory){
        return influencerToVoterInfo[_influencer];
    }
/// @notice Sends data to receiver on the destination chain.
    /// @dev Assumes your contract has sufficient LINK.
    /// @param destinationChainSelector The identifier (aka selector) for the destination blockchain.
    /// @param receiver The address of the recipient on the destination blockchain.
    /// @param text The string text to be sent.
    /// @return messageId The ID of the message that was sent.
    function sendMessage(
        uint64 destinationChainSelector,
        address receiver,
        string calldata text
    ) public onlyOwner returns (bytes32 messageId) {
        // Create an EVM2AnyMessage struct in memory with necessary information for sending a cross-chain message
        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver), // ABI-encoded receiver address
            data: abi.encode(text), // ABI-encoded string
            tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array indicating no tokens are being sent
            extraArgs: Client._argsToBytes(
                // Additional arguments, setting gas limit
                Client.EVMExtraArgsV1({gasLimit: 200_000})
            ),
            // Set the feeToken  address, indicating LINK will be used for fees
            feeToken: address(s_linkToken)
        });

        // Get the fee required to send the message
        uint256 fees = s_router.getFee(
            destinationChainSelector,
            evm2AnyMessage
        );

        if (fees > s_linkToken.balanceOf(address(this)))
            revert NotEnoughBalance(s_linkToken.balanceOf(address(this)), fees);

        // approve the Router to transfer LINK tokens on contract's behalf. It will spend the fees in LINK
        s_linkToken.approve(address(s_router), fees);

        // Send the message through the router and store the returned message ID
        messageId = s_router.ccipSend(destinationChainSelector, evm2AnyMessage);

        // Emit an event with message details
        emit MessageSent(
            messageId,
            destinationChainSelector,
            receiver,
            text,
            address(s_linkToken),
            fees
        );

        // Return the message ID
        return messageId;
    }
    function withdrawTokens ( address token , uint64 destinationChainSelector,
        address receiver, string calldata data) external returns (bool){
        GhoToken gho = GhoToken(token);
        bytes32 msgId = sendMessage(destinationChainSelector, receiver , data);
        uint256 _amount = influencerVotes[msg.sender];
        influencerVotes[msg.sender] -=  _amount;
        require(_amount >= 0 ,"Insufficient tokens");
        return gho.transfer(msg.sender, _amount);
    }

    
}
