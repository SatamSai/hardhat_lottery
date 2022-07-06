require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const GANACHE_RPC_URL = process.env.GANACHE_RPC_URL

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 1337,
            blockConfirmations: 1,
        },
        rinkeby: {
            url: RINKEBY_RPC_URL || "",
            accounts: [PRIVATE_KEY],
            chainId: 4,
            blockConfirmations: 6,
        },
        ganache: {
            url: GANACHE_RPC_URL || "",
            accounts: ["d333b00bdf41e98feab32826a98fb6c5b966890a9afa8e6a2209ca04d4eb3fac","32b04b40ba64561a971c93025fe082351ae96522cd643db0cae40f4ac26daa35","19679f124d08bc440cf92c754e2e08a528bf78a36bdaa3098b55b8fa9f2ee992","02f5a6a72aba9944eaf2c8a40fd09514a422c101b7b01bf77266513c24fae5e5"],
            chainId: 1337,
            blockConfirmations: 1,
        },
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    solidity: "0.8.8",
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    mocha:{
        timeout:400000
    }
}
