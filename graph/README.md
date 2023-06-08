# TheGraph

## Instructions

1º You need create an account in https://thegraph.com/studio/ using a EOA (address)

2º Create a subgraph (you should sign a transacction with your Metamask Wallet, so you should install it)

3º Install the tools
``` shell
npm install -g @graphprotocol/graph-cli 
``` 
4º Initialize your subgraph.
``` shell
graph init --studio NAME_OF_YOUR_SUBGRAPH
---
√ Protocol · ethereum
√ Subgraph slug · smart_lottery_VR
√ Directory to create the subgraph in · smart_lottery_VR
√ Ethereum network · mumbai
√ Contract address · 0xa30f12178783ff35c52f2a9d20fad31201a55069
√ Fetching ABI from Etherscan
× Failed to fetch Start Block: Failed to fetch contract creation transaction hash

√ Start Block · 36043909
√ Contract Name · SmartLotteryVRFv2Consumer
√ Index contract events as entities (Y/n) · true
  Generate subgraph
  Write subgraph to directory
√ Create subgraph scaffold
√ Initialize networks config
√ Initialize subgraph repository
√ Install dependencies with yarn
√ Generate ABI and schema types with yarn codegen
---
``` 

### For this specific example
I did the next changes

1º In schema.graphql generate new Entity:
```
type Game @entity {
  id: ID!
  maxPlayers: Int!
  entryFee: BigInt! # uint256
  winner: Bytes # address
  requestId: BigInt! # uint256
  players: [Bytes!]!
  gameId: BigInt! # uint256
}
```

2º include the new entity in subgraph.yaml
 ```
 entities:
        - GameEnded
        - GameStarted
        - GameStopped
        - OwnershipTransferRequested
        - OwnershipTransferred
        - PlayerJoined
        - RequestFulfilled
        - RequestSent
        - **Game**
```
3º Modify smart_lottery_VR\src\smart-lottery-vr-fv-2-consumer.ts to include the new Entity


## Continue...

5º Authenticate within the CLI
``` shell
graph auth --studio dXXXXXXXXXXXX 
``` 
6º Enter in subgraph folder (crated in step 4º)
``` shell
cd NAME_OF_YOUR_SUBGRAPH
``` 
7º  genate & build
``` shell
graph codegen && graph build
``` 
8º  deploy your subgraph to the Studio
``` shell
graph deploy --studio NAME_OF_YOUR_SUBGRAPH

Which version label to use? (e.g. "v0.0.1"): v.0.0.3
  Skip migration: Bump mapping apiVersion from 0.0.1 to 0.0.2
  Skip migration: Bump mapping apiVersion from 0.0.2 to 0.0.3
  Skip migration: Bump mapping apiVersion from 0.0.3 to 0.0.4
  Skip migration: Bump mapping apiVersion from 0.0.4 to 0.0.5
  Skip migration: Bump mapping apiVersion from 0.0.5 to 0.0.6
  Skip migration: Bump manifest specVersion from 0.0.1 to 0.0.2
  Skip migration: Bump manifest specVersion from 0.0.2 to 0.0.4
√ Apply migrations
√ Load subgraph from subgraph.yaml
  Compile data source: SmartLotteryVRFv2Consumer => build\SmartLotteryVRFv2Consumer\SmartLotteryVRFv2Consumer.wasm
√ Compile subgraph
  Copy schema file build\schema.graphql
  Write subgraph file build\SmartLotteryVRFv2Consumer\abis\SmartLotteryVRFv2Consumer.json
  Write subgraph manifest build\subgraph.yaml
√ Write compiled subgraph to build\
  Add file to IPFS build\schema.graphql
- Upload subgraph to IPFS(node:23032) ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
                .. QmVJcYFpkbWdnB25uJymiksLYxgrvLvYbvsJFXvWcgeMTr
  Add file to IPFS build\SmartLotteryVRFv2Consumer\abis\SmartLotteryVRFv2Consumer.json
                .. QmeYL31RzMDZPTsVwHk8v9ACZNDvpWGdjBNFdLU81WVGW7
  Add file to IPFS build\SmartLotteryVRFv2Consumer\SmartLotteryVRFv2Consumer.wasm
                .. Qmc2YKLtsmVspoMrhgdtqTXbfTPTm3PwxqchA2oCxYeBaj
√ Upload subgraph to IPFS

Build completed: Qmer7NSHc7RyNwWCXFAC3eHVrboo89aUDxDrDfU2UcrTBk

Deployed to https://thegraph.com/studio/subgraph/smart_lottery_vrf

Subgraph endpoints:
Queries (HTTP):     https://api.studio.thegraph.com/query/47227/smart_lottery_vrf/v.0.0.3

``` 
¡Now you can play with GraphQL queries!
  - https://thegraph.com/studio/subgraph/smart_lottery_vrf/playground