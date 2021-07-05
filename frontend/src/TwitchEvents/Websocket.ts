export class WebSocketClient {
    private readonly url: string;
    private instance: WebSocket | undefined;
    private messageCount = 0;
    public autoReconnectInterval = 5 * 1000;

    public onOpen: (this: WebSocket, event: Event) => any = event => {
        console.log(event);
    }

    public onMessage: (event: MessageEvent, number: Number) => any = event => {
        console.log(event);
    }

    public onClose: (event: CloseEvent) => any = event => {
        console.log(event);
    }

    public onError: (event: Event) => any = event => {
        console.error(event);
    }

    constructor(url: string) {
        this.url = url;
        this.open();
    }

    private reconnect() {
        setTimeout(() => {
           console.log("Reconnecting websocket...");
           this.open();
        }, this.autoReconnectInterval);
    }

    public open() {
        try {
            const webSocket = new WebSocket(this.url);
            this.instance = webSocket;

            webSocket.onopen = this.onOpen;

            webSocket.onmessage = event => {
                this.messageCount++;
                this.onMessage(event, this.messageCount);
            }

            webSocket.onclose = event => {
                this.reconnect();
                this.onClose(event);
            }

            webSocket.onerror = event => {
                switch (event.type) {
                    case 'ECONNREFUSED':
                        console.log(`WebSocketClient: retry in ${this.autoReconnectInterval}ms`, event);
                        this.reconnect();
                        break;
                    default:
                        this.onError(event);
                        break;
                }
            }
        }
        catch (error){
            return this.reconnect();
        }
    }

    public send(data: Parameters<WebSocket["send"]>[0]) {
        if(this.instance !== undefined){
            try {
                this.instance.send(data);
            }
            catch (error)
            {
                this.onError(error);
            }
        }
    }
}