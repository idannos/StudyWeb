import React from "react";
import {useNavigate} from "react-router-dom";

interface FilePreviewProps {
    fileName: string;
}


const FilePreview: React.FC<FilePreviewProps> = ({fileName}) => {
    const navigate = useNavigate();
    return (
        <div className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow" onClick={()=>{
            navigate("/fileData")
            console.log(fileName)
        }}>
            <h4 className="text-sm font-semibold">{fileName}</h4>
            {/* Add more file details or a thumbnail if needed */}
        </div>
    );
};

export default FilePreview;