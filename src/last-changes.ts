export class LastChanges {
    MAX_CHANGES = 10;
    changes: string[] = [];
    
    addChange(change: string) {
        this.changes.push(change);
        if (this.changes.length > this.MAX_CHANGES) {
            this.changes.shift();
        }
    }

    getLatestChange() {
        return this.changes[this.changes.length - 1];
    }

    getChanges() {
        return this.changes;
    }

    lastChangesEqualTo(...changes: string[]) {
        return this.changes.slice(-changes.length).join('') === changes.join('');
    }
}