import { jsx as _jsx } from "react/jsx-runtime";
export const Card = ({ className = '', hoverable = false, children, onClick, }) => {
    return (_jsx("div", { className: `bg-surface border border-border rounded-xl overflow-hidden ${hoverable ? 'hover:border-accent/50 transition-colors cursor-pointer' : ''} ${className}`, onClick: onClick, children: children }));
};
