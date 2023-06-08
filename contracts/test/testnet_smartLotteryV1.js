const { expect } = require("chai");
require("dotenv").config({ path: ".env" });

// JSON del ABI del contrato
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "winner",
        "type": "address"
      }
    ],
    "name": "GameEnded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "maxPlayers",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "entryFee",
        "type": "uint256"
      }
    ],
    "name": "GameStarted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      }
    ],
    "name": "GameStopped",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "player",
        "type": "address"
      }
    ],
    "name": "PlayerJoined",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "acceptOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "gameId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "gameStarted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "joinGame",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "players",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_maxPlayers",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_entryFee",
        "type": "uint256"
      }
    ],
    "name": "startGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "stopGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];


describe("SmartLotteryV1", function () {
  let smartLottery;
  let player1;
  let player2;

  const SMARTCONTRACT_DEPLOYED = process.env.SMARTCONTRACT_DEPLOYED_MUMBAI;
  
  before(async () => {

    [_player1, _player2] = await ethers.getSigners();
    player1 = _player1;
    player2 = _player2;

    // Crear una instancia del contrato con el owner del contrato (player1)
    smartLottery = new ethers.Contract(SMARTCONTRACT_DEPLOYED, contractABI, player1);

  });

  it("should start the game", async function () {
    const maxPlayers = 2;
    const entryFee = ethers.utils.parseEther("0.01");
    
    // en tesnet (sepolia) necesitamos controlar la asincronia (await y then)
    await smartLottery.startGame(maxPlayers, entryFee).then((transaction) => {
      console.log("La transacción ha sido enviada. Hash de transacción:", transaction.hash);
      // Esperar a que la transacción se confirme
      return transaction.wait();
    })
    .then(async (receipt) => {
      console.log("La transacción se ha confirmado. Bloque de confirmación:", receipt.blockNumber);
      expect(await smartLottery.gameStarted()).to.be.true;
    })
    .catch((error) => {
      console.error("Error al llamar a startGame:", error);
      throw new Error(error);
    });

  });

  it("should stop the game", async function () {
    
    // en tesnet (sepolia) necesitamos controlar la asincronia (await y then)
    await smartLottery.stopGame().then((transaction) => {
      console.log("La transacción ha sido enviada. Hash de transacción:", transaction.hash);
      // Esperar a que la transacción se confirme
      return transaction.wait();
    })
    .then(async (receipt) => {
      console.log("La transacción se ha confirmado. Bloque de confirmación:", receipt.blockNumber);
      expect(await smartLottery.gameStarted()).to.be.false;
    })
    .catch((error) => {
      console.error("Error al llamar a startGame:", error);
      throw new Error(error);
    });
    
  });

  it("should start the game again", async function () {
    const maxPlayers = 2;
    const entryFee = ethers.utils.parseEther("0.01");
    
    // en tesnet (sepolia) necesitamos controlar la asincronia (await y then)
    await smartLottery.startGame(maxPlayers, entryFee).then((transaction) => {
      console.log("La transacción ha sido enviada. Hash de transacción:", transaction.hash);
      // Esperar a que la transacción se confirme
      return transaction.wait();
    })
    .then(async (receipt) => {
      console.log("La transacción se ha confirmado. Bloque de confirmación:", receipt.blockNumber);
      expect(await smartLottery.gameStarted()).to.be.true;
    })
    .catch((error) => {
      console.error("Error al llamar a startGame:", error);
      throw new Error(error);
    });
    
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
    
    const entryFee = ethers.utils.parseEther("0.01");
    
    // en tesnet (sepolia) necesitamos controlar la asincronia (await y then)
    await smartLottery.connect(player1).joinGame({ value: entryFee }).then((transaction) => {
      console.log("La transacción ha sido enviada. Hash de transacción:", transaction.hash);
      // Esperar a que la transacción se confirme
      return transaction.wait();
    })
    .then(async (receipt) => {
      console.log("La transacción se ha confirmado. Bloque de confirmación:", receipt.blockNumber);
      expect(await smartLottery.players(0)).to.equal(player1.address);
      expect(await smartLottery.gameStarted()).to.be.true;
    })
    .catch((error) => {
      console.error("Error al llamar a startGame:", error);
      throw new Error(error);
    });

  });

  it("should join the game the player2 and should select a random winner because the max number of players is reached", async function () {
    
    const entryFee = ethers.utils.parseEther("0.01");
    
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