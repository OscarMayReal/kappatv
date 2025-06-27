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

var FilesPage = () => {
    var files = useFiles("./");
    var profile = useActiveProfile();
    return (
        <div>
            <Header title={"Files For " + profile.profile.name || "Profile"} Icon={FolderIcon}>
                <HeaderItem id="reload" onClick={files.reload} Icon={RotateCwIcon} />
            </Header>
            <List>
                {files.data.map((file) => {
                    return <ListItem key={file.name} name={file.name} id={file.name} Icon={file.isDirectory ? FolderIcon : PlaySquareIcon} />
                })}
            </List>
        </div>
    )
}

export function FilesPlayer() {
    return (
        <SidebarView items={[
            { id: 'flexgrow2', type: 'flexgrow' },
            { id: 'files', onClick: () => console.log('files'), title: 'Files', Icon: FolderIcon, page: <FilesPage /> },
            { id: 'files2', onClick: () => console.log('files2'), title: 'Files2', Icon: PlaySquareIcon, page: <MediaPlayer url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" /> },
            { id: 'flexgrow', type: 'flexgrow' },
            { id: 'exit', onClick: () => close(), title: 'Exit', Icon: XIcon, page: <div>test2</div> },
        ]} />
    )
}