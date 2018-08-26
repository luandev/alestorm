import { AnyAction, Store } from "redux";
import { IApplicationState } from ".";

export interface IConn { type: 'CONN', status: ConnStatus }

const RECONNECTION_TIME: number = 2000;
const EVENTS_CHANNEL: string = "ws://127.0.0.1";
export class WebSocketMiddleware {

    public static getInstance() {
        if (!WebSocketMiddleware.instance) {
            WebSocketMiddleware.instance = new WebSocketMiddleware();
        }
        return WebSocketMiddleware.instance;
    }

    private static instance: WebSocketMiddleware;
    private timeHandler: NodeJS.Timer;
    private connection: WebSocket;
    private MainStore: Store<IApplicationState, AnyAction>;

    private constructor() {
        // Enable for socket connections
        // this.Connect();

        this.Send = this.Send.bind(this);
        this.Connect = this.Connect.bind(this);
        this.Reconnect = this.Reconnect.bind(this);
        this.SocketInvoked = this.SocketInvoked.bind(this);
        this.CreateMiddleware = this.CreateMiddleware.bind(this);
        this.InvokeMiddleware = this.InvokeMiddleware.bind(this);
    }

    public CreateMiddleware(store: Store<IApplicationState, AnyAction>, callback: () => void) {
        this.MainStore = store;
        callback();
    }

    public InvokeMiddleware(store: any) {

        return (next: any) => async (action: SoktKnownAction) => {
            // STUB

            return next(action);
        }
    }

    private SocketInvoked(ev: IProtocolEncap) {

        // STUB
        // this.MainStore.dispatch({ type: 'CHECK_HANDSHAKE', receivedObj: ev as IProtocolEncap } as EventStore.KnownAction)
    }

    private Connect() {
        try {
            this.connection = new WebSocket(EVENTS_CHANNEL);
            this.connection.onclose = (ev) => {
                this.MainStore.dispatch({ type: 'CONN', status: ConnStatus.DISCONNECTED } as IConn);
                this.Reconnect();
            }

            this.connection.onopen = (ev) => {
                this.MainStore.dispatch({ type: 'CONN', status: ConnStatus.CONNECTED } as IConn);
            }

            this.connection.onerror = (ev) => {
                this.MainStore.dispatch({ type: 'CONN', status: ConnStatus.ERROR } as IConn);

                if (this.connection.readyState === this.connection.CLOSING || this.connection.readyState === this.connection.CLOSED) {
                    this.Reconnect();
                }
            }
            this.connection.onmessage = (ev) => {
                this.SocketInvoked(JSON.parse(ev.data) as IProtocolEncap);
            };
        }
        catch (error) {
            console.log(error);
            this.MainStore.dispatch({ type: 'CONN', status: ConnStatus.ERROR } as IConn);
            this.Reconnect();
        }
    };

    

    private Send(tp: string, payload: any) {
        this.connection.send(JSON.stringify({ type: tp, obj: payload })) // TODO review the server payload
    }

    private Reconnect() {
        clearTimeout(this.timeHandler);
        this.timeHandler = setTimeout(() => this.Connect(), RECONNECTION_TIME);
    }
}


/* Socket Actions (EXAMPLE) */
interface ILoad { type: 'LOAD' }
interface IOpen { type: 'OPEN', movie: string }

type SoktKnownAction = ILoad | IOpen;





// tslint:disable-next-line:no-empty-interface
export interface IProtocolEncap {}

export enum ConnStatus{
    ERROR,
    CONNECTED,
    DISCONNECTED,
}

