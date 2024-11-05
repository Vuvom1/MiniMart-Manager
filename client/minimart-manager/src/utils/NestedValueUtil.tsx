class NestedValueUtil {
    static getNestedValue = (obj: any, path: string) => {
        console.log(path)
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };
}

export default NestedValueUtil;