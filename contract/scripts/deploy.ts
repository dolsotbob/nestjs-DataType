import { ethers } from 'hardhat';
import { makeAbi } from './abiGenerator';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // Todo: 배포하기 위한 script를 만들어주세요.
  // ✅ 컨트랙트 가져오기
  const DataType = await ethers.getContractFactory("DataType");

  // ✅ 생성자에 recipient 주소 전달
  const contract = await DataType.deploy(deployer.address);

  // ✅ 배포 완료 대기 (필요하면)
  await contract.waitForDeployment();

  // ✅ 주소 출력
  console.log(`DataType contract deployed at: ${contract.target}`);

  await makeAbi(`DataType`, contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
