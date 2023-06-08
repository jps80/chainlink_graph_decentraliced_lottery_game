This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Info about the project

Graph Query endpoint defined in utils\index.js (you should define the endpoint to theGrap, more info in graph/smart_lottery_VR/README.md)

Graph Query endpoint defined in queries\index.js

Set the SmartContract address and ABI in constants\index.js

run the application and play a game!!


You can check:
1º https://vrf.chain.link/mumbai/4635 (id subscription 4635)

2º https://mumbai.polygonscan.com/address/0xa30f12178783ff35c52f2a9d20fad31201a55069#events 
    -   you should identify an event called "GameEnded"

3º https://api.studio.thegraph.com/proxy/47227/smart_lottery_vrf/version/latest/graphql
    -   execute the next query

    ```
           {
            games(orderBy:gameId, orderDirection:desc, first: 1) {
                    id
                    maxPlayers
                    entryFee
                    winner
                    players
                    gameId
                    requestId
                }
            }
    ```

    ``` 
        response:
                    {
            "data": {
                "games": [
                {
                    "id": "3",
                    "maxPlayers": 2,
                    "entryFee": "20",
                    "winner": "0x4b50a438f47bc8cdd95326d8266187dcda52f001",
                    "players": [
                    "0x4b50a438f47bc8cdd95326d8266187dcda52f001",
                    "0x3ee682117aedbda599ccd453c707b92ebe65d32f"
                    ],
                    "gameId": "3",
                    "requestId": "26093573637690474077856373535107039701476317902070545580848961890832536568926"
                }
                ]
            }
            }
    ```
