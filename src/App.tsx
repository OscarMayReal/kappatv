import './App.css'
import { FocusNode, useActiveNode, useFocusHierarchy, useLeafFocusedNode, useSetFocus } from '@please/lrud';
import type { FocusEvent, LRUDEvent } from '@please/lrud/dist/types';
import { HomeIcon, SettingsIcon, LibraryIcon, UserIcon, LayoutGridIcon, StoreIcon, SearchIcon, PlaySquareIcon, Tv2Icon, BellIcon } from 'lucide-react';
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

var launchApp = ({url, useragent}: {url: string, useragent?: string}) => {
  console.log("launchapp");
  fetch('/api/launchapp/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
    },
    body: JSON.stringify({ url, useragent }),
  });
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
    <FocusNode focusId={"appitem_" + id} className={'appitem' + (type === 'apppage' ? ' apppageitem' : '')} onSelected={onClick} onFocused={(e: FocusEvent) => {
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
      <HomeHeader />
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
        {appItems.map((appItem) => (
          <AppItem key={appItem.id} {...appItem} />
        ))}
      </div>
    </FocusNode>
  )
}

var appItems = [
  { id: 'com.googlr.youtube.leanback', onClick: () => launchApp({url: 'https://www.youtube.com/tv', useragent: 'Mozilla/5.0 (PS4; Leanback Shell) Gecko/20100101 Firefox/65.0 LeanbackShell/01.00.01.75 Sony PS4/ (PS4, , no, CH)'} as any), title: 'Youtube Leanback', Icon: PlaySquareIcon },
];

var HomeHeader = () => {
  return (
    <FocusNode focusId="homeheader" className="homeheader" orientation="horizontal">
      <div className='homeheadertitle'>
        <Tv2Icon style={{flexShrink: 0}} />
        <div>KappaTV</div>
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <FocusNode focusId="homesearchbox" className="homesearchbox">
        <SearchIcon style={{flexShrink: 0}} />
        <div>Search</div>
      </FocusNode>
      <div style={{ flexGrow: 1 }}></div>
      <FocusNode focusId="headernotificationicon" className="headericon">
        <BellIcon style={{flexShrink: 0}} />
      </FocusNode>
      <FocusNode focusId="headerprofileicon" className="headericon">
        <UserIcon style={{flexShrink: 0}} />
      </FocusNode>
      <div style={{ width: '50px' }}></div>
    </FocusNode>
  )
}

var AppPageRow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemsPerRow, setItemsPerRow] = useState(1);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateItemsPerRow = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const containerWidth = container.clientWidth;
      const itemWidth = 220;
      const gap = 30;
      
      const calculatedItems = Math.max(1, Math.floor((containerWidth - 75) / (itemWidth + gap)) + 1);
      
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

  var remainingItems = 0;

  if (rows.length < itemsPerRow) {
    remainingItems = itemsPerRow - rows[rows.length - 1].length;
  }
    
  console.log("remainingItems: " + remainingItems);
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
          {rowIndex === rows.length - 1 && Array.from({ length: remainingItems }, (_, index) => (
            <div key={index} style={{ width: '180px', height: '120px'}} />
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
