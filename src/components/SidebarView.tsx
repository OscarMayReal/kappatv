import { FocusNode, useFocusHierarchy, useLeafFocusedNode, useSetFocus } from "@please/lrud";
import { useState } from "react";
import { SettingsIcon } from "lucide-react";

var Sidebaritem = ({ id, onClick, title, Icon, setCurrentPage, isMenuFocused, setIsMenuFocused, currentPage }: { id: string, onClick: () => void, title: string, Icon: React.JSX.ElementType, setCurrentPage: (page: string) => void, isMenuFocused: boolean, setIsMenuFocused: (focused: boolean) => void, currentPage: string }) => {
  var currentNode = useLeafFocusedNode();
  var [ownFocused, setOwnFocused] = useState(false);
  var setFocused = useSetFocus();
  if (isMenuFocused && ownFocused) {
    setFocused("menuitem_" + id);
  }
  return (
    <FocusNode focusId={"menuitem_" + id} className={'menuitem' + (ownFocused ? ' isCurrent' : '')} onRight={() => {
      setOwnFocused(true)
      setCurrentPage("menuitem_" + id);
      setIsMenuFocused(false);
    }} onUp={() => {
      setOwnFocused(false)
    }} onDown={() => {
      setOwnFocused(false)
    }} onKey={() => {
      setCurrentPage("menuitem_" + id);
    }} onFocused={() => {
      if (isMenuFocused) {
        setCurrentPage("menuitem_" + id);
      }
    }} onSelected={() => {onClick(); setFocused("mainfocusnode"); setOwnFocused(true); setIsMenuFocused(false); }}>
      <Icon style= {{flexShrink: 0}} />
      <div className='menuitemtitle'>{title + (currentNode?.focusId === "menuitem_" + id && id == "profile" ? " (Sign Out)" : "")}</div>
    </FocusNode>
  )
}

var Sidebar = ({ setCurrentPage, currentPage, isMenuFocused, setIsMenuFocused, items }: { setCurrentPage: (page: string) => void, currentPage: string, isMenuFocused: boolean, setIsMenuFocused: (focused: boolean) => void, items: SidebarItem[] }) => {
    var currentNode = useFocusHierarchy();
    var setFocused = useSetFocus();

    if(currentNode.find((node: any) => node.focusId === "menu")) {
      setIsMenuFocused(true);
      setFocused(currentPage);
    }
    
    return (
      <FocusNode focusId="menu" className="menu" orientation="vertical">
        <div className='menuinner'>
          {items.map((item) => 
            item.type == "flexgrow" ? <div key={item.id} style={{ flexGrow: 1 }} /> : <Sidebaritem key={item.id} {...item} setCurrentPage={setCurrentPage} isMenuFocused={isMenuFocused} setIsMenuFocused={setIsMenuFocused} currentPage={currentPage} />
          )}
        </div>
      </FocusNode>
    )
}

export function SidebarView({items}: {items: SidebarItem[]}) {
    var [currentPage, setCurrentPage] = useState("menuitem_" + items[0].id);
    var [isMenuFocused, setIsMenuFocused] = useState(true)
    return (
        <FocusNode orientation="horizontal" className="sidebarView">
            <Sidebar isMenuFocused={isMenuFocused} setIsMenuFocused={setIsMenuFocused} setCurrentPage={setCurrentPage} currentPage={currentPage} items={items} />
            <FocusNode focusId="mainfocusnode" className="mainfocusnode" orientation="vertical">
                <div className="pagearea" style={isMenuFocused ? { opacity: 0.5, filter: 'blur(5px)', transform: 'scale(0.95)' } : { opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' } }>
                    {items.map((item) => item.id === currentPage.split("_")[1] && item.page !== undefined ? item.page : null)}
                </div>
            </FocusNode>
        </FocusNode>
    )
}

export type SidebarItem = {
    id: string;
    onClick: () => void;
    title: string;
    Icon: React.JSX.ElementType;
    page: React.ReactElement;
    type?: string;
}