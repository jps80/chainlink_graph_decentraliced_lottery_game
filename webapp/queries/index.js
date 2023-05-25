export function FETCH_CREATED_GAME() {
  return `query {
        games(orderBy:gameId, orderDirection:desc, first: 1) {
            id
            maxPlayers
            entryFee
            winner
            players
			gameId
        }
    }`;
}
