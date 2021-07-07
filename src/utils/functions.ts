
export const createDateString = (date: Date): string => {
    if (!(date instanceof Date)){
        try {
            date = new Date(date)
        } catch {
            return '';
        }
    }
    return date.toDateString();
}