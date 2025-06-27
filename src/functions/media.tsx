import { FocusNode } from "@please/lrud"
import { PlayIcon, PauseIcon, RewindIcon, FastForwardIcon, FullscreenIcon, SpeakerIcon } from "lucide-react"
import { useRef } from "react"
import { useState } from "react"

export function showMediaPlayer() {
    return (
        <MediaPlayer url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
    )
}

function PlayPauseButton({onPlay, onPause}: {onPlay: () => void, onPause: () => void}) {
    var [isPlaying, setIsPlaying] = useState(true);
    return (
        <FocusNode focusId="mediaplayercontrol" className="mediaplayercontrol" orientation="horizontal" onSelected={() => {
            setIsPlaying(!isPlaying);
            if (isPlaying) {
                onPause();
            } else {
                onPlay();
            }
        }}>
            {isPlaying ? (
                <PauseIcon />
            ) : (
                <PlayIcon />
            )}
        </FocusNode>
    )
}

function MediaPlayerButton({onClick, Icon, id}: {onClick: () => void, Icon: React.JSX.ElementType, id: string}) {
    return (
        <FocusNode focusId={id} className="mediaplayercontrol" orientation="horizontal" onSelected={onClick}>
            <Icon />
        </FocusNode>
    )
}

export function MediaPlayer({url}: {url: string}) {
    var videoRef = useRef<HTMLVideoElement>(null);
    var [isFilled, setIsFilled] = useState(false);
    return (
        <div className="mediaplayerbase">
            <video ref={videoRef} className="mediaplayervideo" autoPlay src={url} style={{objectFit: isFilled ? 'cover' : 'contain'}}></video>
            <div className="mediaplayercontrols">
                <div className="mediaplayertitle">Title</div>
                <div style={{flexGrow: 1}}></div>
                <FocusNode focusId="mediaplayercontrolsrow" className="mediaplayercontrolsrow" orientation="horizontal">
                    <div style={{flexGrow: 1}}></div>
                        <MediaPlayerButton onClick={() => {setIsFilled(!isFilled)}} Icon={FullscreenIcon} id="zoom" />
                        <MediaPlayerButton onClick={() => {videoRef.current.currentTime -= 10}} Icon={RewindIcon} id="rewind" />
                        <PlayPauseButton onPlay={() => videoRef.current?.play()} onPause={() => videoRef.current?.pause()} />
                        <MediaPlayerButton onClick={() => {videoRef.current.currentTime += 10}} Icon={FastForwardIcon} id="forward" />
                        <MediaPlayerButton onClick={() => {videoRef.current.muted = !videoRef.current?.muted}} Icon={SpeakerIcon} id="speaker" />
                    <div style={{flexGrow: 1}}></div>
                </FocusNode>
            </div>
        </div>
    )
}