import {Status} from '@Types/players/player-status.enum';
import {Equipment} from '@Types/players/player-equipment.type';
import {Attributes} from '@Types/players/player-attributes.type';

export type UpdatePlayerPayload = {
  status?: Status;
  equipment?: Equipment;
  attributes?: Attributes;
};
