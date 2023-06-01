// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract Mantlemancer {
    function generateNumbers(
        uint sets,
        uint combos,
        uint min,
        uint max,
        uint s
    ) external view returns (uint[] memory) {
        require(
            sets > 0 && combos > 0,
            "Invalid input: sets and combos must be greater than zero."
        );
        require(
            min <= max,
            "Invalid input: min must be less than or equal to max."
        );

        uint[] memory numbers = new uint[](sets * combos);

        uint seed = uint(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, s))
        );

        for (uint i = 0; i < sets * combos; i++) {
            numbers[i] = (seed % (max - min + 1)) + min;
            seed = uint(keccak256(abi.encodePacked(seed)));
        }

        return numbers;
    }

    function calculateDrops(
        uint256 itemNamesLength,
        uint256[] memory itemOdds,
        uint256 howManyItems
    ) public view returns (uint256[] memory) {
        require(itemNamesLength == itemOdds.length, "Array lengths mismatch");

        require(itemOdds.length >= howManyItems, "Insufficient item odds");

        uint256[] memory selectedItems = new uint256[](howManyItems);
        uint256 selectedCount = 0;

        for (uint256 i = 0; i < itemOdds.length; i++) {
            uint256 randomValue = (uint256(
                keccak256(abi.encodePacked(block.prevrandao, i))
            ) % 100) + 1;
            if (randomValue < itemOdds[i]) {
                selectedItems[selectedCount] = i;
                selectedCount++;

                if (selectedCount >= howManyItems) {
                    break;
                }
            }
        }

        return selectedItems;
    }

    function simulator(uint input) external view returns (uint[][] memory) {
        uint[][] memory result = new uint[][](input);
        // name, age, gender, height, weight
        uint256 prev = block.prevrandao;
        for (uint i = 0; i < input; i++) {
            result[i] = new uint[](5);

            uint256 randomNumber = uint256(
                keccak256(abi.encodePacked(prev, i))
            );

            uint256 age = (randomNumber % 80) + 1;

            if (age >= 20 && age <= 60) {
                result[i][1] = age;
            } else {
                uint256 lowerBound = (age > 60) ? 61 : 1;
                uint256 upperBound = (age > 60) ? 100 : 19;

                result[i][1] =
                    lowerBound +
                    ((age - lowerBound) % (upperBound - lowerBound + 1));
            }

            result[i][0] = (randomNumber % 20) + 1;
            if (result[i][0] <= 10) {
                result[i][2] = 1;
            } else {
                result[i][2] = 2;
            }

            uint heightBase = (randomNumber % 101) + 120;
            uint weightBase = (randomNumber % 51) + 40;

            if (result[i][1] >= 18) {
                if (result[i][2] == 1) {
                    result[i][3] = heightBase;
                    result[i][4] = weightBase;
                } else {
                    result[i][3] = heightBase - 10;
                    result[i][4] = weightBase - 5;
                }
            } else {
                if (result[i][2] == 1) {
                    result[i][3] = heightBase - 4 * (18 - result[i][1]);
                    result[i][4] = weightBase - 1 * (18 - result[i][1]);
                } else {
                    result[i][3] = heightBase - 5 * (18 - result[i][1]);
                    result[i][4] = weightBase - 2 * (18 - result[i][1]);
                }
            }
        }

        return result;
    }
}
