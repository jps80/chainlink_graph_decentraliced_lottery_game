# (temp) Hardhat Project


# Commands hardhat
```shell
1º npx hardhat compile 
2º npx hardhat test test/smartLotteryV1.js   
3º npx hardhat run scripts/deploy.js --network mumbai
4º npx hardhat test test/testnet_smartLotteryV1.js --network mumbai
```

npx hardhat test test/smartLotteryV1.js  --> test using hardhat network (local)

npx hardhat test test/testnet_smartLotteryV1.js --network mumbai --> test using a specific blockchain/protocol (defined in hardat.config.js)

With hardhat we can verify the smartContracts directly in Etherscan (you should have a eteherscan API KEY)

```shell
npx hardhat verify --network mumbai 0xA30f12178783Ff35c52f2A9D20fAd31201A55069

for verification on the block explorer. Waiting for verification result...
Successfully verified contract SmartLotteryContractVRF1 on Etherscan.
https://mumbai.polygonscan.com/address/0xA30f12178783Ff35c52f2A9D20fAd31201A55069#code
```

# Info
[Contract deployed with Chainlink VRF funcionality (Mumbai)](https://mumbai.polygonscan.com/address/0xA30f12178783Ff35c52f2A9D20fAd31201A55069)

VIP: the deployed contract should be add as "Consumer" into subscription (https://vrf.chain.link/mumbai/4635) [more info here](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number#create-and-fund-a-subscription)


### Useful resources
if you want test Chainlink funcionalites without really use the Chainlink you can see this repo 
https://github.com/smartcontractkit/chainlink-mix/blob/main/README.md