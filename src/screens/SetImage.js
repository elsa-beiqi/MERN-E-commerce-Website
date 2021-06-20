
import axios from 'axios';
import React, { useState } from 'react';
import { useParams, } from 'react-router-dom';


export default function SigninScreen() {
    const [selectedFile, setselectedFile] = useState(null)
    const { id } = useParams();

    // On file upload (click the upload button)
    const onFileUpload = () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        );

        // Details of the uploaded file
        console.log(selectedFile);

        // Request made to the backend api
        // Send formData object
        axios.put(`/product/setimage/${id}`, { selectedFile }, { withCredentials: true }).then((response) => {
            if (response.status === 200) {
                alert("yay")
            }
        })
            .catch((error) => {
                alert(error);
                console.log(error);
            });
    };

    // File content to be displayed after
    // file upload is complete
    const fileData = () => {

        if (selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>

                    <p>File Name: {selectedFile.name}</p>


                    <p>File Type: {selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        }
    };


    return (
        <div>
            <h3>
                Set an Image For Product
            </h3>
            <div>
                <input type="file" onChange={(e) => setselectedFile(e.target.files[0])} />
                <button onClick={onFileUpload}>
                    Upload!
                </button>
            </div>
            {fileData()}
        </div>
    );

}
