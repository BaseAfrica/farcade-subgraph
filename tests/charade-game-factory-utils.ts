import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { GameDeployed } from "../generated/CharadeGameFactory/CharadeGameFactory"

export function createGameDeployedEvent(
  gameAddress: Address,
  admin: Address,
  timeLimit: BigInt,
  scorePoint: BigInt
): GameDeployed {
  let gameDeployedEvent = changetype<GameDeployed>(newMockEvent())

  gameDeployedEvent.parameters = new Array()

  gameDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "gameAddress",
      ethereum.Value.fromAddress(gameAddress)
    )
  )
  gameDeployedEvent.parameters.push(
    new ethereum.EventParam("admin", ethereum.Value.fromAddress(admin))
  )
  gameDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "timeLimit",
      ethereum.Value.fromUnsignedBigInt(timeLimit)
    )
  )
  gameDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "scorePoint",
      ethereum.Value.fromUnsignedBigInt(scorePoint)
    )
  )

  return gameDeployedEvent
}
