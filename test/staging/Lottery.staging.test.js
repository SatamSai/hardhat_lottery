const { assert, expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Lottery Unit Tests", function () {
          let lottery, lotteryEntranceFee, deployer
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              console.log("HEY")
              lottery = await ethers.getContract("Lottery", deployer)
              lotteryEntranceFee = await lottery.getEntranceFee()
          })
          describe("fulfillRandomWords", function () {
              it("works with live chainlink keepers and chainlink VRF, we get a random winner", async function () {
                  const startingTimeStamp = await lottery.getLastTimeStamp()
                  let winnerStartingBalance
                  const accounts = await ethers.getSigners()
                  await new Promise(async function (resolve, reject) {
                      lottery.once("WinnerPicked", async () => {
                          try {
                              const recentWinner = await lottery.getRecentWinner()
                              console.log(recentWinner)
                              const lotteryState = await lottery.getLotteryState()
                              console.log(lotteryState)
                              const winnerEndingBalance = await accounts[0].getBalance()
                              console.log(winnerEndingBalance)
                              const endingTimeStamp = await lottery.getLastTimeStamp()
                              console.log(endingTimeStamp)
                              await expect(lottery.getPlayer(0)).to.be.reverted
                              console.log("Hey")
                              await assert.equal(recentWinner.toString(), accounts[0].address)
                              console.log("Hey")
                              await assert.equal(lotteryState, 0)
                              console.log("HEY")
                              await assert.equal(
                                  winnerEndingBalance.toString(),
                                  winnerStartingBalance.add(lotteryEntranceFee).toString()
                              )
                              console.log("Hey")
                              await assert(endingTimeStamp > startingTimeStamp)
                              console.log("Hey")
                              resolve()
                          } catch (e) {
                              console.log(e)
                              reject(e)
                          }
                      })
                      console.log("Entering lottery")
                      const tx = await lottery.enterLottery({ value: lotteryEntranceFee })
                      await tx.wait(1)
                      console.log("HEY")
                      winnerStartingBalance = await accounts[0].getBalance()
                      console.log(winnerStartingBalance)
                  })
              })
          })
      })
