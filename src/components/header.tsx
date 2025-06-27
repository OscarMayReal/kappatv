import { FocusNode } from "@please/lrud";

export function Header({ children, Icon, title }: { children: React.ReactNode, Icon?: React.JSX.ElementType, title?: string }) {
    return (
        <FocusNode focusId="homeheader" className="homeheader" orientation="horizontal">
            <div className='homeheadertitle'>
                {Icon && <Icon style={{flexShrink: 0}} />}
                <div>{title}</div>
            </div>
            <div style={{ flexGrow: 1 }}></div>
            {children}
            <div style={{ width: '50px' }}></div>
        </FocusNode>
    )
}

export function HeaderItem({ id, onClick, Icon }: { id: string, onClick: () => void, Icon: React.JSX.ElementType }) {
    return (
        <FocusNode focusId={id} className="headericon" onSelected={onClick}>
            <Icon style={{flexShrink: 0}} />
        </FocusNode>
    )
}