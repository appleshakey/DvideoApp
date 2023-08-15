const { frontEndAbiFile } = require("../helper-hardhat-config")
const fs = require("fs")
const { network } = require("hardhat")

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Front End.....")
        await updateAbi()
        console.log("Front End Written")
    }
}

async function updateAbi() {
    const videoNftMiner = await ethers.getContractFactory("videoNFTMiner")
    fs.writeFileSync(
        frontEndAbiFile,
        videoNftMiner.interface.format(ethers.utils.FormatTypes.json),
    )
}
