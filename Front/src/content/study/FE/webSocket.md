---
title: "webSocket"
desc: "실제 사용 사례와 함께 돌아보는 webSocket"
emotion: "🚏"
---

## 왜 이 주제를 선택하게 되었는지

https://github.com/LoveSoongAlarm/love-soong-alarm-Web

https://www.instagram.com/love_soong_alarm/

근 한달 전쯤에 대학교 축제에서 실 사용하는 사용자 매칭 어플을 제작한 적이 있습니다.

해당 어플을 간단히 소개하자면, 자신 근처 50m 안에 있는 이성 중 랜덤으로 매칭하여 **채팅**할 수 있게끔 하는 어플입니다.

채팅을 처음 구현해보며, webSocket 을 다룬 기억이 휘발되기 전에

다른 분들과 인사이트를 공유하고 싶어서 이 주제를 선택하게 되었습니다.

저는 어떤 식으로 webSocket을 사용해서 채팅을 구현했고, 진행 간에 애로사항은 어떤 것이 있었는지 공유해보려 합니다.

## 개념

<aside>
💡

**Socket 이란?**

- 다른 사용자와 연결할 수 있도록 열어두는 문 ( 창구 )
</aside>

웹 연결에서 기본이 되는 TCP / IP 또한 소켓을 통한 통신인 것처럼

우리는 알게 모르게 항상 socket을 이용해 통신을 하고 있습니다.

webSocket 또한 그 원리와 구동 방식이 크게 다르지 않습니다.

![image.png](attachment:901bda9e-1641-4cd0-a65c-35d23f882c63:image.png)

사용자는 socket 서버에 연결을 요청하고 서버가 응답한 뒤 사용자를 받아줍니다.

그러면 해당 서버와 사용자는 소켓이 연결되어 있는 동안 실시간 통신이 가능합니다.

이를 통해 우리가 흔히 아는 채팅과 실시간 스트리밍을 구현합니다.

저희가 구현한 방식은 1:1 채팅방에 PK 값으로 **Ticket** 이란 추상적인 개념을 대입했습니다.

특정 사용자가 누군가에게 채팅을 보내면 해당 Ticket 값을 활용하여

서버를 구독하고 있는 상대방에게 데이터가 전달되도록 하는 방식입니다.

---

### 서버와 통신하기

소켓이 정상적으로 만들어지고 나서 부터는 네 개의 이벤트를 통해 서버와 통신합니다.

<aside>
💡

`open` : 커넥션이 제대로 만들어졌을 때 발생 ( 초기에 발생 )

`message` : 데이터를 수신하였을 때 발생

`error` : 에러가 생겼을 때 발생

`close` : 커넥션이 종료되었을 때 발생

</aside>

만약 사용자가 서버에 무언가를 보내고 싶다면 간단하게 `send` 만 하면 됩니다.

```jsx
const ws = new WebSocket(url);
ws.send("hi");
```

---

### 실제 사용 코드

가장 처음 생각해야 하는 부분은 언제 소켓에 연결하는지 입니다.

언제부터 사용이 되어야 하는지를 고려해서 최대한 소켓 연결을 늦추는게 중요했습니다.

![image.png](attachment:739b8d91-456c-4235-aedf-ba0f412694fd:image.png)

소켓 연결을 다루는 Layout을 따로 빼서 튜토리얼과 온보딩 페이지에서는 접근하지 못하도록 했습니다.

```jsx
const ws = new WebSocket(url);
```

기본적으로 JS에서 제공하는 WebSocket 라이브러리를 이용해서 url에 연결하면

저와 서버가 연결된 소켓이 생성됩니다.

이제 위에서 언급한 네 개의 이벤트와 `send` 를 통해 서버와 통신하면 됩니다.

```json
{
  "type": "CONNECTION_SUCCESS",
  "userId": 1,
  "userNickname": "사용자A",
  "timestamp": "2025-09-11T00:47:05.2649011",
  "message": "WebSocket 연결이 성공했습니다."
}
```

저희는 구현할 때, `type` 이란 attribute를 두어서 서버에서 받는 메세지들을 분류했습니다.

위의 JSON 구조는 실제 채팅 구현할 때 데이터 중 하나입니다.

```jsx
const { sendMessage } = useReliableSocket(urlFactory, {
  onOpen: () => {
    for (const id of activeRoomsRef.current) {
      sendMessage({ type: "SUBSCRIBE", chatRoomId: id });
    }
  },

  onMessage: (data) => {
    switch (data.type) {
      case "CONNECTION_SUCCESS":
        return handleConnectionSuccess();
      case "UNREAD_BADGE_UPDATE":
        return handleUnreadBadgeUpdate(data);
      case "SUBSCRIBE":
        return handleSubscribe();
      case "UNSUBSCRIBE":
        return handleUnsubscribe();
      case "MESSAGE_READ":
        return handleMessageRead();
      case "CHAT_MESSAGE":
        return handleChatMessage();
      /* 생략 */
      case "ERROR":
        return handleError();
      default:
        return;
    }
  },

  onError: () => {},
  onClose: () => {},
});
```

