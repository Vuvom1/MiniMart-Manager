import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllImports } from "../../../services/api/ImportApi";
import { importsColumnData } from "../../../data/ColumnData/ImportColumnData";
import TableLayout from "../../../components/Table/TableLayout";
import Urls from "../../../constant/urls";


function ImportList() {
    const navigate = useNavigate();
    const [imports, setImports] = useState([]);

    const fetchImports = async () => {
        try {
            const data = await getAllImports();

            setImports(data)
        } catch (error) {
            console.error('Error fetching imports:', error);
        }
    };

    useEffect(() => {
        fetchImports();
    }, []);

    return (
        <TableLayout title={"Import Control"} addItem={()=>navigate(Urls.ADMIN.SUPPLIES.IMPORTS.ADD.Path)} action={(id: string) => { navigate(`${id}`)}} data={imports} columns={importsColumnData} />
    );
}

export default ImportList;