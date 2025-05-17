const {task} = require("hardhat/config");

task("interactFundMe","Interact with fundme contract")
.addParam("addr", "The contract address")
.setAction(async (taskArgs, hre) => {

    const fundMeFactory = await ethers.getContractFactory("FundMe");
    const fundMe = await fundMeFactory.attach(taskArgs.addr);
        // init 2 accounts
        const [firstAcc, secondAcc] = await ethers.getSigners();
        // fund contract with ist account
        const fundTx = await fundMe.fund({value: ethers.parseEther("0.5")});
        await fundTx.wait();
        // check balance of the contract
        const balanceOfContract = ethers.provider.getBalance(fundMe.target)
        console.log(`Contract balance is ${balanceOfContract}`);
        
        // fund contract with 2nd account
        const fundTx2 = await fundMe.connect(secondAcc).fund({value: ethers.parseEther("0.5")});
        // check balance of the contract
        const balanceOfContract2 = ethers.provider.getBalance(fundMe.target)
        console.log(`Contract balance is ${balanceOfContract2}`);
        // check mapping fundersToAmount
        const firstAccountBalanceinFundme = await fundMe.fundersToAmount(firstAcc.address);
        const secondAccountBalanceinFundme = await fundMe.fundersToAmount(secondAcc.address);
        console.log(`First account balance in FundMe contract is ${firstAccountBalanceinFundme}`);
        console.log(`Second account balance in FundMe contract is ${secondAccountBalanceinFundme}`);
})

module.exports = {}