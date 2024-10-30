import { useMemo } from 'react';

const useFilter = (data: any[], searchTerm: string, fieldsToFilter: string[]) => {
    return useMemo(() => {
        if (!searchTerm) return data;

        const lowerCaseTerm = searchTerm.toLowerCase(); 

        return data.filter(item => {
           
            return fieldsToFilter.some(field => 
                item[field]?.toString().toLowerCase().includes(lowerCaseTerm)
            );
        });
    }, [data, searchTerm, fieldsToFilter]);
};

export default useFilter;