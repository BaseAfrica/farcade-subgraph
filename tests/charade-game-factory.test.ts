import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { GameDeployed } from "../generated/schema"
import { GameDeployed as GameDeployedEvent } from "../generated/CharadeGameFactory/CharadeGameFactory"
import { handleGameDeployed } from "../src/charade-game-factory"
import { createGameDeployedEvent } from "./charade-game-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let gameAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let admin = Address.fromString("0x0000000000000000000000000000000000000001")
    let timeLimit = BigInt.fromI32(234)
    let scorePoint = BigInt.fromI32(234)
    let newGameDeployedEvent = createGameDeployedEvent(
      gameAddress,
      admin,
      timeLimit,
      scorePoint
    )
    handleGameDeployed(newGameDeployedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("GameDeployed created and stored", () => {
    assert.entityCount("GameDeployed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "GameDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "gameAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "GameDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "admin",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "GameDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timeLimit",
      "234"
    )
    assert.fieldEquals(
      "GameDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "scorePoint",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