아까 미리 걸어뒀던 SocketLayout 입니다.

위 코드와 같이 서버에서 받은 데이터에 대한 `type` 애 맞춰 동작을 정의해줍니다.

```jsx
const handleUnreadBadgeUpdate = (data: UnreadBadgeUpdate) => {
  if (data.totalUnreadCount) setIsChatAlarm(true);
  else setIsChatAlarm(false);
};

const handleMessageRead = () => {
  window.dispatchEvent(new CustomEvent("revalidate:chat"));
};

const handleSubscribe = () => {};

const handleUnsubscribe = () => {};

const handleChatMessage = () => {
  window.dispatchEvent(new CustomEvent("revalidate:chat"));
};

const handleExcessChat = () => {
  setExcessChat(true);
};

const handleChatListUpdate = (data: ListUpdate) => {
  setNewChats({ newChat: data });
};
```

---

## 애로사항

### 연결의 불안정

구현할 당시에는 환경은 React+Vite 에 PWA를 활용한 웹앱 입니다.

https://developer.chrome.com/blog/timer-throttling-in-chrome-88?hl=ko

![image.png](attachment:2fd0c6a1-ffc2-4100-8196-5d243b7bd6e5:image.png)

Chrome 정책중 일부를 발췌합니다.

`The page has benn silent for at least 30 seconds`

크롬의 정책상 30초 이상 언마운트 상태가 된다면 웹 소켓과 연결이 끊어지게 됩니다.

하지만 채팅 알람을 계속 받고, 채팅 중에 끊김 현상이 일어나지 않게 하기 위해선 웹 소켓 연결을 유지해야 합니다.

두 가지 방법을 생각했습니다.

1. 소켓이 연결되어 있는 동안은 백그라운드에서도 ping 을 계속 보내서 Heartbeat 유지
2. 연결이 끊어지기 전에 재연결

두 가지 방법 중에서 저희가 차용한 방법은 2번입니다.

( 시간이 촉박해서 그런건진 몰라도 첫 번째 방법을 깔끔하게 구현하기 어려웠습니다. )

```jsx
const DELAY = 20000;

const reconnect = useCallback(() => {
  cleanupTimers();

  reconnectTimer.current = window.setTimeout(() => {
    connect();
  }, DELAY);
}, []);
```

이런식으로 연결한지 20초가 지나면 타이머를 초기화하고, 현재 웹 소켓을 재연결 합니다.

이 외에도,

1. 네트워크가 끊기거나 에러일 때 재접속 트리거
2. 연결 상태가 `CONNECTING` 에서 멈춰있는 상황에 트리거
3. 화면이 보이지 않다고 사용자 가시거리에 다시 들어올 때 트리거
4. 초기 마운트 시 다시 연결

과 같이 웹 소켓 연결을 유지시키는 로직을 짜는 것이 주요 포인트였습니다.

---

## 추가 참고 코드

- C 언어로 구현한 socket
  https://github.com/mlnls/SSU-Software/tree/main/NetworkProgramming/HW02
