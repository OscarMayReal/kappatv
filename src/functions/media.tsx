import { FocusNode } from "@please/lrud"
import { PlayIcon, PauseIcon, RewindIcon, FastForwardIcon, FullscreenIcon, SpeakerIcon, VolumeOffIcon, Volume2Icon, MinimizeIcon } from "lucide-react"
import { useEffect, useRef } from "react"
import { useState } from "react"

function MediaPlayerButton({onClick, Icon, id}: {onClick: () => void, Icon: React.JSX.ElementType, id: string}) {
    return (
        <FocusNode focusId={id} className="mediaplayercontrol" orientation="horizontal" onSelected={onClick}>
            <Icon />
        </FocusNode>
    )
}

export function MediaPlayer({url, title}: {url: string, title: string}) {
    var videoRef = useRef<HTMLVideoElement>(null);
    var [isFilled, setIsFilled] = useState(false);
    var [isControlsVisible, setIsControlsVisible] = useState(true);
    return (
        <div className="mediaplayerbase">
            <video ref={videoRef} className="mediaplayervideo" autoPlay src={url} style={{objectFit: isFilled ? 'cover' : 'contain'}}></video>
            <div className="mediaplayercontrols" style={{opacity: isControlsVisible ? 1 : 0}}>
                <div className="videotitlearea">
                    <div className="videotitle">{title}</div>
                </div>
                <div style={{flexGrow: 1}}></div>
                <MediaControls isControlsVisible={isControlsVisible} setIsControlsVisible={setIsControlsVisible} videoRef={videoRef} />
            </div>
        </div>
    )
}

function MediaControls({isControlsVisible, setIsControlsVisible, videoRef}: {isControlsVisible: boolean, setIsControlsVisible: (visible: boolean) => void, videoRef: React.RefObject<HTMLVideoElement>}) {
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener('play', () => {setIsPlaying(true); setTimeout(() => {createHideTimeout();}, 100);});
            videoRef.current.addEventListener('pause', () => {setIsPlaying(false); setTimeout(() => {createHideTimeout();}, 100);});
            videoRef.current.addEventListener('volumechange', () => {setIsMuted(videoRef.current?.muted); setTimeout(() => {createHideTimeout();}, 100);});
        }
    }, [videoRef]);
    var [isFilled, setIsFilled] = useState(false);
    var [isMuted, setIsMuted] = useState(false);
    var [isPlaying, setIsPlaying] = useState(true);
    if (isFilled && videoRef.current) {
        videoRef.current.style.objectFit = 'cover';
    } else if (videoRef.current) {
        videoRef.current.style.objectFit = 'contain';
    }

    var hideTimeout: NodeJS.Timeout;

    var createHideTimeout = () => {
        clearTimeout(hideTimeout);
        setIsControlsVisible(true)
        if (videoRef.current?.paused == false) {
            hideTimeout = setTimeout(() => {
                setIsControlsVisible(false);
            }, 5000);
        }
    }

    return (
        <FocusNode focusId="mediaplayercontrolsrow" className="mediaplayercontrolsrow" orientation="horizontal" onArrow={createHideTimeout}>
            <div style={{flexGrow: 1}}></div>
            <MediaPlayerButton onClick={() => {setIsFilled(!isFilled)}} Icon={isFilled ? MinimizeIcon : FullscreenIcon} id="zoom" />
            <MediaPlayerButton onClick={() => {videoRef.current.currentTime -= 10}} Icon={RewindIcon} id="rewind" />
            <MediaPlayerButton onClick={() => {isPlaying ? videoRef.current?.pause() : videoRef.current?.play()}} Icon={isPlaying ? PauseIcon : PlayIcon} id="playpause" />
            <MediaPlayerButton onClick={() => {videoRef.current.currentTime += 10}} Icon={FastForwardIcon} id="forward" />
            <MediaPlayerButton onClick={() => {videoRef.current.muted = !videoRef.current?.muted}} Icon={isMuted ? VolumeOffIcon : Volume2Icon} id="speaker" />
            <div style={{flexGrow: 1}}></div>
        </FocusNode>
    )
}