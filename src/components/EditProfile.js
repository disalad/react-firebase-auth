import React, { useRef, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uploadImg from '../store/firestore';
import Alert from './Alert';
import { useAuth } from '../store/authContext';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const usernameElement = useRef();
    const dpElement = useRef();
    const [updating, setUpdating] = useState();
    const [error, setError] = useState('');
    const [profilePhoto, setProfilePhoto] = useState({ dataUri: null, blob: {} });
    const auth = useAuth();
    const navigate = useNavigate();

    const formSubmitHandler = ev => {
        ev.preventDefault();
        const username = usernameElement.current.value;
        const image = profilePhoto.blob;
        console.warn('SUCCESS');
        updateDetailsHandler(username, image);
    };

    const updateDetailsHandler = async (username, image) => {
        if (Object.keys(image).length) {
            try {
                setUpdating(true);
                const imgUrl = await uploadImg(image);
                setUpdating(false);
                await auth.updateUserProfile(username, imgUrl);
                navigate('/');
            } catch (error) {
                setUpdating(false);
            } finally {
            }
        } else {
            navigate('/');
        }
    };

    const dropZoneClickHandler = () => {
        if (dpElement.current) {
            dpElement.current.click();
        }
    };

    const dragOverHandler = ev => {
        ev.stopPropagation();
        ev.preventDefault();
    };

    const dropHandler = ev => {
        ev.stopPropagation();
        ev.preventDefault();
        toggleDragOverHandler(ev);
        const image = ev.dataTransfer.files[0];
        if (!image.type.startsWith('image/')) {
            return setError('File is not an image');
        }
        setError('');
        updateProfilePhoto(image);
    };

    const updateProfilePhoto = file => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const blob = dataURItoBlob(reader.result);
            setProfilePhoto({ blob, dataUri: reader.result });
        };
    };

    const dataURItoBlob = dataurl => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const username = auth.currentUser.displayName;
        const blob = new Blob([u8arr], { type: mime });
        blob.name = username;
        return blob;
    };

    const inputClickHandler = ev => {
        const image = ev.target.files[0];
        updateProfilePhoto(image);
    };

    const toggleDragOverHandler = ev => {
        ev.currentTarget.classList.toggle('drag__over');
    };

    return (
        <section className='edit-profile-section form-section'>
            <h1>Edit Profile</h1>
            {error && <Alert message={error}></Alert>}
            <form action='#' onSubmit={formSubmitHandler} style={{ margin: '1.5em 0' }}>
                <div className='form-inputs'>
                    <div className='username-div input-div'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            ref={usernameElement}
                            placeholder="Leave this empty if u don't want to"
                        />
                    </div>
                    <div className='edit-profile-section'>
                        <label>Profile Photo</label>
                        <div
                            className='drop-zone'
                            onClick={dropZoneClickHandler}
                            onDragEnter={toggleDragOverHandler}
                            onDragLeave={toggleDragOverHandler}
                            onDragOver={dragOverHandler}
                            onDrop={dropHandler}
                        >
                            {profilePhoto.dataUri && <img src={profilePhoto.dataUri} />}
                            <div className={`dp-div ${profilePhoto.dataUri ? 'hide' : null}`}>
                                <label htmlFor='image-file'>
                                    Drop an File here or click to choose
                                </label>
                                <input
                                    id='image-file'
                                    type='file'
                                    ref={dpElement}
                                    onChange={inputClickHandler}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button type='submit' className='update-profile'>
                    {updating ? <FontAwesomeIcon icon={faSpinner} className='loader' /> : <>Save</>}
                </button>
            </form>
        </section>
    );
}

export default EditProfile;
