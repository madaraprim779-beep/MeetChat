let localStream;
let pc;

const config = {
iceServers:[{urls:"stun:stun.l.google.com:19302"}]
};

async function startCall(){

localStream = await navigator.mediaDevices.getUserMedia({
video:true,
audio:true
});

local.srcObject = localStream;

pc = new RTCPeerConnection(config);

localStream.getTracks().forEach(t=>pc.addTrack(t,localStream));

pc.ontrack = e=>{
remote.srcObject = e.streams[0];
};

let offer = await pc.createOffer();
await pc.setLocalDescription(offer);

console.log("OFFER:", offer);
}

function hangUp(){
pc?.close();
localStream?.getTracks().forEach(t=>t.stop());
}