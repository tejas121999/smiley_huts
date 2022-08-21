import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    display: 'grid',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    cursor: 'pointer',
    // width: '10em',
    height: '70px',
    width: '120px',
    padding: '0',
    //   borderWidth: 2,
    borderRadius: '10px',
    //   borderColor: '#000000',
    //   borderStyle: 'dashed',
    border: '0.5px solid darkgray',
    backgroundColor: '#e8e8ea',
    color: '#bdbdbd',
    //   transition: 'border .3s ease-in-out',
};

const activeStyle = {
    borderColor: '#2196f3',
};

const acceptStyle = {
    borderColor: '#00e676',
};

const rejectStyle = {
    borderColor: '#ff1744',
};

function IdentificationDropzone(props) {
    const [files, setFiles] = useState([]);
    const [hide, setHide] = useState('');
    const onDrop = useCallback(acceptedFiles => {
        setHide(acceptedFiles.map(e => e.name));
        props.onChangeImage(acceptedFiles);
        setFiles(
            acceptedFiles.map(file =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        );
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
    });

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    );

    const thumbs = files.map(file => (
        <div
            key={file.name}
            style={{
                height: '70px',
                gridColumn: '1/2',
                gridRow: '1/2',
                zIndex: '10',
                margin: '0px',
                padding: '0px',
            }}
        >
            <img
                src={file.preview}
                alt={file.name}
                style={{ width: '100%', height: '100%', borderRadius: '10px' }}
            />
        </div>
    ));
    // console.log(thumbs)
    // clean up
    useEffect(
        () => () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    const idProof = props.id_img
    console.log("id proof = = = = = ", idProof)
    return (
        <section>
            <div {...getRootProps({ style })}>
                <input name={props.name} {...getInputProps()} />
                {hide !== '' ? (

                    <>
                        {/* <img style={{
                            height: "90%",
                            width: "100%"
                        }}
                            src={
                                process.env.REACT_APP_DEV_URL +
                                '/property_images/' +
                                property_img
                            }
                            alt=""
                        /> */}

                    </>

                ) : (
                    <>

                        <img style={{
                            height: "90%",
                            width: "100%"
                        }}
                            src={
                                process.env.REACT_APP_DEV_URL +
                                '/identity_proof/' +
                                idProof
                            }
                            alt=""
                        />

                    </>
                )}
                {thumbs}
            </div>
            <aside></aside>
        </section>
    );
}

export default IdentificationDropzone;
