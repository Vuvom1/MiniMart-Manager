class NestedValueUtil {
    static getNestedValue = (obj: any, path: string) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };
}

export default NestedValueUtil;