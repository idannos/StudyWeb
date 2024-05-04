import React from "react";
import {useNavigate} from "react-router-dom";

interface FileDataProps {
    // I guess will come in the url
}


const FileData: React.FC<FileDataProps> = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>File Data</h1>
            <button onClick={() => navigate("/mainPage")}>Go to Main Page</button>
        </div>

    );
};

export default FileData;