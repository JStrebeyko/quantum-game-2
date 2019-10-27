import entries from './entries.json';
export const typedEntries = entries;
// used by views/Info to render the left menu:
export const entriesNameList = Object.keys(typedEntries);
// used by info/Entry
export function getEntry(name) {
    return typedEntries[name];
}
//# sourceMappingURL=index.js.map