import {
  IOngoingResponse,
  IUnreleasedWithDate,
  IUnreleasedNoDate,
  ICompleted
} from "../interfaces/message.response.interface";
export class ResponseMessage
  implements
    IOngoingResponse,
    IUnreleasedWithDate,
    IUnreleasedNoDate,
    ICompleted {
  Id: number;
  IdMal: number;
  Color: number;
  Thumbnail: string;
  Title: string;
  Type: string;
  Status: string;
  TotalEps: number = null;
  Current: number;
  Countdown: string = null;
  UpdatedAt: string;
  StartDate: string;
  EndDate: string;

  constructor(
    $Id: number,
    $IdMal: number,
    $Color: number,
    $Thumbnail: string,
    $Title: string,
    $Type: string,
    $Status: string,
    $TotalEps: number = null,
    $Current: number,
    $Countdown: string = null,
    $UpdatedAt: string,
    $StartDate: string,
    $EndDate: string
  ) {
    this.Id = $Id;
    this.IdMal = $IdMal;
    this.Color = $Color;
    this.Thumbnail = $Thumbnail;
    this.Title = $Title;
    this.Type = $Type;
    this.Status = $Status;
    this.TotalEps = $TotalEps;
    this.Current = $Current;
    this.Countdown = $Countdown;
    this.UpdatedAt = $UpdatedAt;
    this.StartDate = $StartDate;
    this.EndDate = $EndDate;
  }
}