- webRTC
  https://github.com/mlnls/Focussu-Front

  ```jsx
  // 옛적에 짠 코드라 파일 구조도 엉망이라 여기 따로 붙여둡니다!
  // 실시간 스트리밍으로 AI 모듈을 붙여 집중도 검사를 진행했던 webRTC 예시 코드입니다!

  "use client";

  import { useEffect, useRef, useState } from "react";

  import { startCam } from "@/shared/hook/function/useGetWebCam";
  import { AnalyzeStudy } from "@/shared/hook/api/useAnalysis";

  export function useWebRTCManager(
    roomId: string,
    userId: string,
    socketUrl: string
  ) {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStreams, setRemoteStreams] = useState<
      { id: string; stream: MediaStream }[]
    >([]);

    const peersRef = useRef<Record<string, RTCPeerConnection>>({});
    const pendingCandidates = useRef<Record<string, RTCIceCandidate[]>>({});
    const socketRef = useRef<WebSocket | null>(null);

    const setup = async () => {
      try {
        const { stream } = await startCam();
        setLocalStream(stream);

        const socket = new WebSocket(
          `${socketUrl}?token=${localStorage.getItem("token")}`
        );
        socketRef.current = socket;

        socket.onopen = () => {
          setTimeout(() => {
            socket.send(JSON.stringify({ type: "JOIN", roomId }));
          }, 300);
        };

        socket.onclose = () => {
          console.warn("WebSocket closed. Attempting reconnect in 3s...");
          setTimeout(setup, 3000);
        };

        socket.onmessage = async (event) => {
          const msg = JSON.parse(event.data);

          switch (msg.type) {
            case "NEW_PEER": {
              const peerId = msg.payload.from;
              if (peersRef.current[peerId]) return;

              const peer = createPeer(peerId);
              peersRef.current[peerId] = peer;
              stream.getTracks().forEach((track) => peer.addTrack(track, stream));

              const offer = await peer.createOffer();
              await peer.setLocalDescription(offer);
              socket.send(
                JSON.stringify({
                  type: "OFFER",
                  roomId,
                  to: peerId,
                  payload: { offer: peer.localDescription },
                })
              );
              break;
            }

            case "OFFER": {
              const from = msg.payload.from;
              if (peersRef.current[from]) peersRef.current[from].close();

              const peer = createPeer(from);
              peersRef.current[from] = peer;
              stream.getTracks().forEach((track) => peer.addTrack(track, stream));

              await peer.setRemoteDescription(
                new RTCSessionDescription(msg.payload.offer)
              );
              const answer = await peer.createAnswer();
              await peer.setLocalDescription(answer);

              socket.send(
                JSON.stringify({
                  type: "ANSWER",
                  roomId,
                  to: from,
                  payload: { answer: peer.localDescription },
                })
              );

              if (pendingCandidates.current[from]) {
                for (const c of pendingCandidates.current[from]) {
                  await peer.addIceCandidate(c);
                }
                delete pendingCandidates.current[from];
              }
              break;
            }

            case "TICKET_CREATED": {
              const ticketNumber = msg.payload.ticketId;
              const existing = sessionStorage.getItem("ticketNumber");

              if (!existing) {
                sessionStorage.setItem("ticketNumber", ticketNumber);
              }

              break;
            }

            case "ANSWER": {
              const from = msg.payload.from;
              const peer = peersRef.current[from];
              if (
                peer?.signalingState === "have-local-offer" &&
                msg.payload.answer?.type === "answer"
              ) {
                try {
                  await peer.setRemoteDescription(
                    new RTCSessionDescription(msg.payload.answer)
                  );
                } catch (err) {
                  console.error("setRemoteDescription failed", err);
                }
              }
              if (pendingCandidates.current[from]) {
                for (const c of pendingCandidates.current[from]) {
                  await peer.addIceCandidate(c);
                }
                delete pendingCandidates.current[from];
              }
              break;
            }

            case "CANDIDATE": {
              const from = msg.payload.from;
              const candidate = new RTCIceCandidate(msg.payload.candidate);
              const peer = peersRef.current[from];

              if (peer?.remoteDescription) {
                await peer.addIceCandidate(candidate);
              } else {
                if (!pendingCandidates.current[from]) {
                  pendingCandidates.current[from] = [];
                }
                pendingCandidates.current[from].push(candidate);
              }
              break;
            }

            case "PEER_LEFT": {
              const peerLeft = msg.payload.from;
              peersRef.current[peerLeft]?.close();
              delete peersRef.current[peerLeft];
              setRemoteStreams((prev) => prev.filter((s) => s.id !== peerLeft));
              break;
            }
          }
        };
      } catch (err) {
        console.error("WebRTC setup failed", err);
      }
    };

    useEffect(() => {
      setup();

      const handleBeforeUnload = () => {
        socketRef.current?.send(JSON.stringify({ type: "LEAVE", roomId }));
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, [roomId, socketUrl]);

    const createPeer = (peerId: string) => {
      const peer = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun2.l.google.com:19302" },
          { urls: "stun:stun3.l.google.com:19302" },
          { urls: "stun:stun4.l.google.com:19302" },
        ],
      });

      peer.onicecandidate = (e) => {
        if (e.candidate) {
          socketRef.current?.send(
            JSON.stringify({
              type: "CANDIDATE",
              roomId,
              to: peerId,
              payload: { candidate: e.candidate },
            })
          );
        }
      };

      peer.ontrack = (e) => {
        const incoming = e.streams[0];
        if (!incoming || peerId === userId) return;

        setRemoteStreams((prev) => {
          const filtered = prev.filter((s) => s.id !== peerId);
          return [...filtered, { id: peerId, stream: incoming }];
        });
      };

      return peer;
    };

    const leaveRoom = async (userID: number) => {
      const ticketNumber = Number(sessionStorage.getItem("ticketNumber"));
      if (!ticketNumber) return;

      try {
        await AnalyzeStudy({ ticketNumber, userID });
        console.log("✅ 분석 완료 후 퇴장 처리 시작");
      } catch (err) {
        console.error("❌ 분석 실패, 퇴장 처리 건너뜀");
        return;
      }

      socketRef.current?.send(JSON.stringify({ type: "LEAVE", roomId }));
      Object.values(peersRef.current).forEach((peer) => peer.close());
      peersRef.current = {};
      setRemoteStreams([]);
      localStream?.getTracks().forEach((t) => t.stop());
      socketRef.current?.close();

      sessionStorage.removeItem("ticketNumber");
    };

    return {
      localStream,
      remoteStreams,
      leaveRoom,
    };
  }
  ```

- webSocket
  https://github.com/LoveSoongAlarm/love-soong-alarm-Web
