// gAKITA deployed to: 0x68b58495cab3938E7ea755977795C5FcDED286BD
// Timelock deployed to: 0x94c3E135C0b51536c6C9d19405B35342E4D4e03a
// GovernorAlpha deployed to: 0xd848A6A81769b8829a3dbaD27Ba0EAA74BC0b12b

const { ethers } = require("hardhat");

const GOVERNOR_ALPHA_ABI = require('../artifacts/contracts/GovernorAlpha.sol/GovernorAlpha.json').abi;

const config = {
  GOVERNOR_ALPHA_ADDRESS: '0xd848A6A81769b8829a3dbaD27Ba0EAA74BC0b12b',
  TIMELOCK_ADDRESS: '0x94c3E135C0b51536c6C9d19405B35342E4D4e03a'
}

async function main() {
  const [admin] = await ethers.getSigners();

  const governorAlpha = new ethers.Contract(config.GOVERNOR_ALPHA_ADDRESS, GOVERNOR_ALPHA_ABI)
    .connect(admin);

  const target = config.TIMELOCK_ADDRESS;
  const value = 0;
  const sig = 'setDelay(uint256)';
  const callData = ethers.utils.defaultAbiCoder.encode(['uint256'], [2 * 60]);
  const description = '\nIncrease proposal queuing time\nSet proposal queuing delay to 2 minutes.'

  await governorAlpha.propose([target], [value], [sig], [callData], description);

  console.log('Proposal created')
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
