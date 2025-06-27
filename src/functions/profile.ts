import { useState } from "react";

export var useActiveProfile = () => {
    var [profile, setProfile] = useState({loaded: false, profile: {}});
    
    if (!profile.loaded) {
        fetch("/api/profiles/getactive").then((res) => {
            res.json().then((data) => {
                setProfile({loaded: true, profile: data});
            });
        });
    }
    
    return profile;
}