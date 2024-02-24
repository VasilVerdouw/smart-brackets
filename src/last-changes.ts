export class LastChanges {
    MAX_CHANGES = 10;
    changes: string[] = [];
    
    /**
     * Adds a change to the list of changes.
     * Removes the oldest change if the list is longer than MAX_CHANGES.
     * A change can be a longer string for example if the user pastes a block of text.
     * 
     * @param change The change to add (can be a single character or a longer string)
     */
    addChange(change: string) {
        this.changes.push(change);
        if (this.changes.length > this.MAX_CHANGES) {
            this.changes.shift();
        }
    }

    /**
     * Returns the very latest change.
     * 
     * @returns the latest change
     */
    getLatestChange() {
        return this.changes[this.changes.length - 1];
    }

    /**
     * A list of all the recent changes.
     * 
     * @returns the list of changes
     */
    getChanges() {
        return this.changes;
    }

    /**
     * Checks if the last changes are equal to the given changes.
     * EG: lastChangesEqualTo('a', 'b', 'c') will return true if the last changes were 'a' and 'b' and 'c'.
     * However this will only return true if the last changes were exactly 'a', 'b' and 'c' in that order.
     * If the user pasted 'abc' it will not return true.
     * 
     * @param changes The changes to check
     * @returns true if the last changes are equal to the given changes, false if they are not.
     */
    lastChangesEqualTo(...changes: string[]) {
        return this.changes.slice(-changes.length).join('^') === changes.join('^');
    }
}