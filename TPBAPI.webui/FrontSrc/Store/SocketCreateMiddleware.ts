import { AnyAction, Store } from "redux";
import { IApplicationState } from "./Store";
import * as MovieStore from "./MovieStore";

export interface IConn { type: 'CONN', status: ConnStatus }

const RECONNECTION_TIME: number = 300;
const EVENTS_CHANNEL: string = "ws:// 127.0.0.1:50000/pinnacle-event";


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
         //  this.Connect();

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

        return (next: any) => async (action: MovieStore.SocketKnowAction) => {
            try {
                // switch (action.type) {
                //     case "SOCKT_SAVE_ADJUSTMENT":
                //         this.Send(SendMessageType.SAVE_ADJUSTMENT, action.payload)
                //         break;
                //     case "SOCKT_SAVE_QUALIFIER":
                //         this.Send(SendMessageType.SAVE_QUALIFIER, action.payload)
                //         break;
                // }
                return next(action);
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    // private Send(tp: SendMessageType, payload: any) {
    //     this.connection.send(JSON.stringify({ type: tp, obj: payload })) //  TODO review the server payload
    // }

    private Reconnect() {
        clearTimeout(this.timeHandler);
        this.timeHandler = setTimeout(() => this.Connect(), RECONNECTION_TIME);
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

    private SocketInvoked(ev: IProtocolEncap) {

        //  TODO review this logic
        // switch (ev.Enum) {
        //     case ReceiveMessageType.EVENT_HANDSHAKE:
        //         this.MainStore.dispatch({ type: 'CHECK_HANDSHAKE', receivedObj: ev as IProtocolEncap } as MovieStore.KnownAction)
        //         break;
                
        //     case ReceiveMessageType.EVENT_UPDATE:
        //         this.MainStore.dispatch({ type: 'UPDATE_PAGE', event: ev.Events as MovieStore.IPinnyEvent } as MovieStore.KnownAction)
        //         break;
            
        //     case ReceiveMessageType.EVENT_BET:
        //         DisplayPinnacleResponseFromWebsockets(JSON.stringify(ev.Events));
        //         break;

        //     default:
        //         ToasterAlertFailed('Unknown received type');
        // }

        //  this.MainStore.dispatch({ type: 'UPDATE_PAGE', event: ev.Events as EventStore.IPinnyEvent } as EventStore.KnownAction);
    }
}

export enum ConnStatus {
    ERROR,
    CONNECTED,
    DISCONNECTED
}

export interface IProtocolEncap {
    Enum: number;
    Enums: IEnums;
    Events: any;
    LastUpdate: string;
}

export interface IEnums {
    ServerSendMessage: IEnumDictionary[];
    ServerReceiveMessage: IEnumDictionary[];
}

export interface IEnumDictionary {
    key: string;
    value: number;
}