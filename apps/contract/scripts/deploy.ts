import { ethers } from "hardhat";

const entrypoint = "0x0576a174D229E3cFA37253523E645A78A0C91B57";

async function main() {
  const Factory = await ethers.getContractFactory(
    "SimpleSocialRecoveryAccountFactory"
  );
  const factory = await Factory.deploy(entrypoint);
  await factory.deployed();

  console.log("Factory deployed to:", factory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
