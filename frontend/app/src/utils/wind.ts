import { ethers } from "ethers";
import { provider } from "./provider";
import * as WIND from "../../../../hardhat-development/artifacts/contracts/Wind.sol/Wind.json";

const WIND_ADDRESs = "0xB88bedd28faA7f235995fb9325e996De4c803f40";

const wind = new ethers.Contract(WIND_ADDRESs, WIND.abi, provider);

export default wind;
