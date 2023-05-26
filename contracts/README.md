# (temp) Hardhat Project


```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

# Commands hardhat
```shell
1º npx hardhat compile 
2º npx hardhat run scripts/deploy.js --network mumbai
```


npx hardhat verify --network mumbai 0xA30f12178783Ff35c52f2A9D20fAd31201A55069 4635

3º the deployed contract should be add as "Consumer" into subscription (https://vrf.chain.link/mumbai/4635) [more info here](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number#create-and-fund-a-subscription)

# Info
[Contract deployed with Chainlink VRF funcionality (Mumbai)](https://mumbai.polygonscan.com/address/0xA30f12178783Ff35c52f2A9D20fAd31201A55069)
With hardhat we can verify the smartContracts directly in Etherscan

```shell
for verification on the block explorer. Waiting for verification result...
Successfully verified contract SmartLotteryContractVRF1 on Etherscan.
https://mumbai.polygonscan.com/address/0xA30f12178783Ff35c52f2A9D20fAd31201A55069#code
```