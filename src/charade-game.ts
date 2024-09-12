import {
  CardAdded,
  GameStarted,
  PlayerJoinedTeam,
  RoundStarted,
  ScoreUpdated,
  TeamCreated,
  WordChecked,
} from "../generated/schema";

import {
  CardAdded as CardAddedEvent,
  GameStarted as GameStartedEvent,
  PlayerJoinedTeam as PlayerJoinedTeamEvent,
  RoundStarted as RoundStartedEvent,
  ScoreUpdated as ScoreUpdatedEvent,
  TeamCreated as TeamCreatedEvent,
  WordChecked as WordCheckedEvent,
} from "../generated/templates/CharadeGameTemplate/CharadeGame";

export function handleCardAdded(event: CardAddedEvent): void {
  let entity = new CardAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleGameStarted(event: GameStartedEvent): void {
  let entity = new GameStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePlayerJoinedTeam(event: PlayerJoinedTeamEvent): void {
  let entity = new PlayerJoinedTeam(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.team = event.params.team;
  entity.player = event.params.player;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoundStarted(event: RoundStartedEvent): void {
  let entity = new RoundStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.round = event.params.round;
  entity.team = event.params.team;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleScoreUpdated(event: ScoreUpdatedEvent): void {
  let entity = new ScoreUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.team = event.params.team;
  entity.score = event.params.score;
  entity.word = event.params.word;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTeamCreated(event: TeamCreatedEvent): void {
  let entity = new TeamCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.name = event.params.name;
  // entity.members = event.params.members;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWordChecked(event: WordCheckedEvent): void {
  let entity = new WordChecked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.team = event.params.team;
  entity.player = event.params.player;
  entity.encryptedWord = event.params.encryptedWord;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
