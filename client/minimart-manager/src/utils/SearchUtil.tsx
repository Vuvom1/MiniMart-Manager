import { useState } from 'react';

const useSearch = (initialData: any[]) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

   
    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
    };

    const filteredData = initialData.filter(item =>
        Object.values(item).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return { searchTerm, handleSearchChange, filteredData };
};

export default useSearch;
