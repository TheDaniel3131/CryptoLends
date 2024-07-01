import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DeploymentModule = buildModule("DeploymentModule", (m) => {
  const CryptoLendsToken = m.contract("CryptoLendsToken");
  const ICO = m.contract("ICO", [CryptoLendsToken]);

  const owner = m.getAccount(0);
  const totalSupply = m.staticCall(CryptoLendsToken, "totalSupply");
  m.call(CryptoLendsToken, "approve", [ICO, totalSupply], {
    from: owner,
  });

  return { CryptoLendsToken, ICO };
});

export default DeploymentModule;
