const APP_ID = "297c5fbb6d9e4f04879b4a767ce59a9f"
const CHANNEL = "main"
const TOKEN = "007eJxTYPiwKu7XdndT6xO8y8/a7pP7766sfPDAFAuTU0nbYu5KnmBXYDCyNE82TUtKMkuxTDVJMzCxMLdMMkk0NzNPTjW1TLRME3n4IbkhkJFBiXcuIyMDBIL4LAy5iZl5DAwAc00fjA=="
let UID;

console.log("stream.js connected")
const client = AgoraRTC.createClient({
    mode : 'rtc',
    codec : 'vp8'
})

let localTracks = []
let remoteUsers = {}

function test()
{
    console.log("joined proper")
}

let joinAndDisplayLocalStream = async () => {

    client.on('user-published', handleUserJoined );

    UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper">
                        <span class="user-name">My Name </span>
                    </div>
                    <div class="video-player" id="user-${UID}">

                    </div>
                </div>`;

    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`);

    await client.publish([localTracks[0], localTracks[1]]);
}



let handleUserJoined = async (user, modiaType) =>{
    console.log('check it in a proper way')
    console.log("fuck",user.uid,mediaType)
    remoteUsers[user.uid] = user
    await client.subscribe(user, modiaType);

    if(mediaType === 'video')
    {
        let player = document.getElementById(`user-container-${user.uid}`)
        
        if(player != null)
        {
            player.remove()
        }

        player = `<div class="video-container" id="user-container-${user.uid}">
                    <div class="username-wrapper">
                        <span class="user-name">My Name </span>
                    </div>
                    <div class="video-player" id="user-${user.uid}">

                    </div>
                </div>`;

        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

        user.videoTrack.play(`user-${user.uid}`)

        if(mediaType === 'audio')
        {
            user.audioTrack.play();
        }
    }
}

joinAndDisplayLocalStream()