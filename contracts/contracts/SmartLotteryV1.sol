// SPDX-License-Identifier: MIT
// An example of a consumer contract that directly pays for each request.
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract SmartLotteryV1 is ConfirmedOwner {
    // Address of the players
    address[] public players;
    //Max number of players in one game
    uint8 maxPlayers;
    // Variable to indicate if the game has started or not
    bool public gameStarted;
    // the fees for entering the game
    uint256 entryFee;
    // current game id
    uint256 public gameId;

    // emitted when the game starts
    event GameStarted(uint256 gameId, uint8 maxPlayers, uint256 entryFee);
    // emitted when someone joins a game
    event PlayerJoined(uint256 gameId, address player);
    // emitted when the game ends
    event GameEnded(uint256 gameId, address winner);
    // emitted when the game is stopped by the Owner
    event GameStopped(uint256 gameId);


    constructor() ConfirmedOwner(msg.sender) {
        gameStarted = false;
    }

    /**
     * startGame starts the game by setting appropriate values for all the variables
     */
    function startGame(uint8 _maxPlayers, uint256 _entryFee) public onlyOwner {
        // Check if there is a game already running
        require(!gameStarted, "Game is currently running");
        // empty the players array
        delete players;
        // set the max players for this game
        maxPlayers = _maxPlayers;
        // set the game started to true
        gameStarted = true;
        // setup the entryFee for the game
        entryFee = _entryFee;
        gameId += 1;
        emit GameStarted(gameId, maxPlayers, entryFee);
    }

    /**
     * stopGame function only for development phase. In production should be remove
     */
    function stopGame() public onlyOwner {
        // Check if there is a game already running
        require(gameStarted, "Game is not currently running");
        // set the game started to false
        gameStarted = false;
        emit GameStopped(gameId);
    }


    /**
    joinGame is called when a player wants to enter the game
     */
    function joinGame() public payable {
        // Check if a game is already running
        require(gameStarted, "Game has not been started yet");
        // Check if the value sent by the user matches the entryFee
        require(msg.value == entryFee, "Value sent is not equal to entryFee");
        // Check if there is still some space left in the game to add another player
        require(players.length < maxPlayers, "Game is full");
        // add the sender to the players list
        players.push(msg.sender);
        emit PlayerJoined(gameId, msg.sender);
        // If the list is full start the winner selection process
        if (players.length == maxPlayers) {
             getRandomWinner();
        }
    }

    /**
    * getRandomWinner is called to start the process of selecting a random winner
    */
    function getRandomWinner() private {
        
       //VIP: Not safe. Only for test porpouse. Timestamp could be manipulate by the miners
       uint256 currentBlockTimestamp = block.timestamp;
       fulfillRandomness(currentBlockTimestamp);
    }

    /**
    * 
    * @param randomness this is a random unit256 generated and returned to us by the VRF Coordinator
   */
    function fulfillRandomness(uint256 randomness) internal {
        // We want out winnerIndex to be in the length from 0 to players.length-1
        // For this we mod it with the player.length value
        uint256 winnerIndex = randomness % players.length;
        // get the address of the winner from the players array
        address winner = players[winnerIndex];
        // send the ether in the contract to the winner
        (bool sent,) = winner.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
        // Emit that the game has ended
        emit GameEnded(gameId, winner);
        // set the gameStarted variable to false
        gameStarted = false;
    }

}