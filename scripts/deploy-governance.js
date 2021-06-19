const { ethers } = require("hardhat");

async function main() {
  const [admin] = await ethers.getSigners();

  const currentNonce = await admin.getTransactionCount();

  const futureGovernorAlphaAddress = await ethers.utils.getContractAddress({
    from: admin.address,
    nonce: currentNonce + 2 // (gAKITA + Timelock)
  });
  console.log('futureGovernorAlphaAddress', futureGovernorAlphaAddress)

  // Deploy gAKITA, sending the total supply to the dev team
  const GAkita = await ethers.getContractFactory("gAKITA");
  const gAkita = await GAkita.deploy(admin.address);
  console.log('gAKITA deployed to:', gAkita.address);

  // Deploy Timelock
  const TWO_DAYS_IN_SECONDS = 60 * 2; // 60 * 60 * 24 * 2;
  const Timelock = await ethers.getContractFactory('Timelock');
  const timelock = await Timelock.deploy(futureGovernorAlphaAddress, TWO_DAYS_IN_SECONDS);
  console.log('Timelock deployed to:', timelock.address);

  // Deploy GovernorAlpha
  const GovernorAlpha = await ethers.getContractFactory('GovernorAlpha');
  const governorAlpha = await GovernorAlpha.deploy(timelock.address, gAkita.address);
  console.log('GovernorAlpha deployed to:', governorAlpha.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
