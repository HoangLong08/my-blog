import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const uploadFile = async (image) => {
	return new Promise((resolve, reject) => {
		const storage = getStorage();
		const storageRef = ref(storage, `images/${image.name}`);
		const uploadTask = uploadBytesResumable(storageRef, image);
		uploadTask.on(
			"state_changed",
			() => {
				// dispatch(setImageLoading(id));
			},
			(err) => {
				// console.log("err upload image: ", err);
				// setError(err);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					resolve(downloadURL);
				});
			}
		);
	})

}

export { uploadFile }
