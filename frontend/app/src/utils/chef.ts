import { ethers } from "ethers";
import { provider } from "./provider";
import * as Chef from "../../../../hardhat-development/artifacts/contracts/Chef.sol/Chef.json";

const WIND_ADDRESs = "0xB88bedd28faA7f235995fb9325e996De4c803f40";

const chef = new ethers.Contract(WIND_ADDRESs, Chef.abi, provider);

export default chef;
