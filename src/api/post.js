import {
	collection,
	query,
	getDocs,
	where,
	addDoc,
	getDoc,
	doc,
	deleteDoc,
	updateDoc,
	limit,
	increment
} from "firebase/firestore";
import { db } from "firebaseConfig";

const getListPostApi = async (role) => {
	const queryUser = await getDocs(collection(db, "users"));
	let queryPost;
	if (role === "admin") {
		queryPost = query(
			collection(db, "posts"),
		);
	} else {
		queryPost = query(
			collection(db, "posts"),
			where("isApprove", "==", true)
		);
	}

	const arrPost = [];
	const arrUser = [];
	const resArr = [];

	const querySnapshotPost = await getDocs(queryPost);
	await querySnapshotPost.forEach((docItem) => {
		arrPost.push({ ...docItem.data(), id: docItem.id });
	});

	await queryUser.forEach((docItem) => {
		arrUser.push({
			idUser: docItem.id,
			avatar: docItem.data().avatar,
			fullName: docItem.data().fullName
		});
	});


	arrPost.forEach(itemPost => {
		let newObj = {}
		arrUser.forEach(itemUser => {
			if (itemPost.idUser.trim() === itemUser.idUser.trim()) {
				newObj = {
					...itemPost,
					...itemUser
				}
			}
		})
		resArr.push(newObj);
	})
	return resArr;
}

const getDetailPostApi = async (idPost) => {
	let res = {};
	const arrUser = [];

	const docRefPost = doc(db, "posts", idPost.trim());
	const docSnapPost = await getDoc(docRefPost);

	if (docSnapPost.exists()) {
		let newObj;

		const queryUser = await getDocs(collection(db, "users"));
		const queryComment = await query(
			collection(db, "comments"),
			where("idUser", "==", docSnapPost.data().idUser.trim()),
			where("idPost", "==", idPost.trim())
		);

		await queryUser.forEach((docItem) => {
			arrUser.push({
				idUser: docItem.id,
				avatar: docItem.data().avatar,
				fullName: docItem.data().fullName
			});
		});

		const arrComment = [];
		const querySnapshotComment = await getDocs(queryComment);
		await querySnapshotComment.forEach((docItem) => {
			arrComment.push({
				...docItem.data(), idComment: docItem.id
			});
		});

		arrUser.forEach(itemUser => {
			if (itemUser.idUser.trim() === docSnapPost.data().idUser.trim()) {
				newObj = {
					...docSnapPost.data(),
					avatar: itemUser.avatar,
					fullName: itemUser.fullName,
					listComment: arrComment
				}
			}
		})
		res = {
			type: "success",
			message: "",
			data: newObj
		}
	} else {
		res = {
			type: "error",
			message: "Data not found",
			data: {}
		}
	}
	return res;
}

const createPostApi = async (categories, des, text, idUser, timeRead, thumbnail, title) => {
	const add = await addDoc(collection(db, "posts"), {
		categories: categories,
		createdAt: new Date(),
		description: des,
		idUser: idUser,
		isApprove: false,
		thumbnail: thumbnail,
		timeRead: timeRead,
		text: text,
		title: title,
		updatedAt: new Date(),
		usersLove: [],
		viewer: 0
	});

	return add;
}

const updatePostApi = async (idPost, title, html, text, categories, thumbnail, timeRead) => {
	const res = await updateDoc(doc(db, "posts", idPost), {
		title: title,
		description: html,
		text: text,
		thumbnail: thumbnail,
		categories: categories,
		timeRead: timeRead,
		updatedAt: new Date()
	});

	return res
}

const updateViewPostApi = async (idPost) => {
	const res = await updateDoc(doc(db, "posts", idPost), {
		viewer: increment(1)
	});

	return res
}

const blockOrUnblockPostApi = async (idPost, status) => {
	const res = await updateDoc(doc(db, "posts", idPost), {
		isApprove: status ? false : true
	});

	return res
}


const deletePostApi = async (idPost) => {
	const deleteCategory = deleteDoc(doc(db, "posts", idPost));
	return deleteCategory;
}

const getListPostByAuthorApi = async (idAuthor, _limit) => {
	const queryUser = await getDocs(collection(db, "users"));
	let queryPost;
	if (_limit) {
		queryPost = query(
			collection(db, "posts"),
			where("idUser", "==", idAuthor),
			limit(_limit)
		);
	} else {
		queryPost = query(
			collection(db, "posts"),
			where("idUser", "==", idAuthor)
		);
	}

	const arrPost = [];
	const arrUser = [];
	const resArr = [];

	const querySnapshotPost = await getDocs(queryPost);
	await querySnapshotPost.forEach((docItem) => {
		arrPost.push({ ...docItem.data(), id: docItem.id });
	});

	await queryUser.forEach((docItem) => {
		arrUser.push({
			idUser: docItem.id,
			avatar: docItem.data().avatar,
			fullName: docItem.data().fullName
		});
	});

	arrPost.forEach(itemPost => {
		let newObj = {}
		arrUser.forEach(itemUser => {
			if (itemPost.idUser.trim() === itemUser.idUser.trim()) {
				newObj = {
					...itemPost,
					...itemUser
				}
			}
		})
		resArr.push(newObj);
	})
	return resArr;
}

export { getListPostApi, getDetailPostApi, createPostApi, updatePostApi, deletePostApi, getListPostByAuthorApi, updateViewPostApi, blockOrUnblockPostApi };
