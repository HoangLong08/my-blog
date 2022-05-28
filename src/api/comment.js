import {
	collection,
	// query,
	// getDocs,
	deleteDoc,
	doc,
	getDoc,
	// doc,
	updateDoc,
	addDoc,
} from "firebase/firestore";
import { db } from "firebaseConfig";
import openNotificationWithIcon from "utils/notification";

const addCommentApi = async (idPost, idUser, contentComment) => {
	try {
		await addDoc(collection(db, "comments"), {
			createdAt: new Date(),
			emoji: "like",
			idPost: idPost,
			idUser: idUser,
			updatedAt: new Date(),
			content: contentComment.trim(),
		});
	} catch (error) {
		openNotificationWithIcon('error', '', error.message, 'topRight', 5)
	}
}

const getDetailCommentApi = async (idComment) => {
	try {
		const docRefComment = doc(db, "comments", idComment.trim());
		const docSnapComment = await getDoc(docRefComment);
		if (docSnapComment.exists()) {
			return docSnapComment.data()
		} else {
			return "404";
		}
	} catch (error) {
		openNotificationWithIcon('error', '', error.message, 'topRight', 5)
	}
}

const updateCommentApi = async (idComment, contentComment) => {
	try {
		const res = await updateDoc(doc(db, "comments", idComment), {
			content: contentComment,
			updatedAt: new Date()
		});
		openNotificationWithIcon('success', '', 'Cập nhật bình luận thành công', 'topRight', 5)
		return res
	} catch (error) {
		openNotificationWithIcon('error', '', error.message, 'topRight', 5)
	}
}


const deleteCommentApi = async (idComment) => {

	try {
		await deleteDoc(doc(db, "comments", idComment))
		openNotificationWithIcon('success', '', 'Xóa bình luận thành công', 'topRight', 5)
	} catch (error) {
		openNotificationWithIcon('error', '', error.message, 'topRight', 5)
	}
}

export { addCommentApi, getDetailCommentApi, deleteCommentApi, updateCommentApi }