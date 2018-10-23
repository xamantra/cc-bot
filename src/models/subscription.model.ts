import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("")
export class User {
  @JsonProperty("id", Number)
  public Id: number = undefined;
  @JsonProperty("discord_id", String)
  public DiscordId: string = undefined;
}

@JsonObject("")
export class Media {
  @JsonProperty("mal_id", Number)
  public MalId: number = undefined;
  @JsonProperty("title", String)
  public Title: string = undefined;
}

@JsonObject("")
export class Subscription {
  @JsonProperty("id", Number)
  public Id: number = undefined;
  @JsonProperty("media_id", Number)
  public MediaId: number = undefined;
  @JsonProperty("user_id", Number)
  public UserId: number = undefined;
}
