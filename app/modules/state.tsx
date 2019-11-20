import { IAppState } from "./app/reducer";
import { IRoutingState } from "./routing";
import { ISpotifyState } from "./spotify/reducer";

export interface IMainState {
    app: IAppState;
    routing: IRoutingState;
    spotify: ISpotifyState;
}