export function clearChildren(el) {
    return function () {
        el.replaceChildren()
    }
}

export function _replaceChildren(el, nodes) {
    return function () {
        el.replaceChildren(nodes)
    }
}