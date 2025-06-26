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
    }} onFocused={() => {
      if (window.wasMenuFocused) {
        setCurrentPage("menuitem_" + id);
      }
    }} onSelected={() => {onClick(); setFocused("mainfocusnode"); setOwnFocused(true); window.wasMenuFocused = false;}}>
      <Icon style= {{flexShrink: 0}} />
      <div className='menuitemtitle'>{title}</div>
    </FocusNode>
  )
}

var MenuSidebar = ({ setCurrentPage, currentPage }: { setCurrentPage: (page: string) => void, currentPage: string }) => {
  var currentNode = useFocusHierarchy();
  var setFocused = useSetFocus();
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

var AppItem = ({id, onClick, title, Icon, type}: {id: string, onClick: () => void, title: string, Icon: React.JSX.ElementType, type?: string}) => {
  return (
    <FocusNode focusId={"appitem_" + id} className={'appitem' + (type === 'apppage' ? ' apppageitem' : '')} onSelected={() => {onClick();}} onFocused={(e: FocusEvent) => {
      console.log(e.focusNode?.elRef.current);
      e.focusNode?.elRef.current?.scrollIntoView({ behavior: 'smooth' });
    }}>
      <Icon style= {{flexShrink: 0}} />
      <div className='menuitemtitle'>{title}</div>
    </FocusNode>
  )
}

var HomePage = () => {
  return (
    <FocusNode orientation="vertical" className='mainfocusnode' focusId='mainfocusnode'>
      <MainBanner />
      <AppRow />
    </FocusNode>
  )
}

var AppsPage = () => {
  return (
    <FocusNode orientation="vertical" className='mainfocusnode' focusId='mainfocusnode'>
      <div style={{ height: '5px' }}></div>
      <AppPageGrid />
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

var appItems = [
  { id: 'app1', onClick: () => console.log('app1'), title: 'App 1', Icon: LayoutGridIcon },
  { id: 'app2', onClick: () => console.log('app2'), title: 'App 2', Icon: LayoutGridIcon },
  { id: 'app3', onClick: () => console.log('app3'), title: 'App 3', Icon: LayoutGridIcon },
  { id: 'app4', onClick: () => console.log('app4'), title: 'App 4', Icon: LayoutGridIcon },
  { id: 'app5', onClick: () => console.log('app5'), title: 'App 5', Icon: LayoutGridIcon },
  { id: 'app6', onClick: () => console.log('app6'), title: 'App 6', Icon: LayoutGridIcon },
  { id: 'app7', onClick: () => console.log('app7'), title: 'App 7', Icon: LayoutGridIcon },
  { id: 'app8', onClick: () => console.log('app8'), title: 'App 8', Icon: LayoutGridIcon },
  { id: 'app9', onClick: () => console.log('app9'), title: 'App 9', Icon: LayoutGridIcon },
  { id: 'app10', onClick: () => console.log('app10'), title: 'App 10', Icon: LayoutGridIcon },
  { id: 'app11', onClick: () => console.log('app11'), title: 'App 11', Icon: LayoutGridIcon },
  { id: 'app12', onClick: () => console.log('app12'), title: 'App 12', Icon: LayoutGridIcon },
  { id: 'app13', onClick: () => console.log('app13'), title: 'App 13', Icon: LayoutGridIcon },
  { id: 'app14', onClick: () => console.log('app14'), title: 'App 14', Icon: LayoutGridIcon },
  { id: 'app15', onClick: () => console.log('app15'), title: 'App 15', Icon: LayoutGridIcon },
  { id: 'app16', onClick: () => console.log('app16'), title: 'App 16', Icon: LayoutGridIcon },
  { id: 'app17', onClick: () => console.log('app17'), title: 'App 17', Icon: LayoutGridIcon },
  { id: 'app18', onClick: () => console.log('app18'), title: 'App 18', Icon: LayoutGridIcon },
  { id: 'app19', onClick: () => console.log('app19'), title: 'App 19', Icon: LayoutGridIcon },
  { id: 'app20', onClick: () => console.log('app20'), title: 'App 20', Icon: LayoutGridIcon },
];

var AppPageRow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemsPerRow, setItemsPerRow] = useState(1);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateItemsPerRow = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const containerWidth = container.clientWidth;
      const itemWidth = 180;
      const gap = 30;
      
      const calculatedItems = Math.max(1, Math.floor((containerWidth - 75) / (itemWidth + gap)));
      
      setItemsPerRow(calculatedItems);
    };
    
    updateItemsPerRow();
    
    const resizeObserver = new ResizeObserver(updateItemsPerRow);
    resizeObserver.observe(containerRef.current);
    
    return () => resizeObserver.disconnect();
  }, []);
  
  const rows = [];
  for (let i = 0; i < appItems.length; i += itemsPerRow) {
    rows.push(appItems.slice(i, i + itemsPerRow));
  }
  
  return (
    <div ref={containerRef}>
      {rows.map((rowItems, rowIndex) => (
        <FocusNode key={rowIndex} className='apppagerow'>
          {rowItems.map((item) => (
            <AppItem
              key={item.id}
              id={item.id}
              onClick={item.onClick}
              title={item.title}
              Icon={item.Icon}
              type="apppage"
            />
          ))}
        </FocusNode>
      ))}
    </div>
  );
};

var AppPageGrid = () => {
  return (
    <FocusNode isGrid={true}>
      <div className='approwtitle'>
        <LayoutGridIcon style={{flexShrink: 0}} />
        <div>Apps</div>
      </div>
      <AppPageRow />
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
  var [currentPage, setCurrentPage] = useState("menuitem_home");
  return (
    <FocusNode orientation="horizontal" className="mainrow">
      <MenuSidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      {currentPage === "menuitem_home" ? <HomePage /> : currentPage === "menuitem_apps" ? <AppsPage /> : <div>Other Page</div>}
    </FocusNode>
  )
}

export default App
