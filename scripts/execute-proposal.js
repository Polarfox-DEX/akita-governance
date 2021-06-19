const { ethers } = require("hardhat");

const GOVERNOR_ALPHA_ABI = require('../artifacts/contracts/GovernorAlpha.sol/GovernorAlpha.json').abi;

const config = {
  GOVERNOR_ALPHA_ADDRESS: '0xd848A6A81769b8829a3dbaD27Ba0EAA74BC0b12b',
  PROPOSAL_ID: 12
}

async function main() {
  const [admin] = await ethers.getSigners();

  const governorAlpha = new ethers.Contract(config.GOVERNOR_ALPHA_ADDRESS, GOVERNOR_ALPHA_ABI)
    .connect(admin);

  await governorAlpha.execute(config.PROPOSAL_ID);

  console.log('Proposal executed')
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
