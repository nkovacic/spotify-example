import { IAppState } from "./app/state";
import { IRoutingState } from "./routing";
import { ISpotifyState } from "./spotify/state";

export interface IMainState {
    app: IAppState;
    routing: IRoutingState;
    spotify: ISpotifyState;
}