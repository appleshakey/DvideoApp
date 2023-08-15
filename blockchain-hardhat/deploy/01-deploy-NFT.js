const { network, ethers } = require("hardhat")
const {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    frontEndContractsFile,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const fs = require("fs")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    const video_tokenizer = await deploy("videoNFTMiner", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    async function updateContractAddresses(address) {
        const contractAddresses = JSON.parse(
            fs.readFileSync(frontEndContractsFile, "utf8"),
        )
        if (network.config.chainId.toString() in contractAddresses) {
            if (
                !contractAddresses[network.config.chainId.toString()].includes(
                    address,
                )
            ) {
                contractAddresses[network.config.chainId.toString()].push(
                    address,
                )
            }
        } else {
            contractAddresses[network.config.chainId.toString()] = [address]
        }
        fs.writeFileSync(
            frontEndContractsFile,
            JSON.stringify(contractAddresses),
        )
    }
    updateContractAddresses(video_tokenizer.address)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("Verifying...")
        await verify(video_tokenizer.address, [])
    }

    log("-----------------------------------")
}

module.exports.tags = ["all", "videoNFTMiner"]
