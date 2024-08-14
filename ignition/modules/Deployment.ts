import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DeploymentModule = buildModule("DeploymentModule", (m) => {
  // Use the first account as the initial owner
  const initialOwner = m.getAccount(0);

  // Deploy the contract with the initial owner address
  const CryptoLendsToken = m.contract("CryptoLendsToken", [initialOwner]);
  const ICO = m.contract("ICO", [CryptoLendsToken]);

  const totalSupply = m.staticCall(CryptoLendsToken, "totalSupply");
  m.call(CryptoLendsToken, "approve", [ICO, totalSupply], {
    from: initialOwner,
  });

  return { CryptoLendsToken, ICO };
});

export default DeploymentModule;
