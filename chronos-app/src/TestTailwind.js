import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function TestTailwind() {
    return (_jsx("div", { className: "bg-background min-h-screen p-8", children: _jsxs("div", { className: "bg-accent text-white p-4 rounded-lg", children: [_jsx("h1", { className: "font-pixel text-2xl", children: "Tailwind is Working!" }), _jsx("p", { className: "font-sans mt-2", children: "If you see pink background and pixel font, it's working." })] }) }));
}
