import { Planted, Killed, Watered, Transfer } from '../generated/CryptOrchidERC721/CryptOrchidERC721';
import { CryptOrchid } from '../generated/schema'

// const speciesIPFSConstant = "ipfs://QmVts4pv2LXad6FhRqChKY9HuTzfYc6mQHprN5jks2Ma8H/"
// const deadSpeciesIPFSConstant = "ipfs://QmUWi5ht9oap6qDRWboqHHMh7FMdMZSuwGSJhTJz1JjxHX/"

export function handlePlanted(event: Planted): void {
  let flower = new CryptOrchid(event.params.tokenId.toHex())
  
  let latinSpecies = event.params.latinSpecies;
  flower.tokenId = event.params.tokenId.toI32();
  flower.growthStage = "FLOWERING";
  flower.waterLevel = 0;
  flower.plantedAt = event.params.timestamp.toI32();
  flower.owner = event.params.tokenOwner;
  flower.latinSpeciesName = latinSpecies;
  flower.save()
}

export function handleKilled(event: Killed): void {
  let id = event.params.tokenId.toHex()
  let flower = CryptOrchid.load(id)
  if (flower) {
    flower.growthStage = "DEAD";
    flower.save()
  }
}

export function handleWatered(event: Watered): void {
  let id = event.params.tokenId.toHex()
  let flower = CryptOrchid.load(id)
  if (flower) {
    flower.waterLevel = event.params.waterLevel.toI32();
  flower.save()
  }
}

export function handleTransferred(event: Transfer): void {
  let id = event.params.tokenId.toHex()
  let flower = CryptOrchid.load(id)
  if(flower) {
    flower.owner = event.params.to;
    flower.save()
  }
}

