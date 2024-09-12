import { GameDeployed } from "../generated/CharadeGameFactory/CharadeGameFactory";
import { CharadeGameTemplate } from "../generated/templates";
import { Game, Team, Card, Player } from "../generated/schema";
import { BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import {
  RoundStarted,
  WordChecked,
  ScoreUpdated,
  PlayerJoinedTeam,
  GameStarted,
  CardAdded,
  TeamCreated,
} from "../generated/templates/CharadeGameTemplate/CharadeGame";

// export function handleGameDeployed(event: GameDeployed): void {
//   // Create a new Game entity with the ID being the game address
//   let game = new Game(event.params.gameAddress.toHexString());

//   // Set the fields of the Game entity
//   game.admin = event.params.admin;
//   game.timeLimit = event.params.timeLimit;
//   game.scorePoint = event.params.scorePoint;
//   game.isGameStarted = false;
//   game.currentTeam = 0;
//   game.currentRound = 0;

//   // Save the Game entity
//   game.save();

//   // Start indexing the new CharadeGame contract
//   CharadeGameTemplate.create(event.params.gameAddress);
// }

export function handleRoundStarted(event: RoundStarted): void {
  let game = Game.load(event.address.toHexString());
  if (game == null) return;

  // Update the current round and team in the Game entity
  game.currentRound = event.params.round.toI32();
  game.currentTeam = event.params.team.toI32();
  game.save();
}

export function handleWordChecked(event: WordChecked): void {
  let game = Game.load(event.address.toHexString());
  if (game == null) return;

  let cardId = event.params.encryptedWord + "-" + event.address.toHexString();
  let card = Card.load(cardId);

  if (card == null) {
    card = new Card(cardId);
    card.game = game.id;
    card.encryptedWord = event.params.encryptedWord;
    card.isUsed = false;
  }

  card.player = event.params.player;
  card.save();
}

export function handleScoreUpdated(event: ScoreUpdated): void {
  let game = Game.load(event.address.toHexString());
  if (game == null) return;

  let team = Team.load(
    event.params.team.toString() + "-" + event.address.toHexString()
  );
  if (team == null) return;

  // Update the team's score
  team.score = event.params.score;
  team.save();
}

export function handleGameStarted(event: GameStarted): void {
  let game = Game.load(event.address.toHexString());
  if (game == null) return;

  // Update the isGameStarted field
  game.isGameStarted = true;
  game.save();
}
// Handle TeamCreated event
// export function handleTeamCreated(event: TeamCreated): void {
//   // Create a unique ID for the team using the transaction hash and log index
//   let teamId =
//     event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
//   let team = new Team(teamId);

//   // Associate the team with the game by using the game address (event.address)
//   let game = Game.load(event.address.toHexString());
//   if (game == null) {
//     return; // If the game doesn't exist, return early
//   }
//   team.game = game.id;

//   // Set the team name from the event parameters
//   team.name = event.params.name;

//   // Initialize the members array with the provided members
//   let memberAddresses: Bytes[] = [];
//   for (let i = 0; i < event.params.members.length; i++) {
//     let member = event.params.members[i];
//     memberAddresses.push(member as Bytes); // Cast Address to Bytes
//   }
//   team.members = memberAddresses;

//   // Initialize the team score
//   team.score = BigInt.fromI32(0);

//   // Save the team entity
//   team.save();
// }

export function handlePlayerJoinedTeam(event: PlayerJoinedTeam): void {
  // Ensure teamId matches the format used in Team creation
  let teamId = event.params.team.toString() + "-" + event.address.toHexString();
  let team = Team.load(teamId);

  if (team == null) {
    team = new Team(teamId);
    team.game = event.address.toHexString();
    team.score = BigInt.fromI32(0);
  }

  // Load or create the player
  let playerId = event.params.player.toHexString();
  let player = Player.load(playerId);

  if (player == null) {
    player = new Player(playerId);
    player.team = team.id;
    player.address = event.params.player;
    player.save();
  }

  // Add the player to the team’s members array
  let members = team.members;
  members.push(event.params.player);
  team.members = members;

  // Save the updated team
  team.save();
}

export function handleCardAdded(event: CardAdded): void {
  let game = Game.load(event.address.toHexString());
  if (game == null) return;

  // Create a unique ID for the Card entity using a combination of the game address and an index or unique identifier
  let cardId = event.transaction.hash.toHex() + "-" + event.logIndex.toString();

  // Create a new Card entity
  let card = new Card(cardId);

  // Set the fields of the Card entity
  card.game = game.id;
  card.encryptedWord = ""; // Since the event doesn't include the word directly, initialize it empty or update as necessary
  card.word = ""; // Initialize with an empty string, to be updated when the word is revealed
  card.isUsed = false; // Initialize as not used
  card.team = game.currentTeam.toString() + "-" + event.address.toHexString(); // Associate with the current team
  card.player = event.transaction.from; // Set the player to the one who added the card

  // Save the Card entity
  card.save();
}
