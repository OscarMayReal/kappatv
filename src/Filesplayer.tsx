import { FolderIcon, PlaySquareIcon, RotateCwIcon, XIcon } from "lucide-react";
import { SidebarView } from "./components/SidebarView";
import { useState } from "react";
import {ListItem, List} from "./components/List";
import { Header, HeaderItem } from "./components/header";
import { useActiveProfile } from "./functions/profile";
import { MediaPlayer } from "./functions/media";

var loadFiles = (path: string) => {
    return new Promise((resolve, reject) => {
        var fs = window.require('fs');
        var files = fs.readdirSync("media/" + path);
        var filedata: any[] = [];
        files.forEach((file) => {
            var stats = fs.statSync("media/" + path + '/' + file);
            filedata.push({
                name: file,
                size: stats.size,
                isDirectory: stats.isDirectory(),
            });
        });
        resolve(filedata);
    });
}

var openFile = (path: string) => {
    return new Promise((resolve, reject) => {
        var fs = window.require('fs');
        var file = fs.readFileSync("media/" + path);
        resolve(file);
    });
}

var useOpenFile = (path: string) => {
    var [file, setFile] = useState({loaded: false, reload: () => {}, data: null});
    if (!file.loaded) {
        openFile(path).then((file) => {
            setFile({loaded: true, reload: () => {}, data: file});
        });
    }
    return file;
}

var useFiles = (path: string) => {
    var reload = () => {
        setFiles({loaded: false, reload: true, data: []});
    }
    var [files, setFiles] = useState({loaded: false, reload: reload, data: []});
    if (!files.loaded) {
        loadFiles(path).then((files) => {
            setFiles({loaded: true, reload: reload, data: files});
        });
    }
    return files;
}

var FilesPage = ({setZone, setCurrentFile}: {setZone: (zone: string) => void, setCurrentFile: (file: string) => void}) => {
    var files = useFiles("./");
    var profile = useActiveProfile();
    return (
        <div>
            <Header title={"Files For " + profile.profile.name || "Profile"} Icon={FolderIcon}>
                <HeaderItem id="reload" onClick={files.reload} Icon={RotateCwIcon} />
            </Header>
            <List>
                {files.data.map((file) => {
                    return <ListItem key={file.name} name={file.name} id={file.name} Icon={file.isDirectory ? FolderIcon : PlaySquareIcon} onClick={() => {setCurrentFile(file.name); setZone("mediaplayer")}} />
                })}
            </List>
        </div>
    )
}

var MediaPlayerView = ({CurrentFile}: {CurrentFile: string}) => {
    var file = useOpenFile(CurrentFile);
    return (
        <div style={{width: "100%", height: "100%"}}><MediaPlayer url={file.data} title={CurrentFile} /></div>
    )
}

export function FilesPlayer() {
    var [zone, setZone] = useState("files");
    var [CurrentFile, setCurrentFile] = useState(null);
    document.onkeydown = (e) => {
        if (e.key === 'Escape') {
            if (zone === "mediaplayer") {
                setZone("files");
            }
        }
    }
    return (
        zone === "files" ? <SidebarView items={[
            { id: 'flexgrow2', type: 'flexgrow' },
            { id: 'files', onClick: () => console.log('files'), title: 'Files', Icon: FolderIcon, page: <FilesPage setZone={setZone} setCurrentFile={setCurrentFile} /> },
            { id: 'files2', onClick: () => console.log('files2'), title: 'Files2', Icon: PlaySquareIcon, page: <div>test2</div> },
            { id: 'flexgrow', type: 'flexgrow' },
            { id: 'exit', onClick: () => close(), title: 'Exit', Icon: XIcon, page: <div>test2</div> },
        ]} /> : <MediaPlayerView CurrentFile={CurrentFile} />
    )
}