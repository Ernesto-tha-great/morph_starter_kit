// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {OkidoToken} from "../src/OkidoToken.sol";
import {OkidoPropertyNFT} from "../src/OkidoPropertyNFT.sol";
import {FractionalOwnership} from "../src/FractionalOwnership.sol";
import {OkidoFinance} from "../src/OkidoFinance.sol";



contract DeployerScript is Script {
    function setUp() public {}

   function run() public returns(OkidoFinance) {
        vm.startBroadcast();
        OkidoToken token = new OkidoToken(1000000);
        OkidoPropertyNFT propertyNft = new OkidoPropertyNFT();
      OkidoFinance okidoFinance = new OkidoFinance(address(propertyNft), address(token));

        vm.stopBroadcast();
        return okidoFinance;
    }
}

//  To deploy
//  - Run "source .env" in your terminal. ensure you are in the contract directory
//  - Run "forge script script/Deployer.s.sol --rpc-url $RPC_URL --broadcast --legacy  --private-key $PRIVATE_KEY"
