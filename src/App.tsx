import './App.css'
import { FocusNode, useActiveNode, useFocusHierarchy, useLeafFocusedNode, useSetFocus } from '@please/lrud';
import type { FocusEvent, LRUDEvent } from '@please/lrud/dist/types';
import { HomeIcon, SettingsIcon, LibraryIcon, UserIcon, LayoutGridIcon, StoreIcon, SearchIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

var MenuItem = ({ id, onClick, title, Icon, setCurrentPage }: { id: string, onClick: () => void, title: string, Icon: React.JSX.ElementType, setCurrentPage: (page: string) => void }) => {
  var currentNode = useLeafFocusedNode();
  var [ownFocused, setOwnFocused] = useState(false);
  var setFocused = useSetFocus();
  return (
    // console.log('focused ' + id),
    // console.log('currentNode ' + currentNode?.elRef.current?.className.includes('menuitem')),
    <FocusNode focusId={"menuitem_" + id} className={'menuitem' + (ownFocused ? ' isCurrent' : '')} onRight={() => {
      setOwnFocused(true)
      window.wasMenuFocused = false;
    }} onUp={() => {
      setOwnFocused(false)
    }} onDown={() => {
      setOwnFocused(false)
    }} onKey={() => {
      setCurrentPage("menuitem_" + id);
    }} onSelected={() => {onClick(); setFocused("mainfocusnode"); setOwnFocused(true); window.wasMenuFocused = false;}}>
      <Icon style= {{flexShrink: 0}} />
      <div className='menuitemtitle'>{title}</div>
    </FocusNode>
  )
}

var MenuSidebar = () => {
  var currentNode = useFocusHierarchy();
  var setFocused = useSetFocus();
  var [currentPage, setCurrentPage] = useState("menuitem_home");
  if (currentNode.find((node: any) => node.focusId === "menu") && !window.wasMenuFocused) {
    console.log("menu focused");
    console.log(currentPage);
    setFocused(currentPage);
    window.wasMenuFocused = true;
  }
  
  return (
    <FocusNode focusId="menu" className="menu" orientation="vertical" onLeft={() => {
      window.wasMenuFocused = false;
    }}>
      <div className='menuinner'>
        <MenuItem id="profile" onClick={() => console.log('profile')} title="Profile" Icon={UserIcon} setCurrentPage={setCurrentPage} />
        <div style={{ flexGrow: 1 }} />
        <MenuItem id="search" onClick={() => console.log('search')} title="Search" Icon={SearchIcon} setCurrentPage={setCurrentPage} />
        <MenuItem id="home" onClick={() => console.log('home')} title="Home" Icon={HomeIcon} setCurrentPage={setCurrentPage} />
        <MenuItem id="apps" onClick={() => console.log('apps')} title="Apps" Icon={LayoutGridIcon} setCurrentPage={setCurrentPage} />
        <MenuItem id="library" onClick={() => console.log('library')} title="Library" Icon={LibraryIcon} setCurrentPage={setCurrentPage} />
        <MenuItem id="store" onClick={() => console.log('store')} title="Store" Icon={StoreIcon} setCurrentPage={setCurrentPage} />
        <div style={{ flexGrow: 1 }} />
        <MenuItem id="settings" onClick={() => console.log('settings')} title="Settings" Icon={SettingsIcon} setCurrentPage={setCurrentPage} />
      </div>
    </FocusNode>
  )
}

var AppItem = ({id, onClick, title, Icon}: {id: string, onClick: () => void, title: string, Icon: React.JSX.ElementType}) => {
  return (
    <FocusNode focusId={"appitem_" + id} className='appitem' onSelected={() => {onClick();}} onFocused={(e: FocusEvent) => {
      console.log(e.focusNode?.elRef.current);
      e.focusNode?.elRef.current?.scrollIntoView({ behavior: 'smooth' });
    }}>
      <Icon style= {{flexShrink: 0}} />
      <div className='menuitemtitle'>{title}</div>
    </FocusNode>
  )
}

var AppRow = () => {
  var appRow = useRef<HTMLDivElement>(null);
  return (
    <FocusNode orientation="horizontal">
      <div className='approwtitle'>
        <LayoutGridIcon style={{flexShrink: 0}} />
        <div>Apps</div>
      </div>
      <div className='approw' ref={appRow}>
        <AppItem id="app1" onClick={() => console.log('app1')} title="App 1" Icon={LayoutGridIcon}/>
        <AppItem id="app2" onClick={() => console.log('app2')} title="App 2" Icon={LayoutGridIcon}/>
        <AppItem id="app3" onClick={() => console.log('app3')} title="App 3" Icon={LayoutGridIcon}/>
        <AppItem id="app4" onClick={() => console.log('app4')} title="App 4" Icon={LayoutGridIcon}/>
        <AppItem id="app5" onClick={() => console.log('app5')} title="App 5" Icon={LayoutGridIcon}/>
        <AppItem id="app6" onClick={() => console.log('app6')} title="App 6" Icon={LayoutGridIcon}/>
        <AppItem id="app7" onClick={() => console.log('app7')} title="App 7" Icon={LayoutGridIcon}/>
        <AppItem id="app8" onClick={() => console.log('app8')} title="App 8" Icon={LayoutGridIcon}/>
        <AppItem id="app9" onClick={() => console.log('app9')} title="App 9" Icon={LayoutGridIcon}/>
      </div>
    </FocusNode>
  )
}

var MainBanner = () => {
  return (
    <FocusNode className='mainbanner'>
      
    </FocusNode>
  )
}


function App() {
  window.wasMenuFocused = false;
  return (
    <FocusNode orientation="horizontal" className="mainrow">
      <MenuSidebar />
      <FocusNode orientation="vertical" className='mainfocusnode' focusId='mainfocusnode'>
        <MainBanner />
        <AppRow />
      </FocusNode>
    </FocusNode>
  )
}

export default App
