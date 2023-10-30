class PeerService {
    constructor() {
        if (!this.peer) {
            this.peer = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: [
                            "stun:stun.l.google.com:19302",
                            "stun:global.stun.twilio.com:3478",
                            "stun:stun.relay.metered.ca:80"
                        ],
                    },
                    {
                        urls: "turn:a.relay.metered.ca:80",
                        username: "80d2b028c276c74db8cebabd",
                        credential: "khIt4lli1MtwATFT",
                    },
                    {
                        urls: "turn:a.relay.metered.ca:80?transport=tcp",
                        username: "80d2b028c276c74db8cebabd",
                        credential: "khIt4lli1MtwATFT",
                    },
                    {
                        urls: "turn:a.relay.metered.ca:443",
                        username: "80d2b028c276c74db8cebabd",
                        credential: "khIt4lli1MtwATFT",
                    },
                    {
                        urls: "turn:a.relay.metered.ca:443?transport=tcp",
                        username: "80d2b028c276c74db8cebabd",
                        credential: "khIt4lli1MtwATFT",
                    },

                ],
            });
        }
    }

    async getAnswer(offer) {
        if (this.peer) {
            await this.peer.setRemoteDescription(offer);
            const ans = await this.peer.createAnswer();
            await this.peer.setLocalDescription(new RTCSessionDescription(ans));
            return ans;
        }
    }

    async setLocalDescription(ans) {
        if (this.peer) {
            await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
        }
    }

    async getOffer() {
        if (this.peer) {
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(new RTCSessionDescription(offer));
            return offer;
        }
    }
}

export default new PeerService();
