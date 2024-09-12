import { GameDeployed as GameDeployedEvent } from "../generated/CharadeGameFactory/CharadeGameFactory"
import { GameDeployed } from "../generated/schema"

export function handleGameDeployed(event: GameDeployedEvent): void {
  let entity = new GameDeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.gameAddress = event.params.gameAddress
  entity.admin = event.params.admin
  entity.timeLimit = event.params.timeLimit
  entity.scorePoint = event.params.scorePoint

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
