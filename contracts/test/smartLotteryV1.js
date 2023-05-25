const { expect } = require("chai");

describe("SmartLotteryV1", function () {
  let smartLottery;
  let player1;
  let player2;

  before(async () => {
    const SmartLotteryV1 = await ethers.getContractFactory("SmartLotteryV1");
    smartLottery = await SmartLotteryV1.deploy();
    await smartLottery.deployed();
    
    [_player1, _player2] = await ethers.getSigners();
    player1 = _player1;
    player2 = _player2;

    console.log(`player1: ${player1.address}`)
    console.log(`player2: ${player2.address}`)

  });

  it("should start the game", async function () {
    const maxPlayers = 2;
    const entryFee = ethers.utils.parseEther("0.1");

    await smartLottery.startGame(maxPlayers, entryFee);

    expect(await smartLottery.gameStarted()).to.be.true;
    
  });

  it("should stop the game", async function () {
    
    await smartLottery.stopGame();
    expect(await smartLottery.gameStarted()).to.be.false;
    
  });

  it("should start the game again", async function () {
    const maxPlayers = 2;
    const entryFee = ethers.utils.parseEther("0.1");

    await smartLottery.startGame(maxPlayers, entryFee);

    expect(await smartLottery.gameStarted()).to.be.true;
    
  });

  it("should throw an error when entry fee is exceeded", async function () {
    
    const entryFee = ethers.utils.parseEther("0.2");

    try{
      await smartLottery.connect(player1).joinGame({ value: entryFee });
      // Si no se lanza un error, la siguiente línea de código fallará el test
      expect.fail("Should have thrown an error");
    }catch(error){
      // Verifica que el error lanzado sea el esperado
      expect(error.message).to.contain("Value sent is not equal to entryFee");
    }
    
  });


  it("should join the game the player1", async function () {
    const entryFee = ethers.utils.parseEther("0.1");

    await smartLottery.connect(player1).joinGame({ value: entryFee });

    expect(await smartLottery.players(0)).to.equal(player1.address);
    expect(await smartLottery.gameStarted()).to.be.true;
  });

  it("should join the game the player2 and should select a random winner because the max number of players is reached", async function () {
    
    const entryFee = ethers.utils.parseEther("0.1");
    
    await smartLottery.connect(player2).joinGame({ value: entryFee });

    const gameEndedEvent = await new Promise((resolve, reject) => {
      smartLottery.on("GameEnded", (gameId, winner) => {
        resolve({ gameId, winner });
      });
    });

    //expect(gameEndedEvent.gameId).to.equal(1);
    expect(gameEndedEvent.winner).to.be.oneOf([player1.address, player2.address]);
    console.log(`GameId: ${gameEndedEvent.gameId}`)
    console.log(`winner: ${gameEndedEvent.winner}`)
  });
  

});