
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Wind.sol";

contract Chef  {
    struct UserInfo {
        bool exists;
        uint256 rewardPending;
        address [] pools;
        uint256 [] amount_in_pools;
    }
    struct Poolinfo {
        bool exists;
        IERC20 lpToken;
        uint256 wind_reward_per_block;
        uint256 last_reward_block;
    }

    address public owner;
    Wind public wind;
    uint256 public startblock;
    Poolinfo [] public polinfo;
    mapping (uint256 => mapping ( address => UserInfo)) public userinfo;
    
    constructor (uint256 _startblock, Wind _wind, address _owner)  {
        startblock= _startblock;
        wind= _wind;
        owner= _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function add (IERC20 _lpToken, uint256 _last_reward_block, uint256 _wind_reward_per_block) public onlyOwner {
        polinfo.push(Poolinfo({
        exists: true,
         lpToken: _lpToken,
         wind_reward_per_block: _wind_reward_per_block,
         last_reward_block: _last_reward_block
        }));
    }

    function deposit (uint256 _pid, uint256 _amount) public {
        Poolinfo storage pool = polinfo[_pid];
        UserInfo storage user = userinfo[_pid][msg.sender];
        if (_amount > 0) {
            pool.lpToken.safeTransferFrom(address(msg.sender), address(this), _amount)
        }
    }
}