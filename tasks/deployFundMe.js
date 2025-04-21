const {task} = require("hardhat/config");


task("deployFundMe").setAction(async (taskArgs, hre) => {
    //create factory
    const fundMeFactory = await ethers.getContractFactory("FundMe");
    console.log("Deploying FundMe contract...")
    //deploy contract from factory
    const fundMe = await fundMeFactory.deploy(300);
    await fundMe.waitForDeployment();// wait for the contract to be deployed
    console.log(`Contract has been deployed successfully, Contract addresss is ${fundMe.target}`);

    //verify contract on etherscan
    if (hre.network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){
        
        console.log("Waiting for 5 blocks to confirm the transaction...")
        fundMe.deploymentTransaction().wait(5)
        await verifyContract(fundMe.target,300);
        console.log("Contract verified successfully!")
    } else{
        console.log("Contract skipped.")
    }
})


async function verifyContract(FundMeAddr, args){

    await hre.run("verify:verify", {
        address: FundMeAddr,
        constructorArguments: [
            args,
        ],
      });
}

module.exports = {}