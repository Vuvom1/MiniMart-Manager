import { useState } from 'react';

const flattenObject = (obj: any, prefix = ''): any => {
    return Object.keys(obj).reduce((acc: { [key: string]: any }, k) => {
        const pre = prefix.length ? `${prefix}.` : '';
        if (typeof obj[k] === 'object' && obj[k] !== null) {
            Object.assign(acc, flattenObject(obj[k], pre + k));
        } else {
            acc[pre + k] = obj[k];
        }
        return acc;
    }, {});
};

const useSearch = (initialData: any[]) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    };

    const filteredData = initialData.filter(item => {
        const flattenedItem = flattenObject(item);
        return Object.values(flattenedItem).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return { searchTerm, handleSearchChange, filteredData };
};

export default useSearch;
