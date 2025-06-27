import { FocusNode } from "@please/lrud";

export function ListItem({ name, id, Icon, onClick, onFocused, onBlurred }: { name: string, id: string, Icon?: React.JSX.ElementType, onClick?: () => void, onFocused?: () => void, onBlurred?: () => void }) {
    return (
        <FocusNode className="listitem" focusId={id} onSelected={onClick} onFocused={onFocused} onBlurred={onBlurred}>
            {Icon && <Icon />}
            {name}
        </FocusNode>
    )
}

export function List({ children }: { children: React.ReactNode }) {
    return (
        <FocusNode orientation="vertical" className="listview">
            {children}
        </FocusNode>
    )
}