import ethers from "ethers";

const PROVIDER = "http://127.0.0.1:8545/";

const provider = new ethers.JsonRpcProvider(PROVIDER);

export { provider };
