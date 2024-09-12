import { GameDeployed as GameDeployedEvent } from "../generated/CharadeGameFactory/CharadeGameFactory";
import { DeployedGame } from "../generated/schema";
import { CharadeGameTemplate } from "../generated/templates";

export function handleGameDeployed(event: GameDeployedEvent): void {
  let entity = new DeployedGame(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.gameAddress = event.params.gameAddress;
  entity.admin = event.params.admin;
  entity.timeLimit = event.params.timeLimit;
  entity.scorePoint = event.params.scorePoint;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  CharadeGameTemplate.create(event.params.gameAddress);
}
