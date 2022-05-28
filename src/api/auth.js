import { auth, db } from "firebaseConfig";
import {
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup
} from "firebase/auth";

import { collection, query, getDocs, where, addDoc, updateDoc, doc } from "firebase/firestore";

const login = async (email, password, role) => {
	const res = signInWithEmailAndPassword(auth, email, password)
		.then(async (userCredential) => {
			const { _tokenResponse, user } = userCredential;
			let queryManager = await query(
				collection(db, "users"),
				where("idAccount", "==", user.uid.trim())
			);
			if (role === "admin") {
				queryManager = await query(
					collection(db, "users"),
					where("idAccount", "==", user.uid.trim()),
					where("isAdmin", "==", true)
				);
			} else {
				queryManager = await query(
					collection(db, "users"),
					where("idAccount", "==", user.uid.trim())
				);
			}

			const responseManager = await getDocs(queryManager);
			const dataResult = [];
			await responseManager.forEach((doc) => {
				dataResult.push({ ...doc.data(), id: doc.id });
			});
			let resObj;
			if (dataResult[0].isActive === true) {
				const { providerData, uid } = user;
				await updateDoc(doc(db, "users", dataResult[0].id), {
					lastLogin: new Date()
				});
				resObj = {
					message: "Login success",
					type: "success",
					data: {
						idToken: _tokenResponse.idToken,
						refreshToken: _tokenResponse.refreshToken,
						expirationTime: user.stsTokenManager.expirationTime,
						emailUser: providerData[0].email,
						phoneUser: dataResult[0].numberPhone,
						avatarUser: dataResult[0].avatar,
						fullName: dataResult[0].fullName,
						uid: uid,
						idUser: dataResult[0].id
					},
				};
			} else {
				resObj = {
					message: "Your account blocked",
					type: "error",
					data: {},
				};
			}
			return resObj;
		})
		.catch(() => {
			const resObj = {
				message: "Login fail",
				type: "error",
				data: {},
			};
			signOut(auth);
			return resObj;
		});

	return res;
};

const loginWithGoogle = async (type) => {
	const provider = new GoogleAuthProvider();
	const res = signInWithPopup(auth, provider)
		.then(async (result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			// const credential = GoogleAuthProvider.credentialFromResult(result);
			// const token = credential.accessToken;
			// console.log("token: ", token)
			const user = result.user;
			// if (type === "login") {
			const queryManager = await query(
				collection(db, "users"),
				where("idAccount", "==", user.uid.trim()),
			);
			const responseManager = await getDocs(queryManager);
			const dataResult = [];
			await responseManager.forEach((doc) => {
				dataResult.push({ ...doc.data(), id: doc.id });
			});
			let data;
			if (dataResult.length === 0) {
				const addUser = await addDoc(collection(db, "users"), {
					avatar: user.photoURL,
					email: user.email,
					fullName: user.displayName,
					idAccount: user.uid,
					isActive: true,
					isAdmin: false,
					lastLogin: new Date(),
					numberPhone: "",
					registeredAt: new Date()
				});
				data = {
					idToken: user.token,
					refreshToken: user.refreshToken,
					expirationTime: user.stsTokenManager.expirationTime,
					emailUser: user.email,
					phoneUser: "",
					avatarUser: user.photoURL,
					fullName: user.displayName,
					uid: user.uid,
					idUser: addUser.id
				}
			} else {
				await updateDoc(doc(db, "users", dataResult[0].id), {
					lastLogin: new Date()
				});
				data = {
					idToken: user.token,
					refreshToken: user.refreshToken,
					expirationTime: user.stsTokenManager.expirationTime,
					emailUser: user.email,
					phoneUser: dataResult[0].numberPhone,
					avatarUser: user.photoURL,
					fullName: user.displayName,
					uid: user.uid,
					idUser: dataResult[0].id
				}
			}
			return {
				message: "Đăng nhập thành công",
				type: "success",
				data: data
			}
		}).catch((error) => {
			// const email = error.customData.email;
			// The AuthCredential type that was used.
			// const credential = GoogleAuthProvider.credentialFromError(error);
			// console.log("credential: ", credential)

			return {
				message: error.message,
				type: "error",
			};
			// ...
		});

	return res;
}

const forgotPassword = async (email) => {
	const res = sendPasswordResetEmail(auth, email)
		.then(() => ({
			message: "",
			type: "success",
		}))
		.catch((error) => {
			const errorCode = error.code;
			if (errorCode === "auth/user-not-found") {
				return {
					message: "Email not found",
					type: "error",
				};
			}
			return {
				message: error.message,
				type: "error",
			};
		});
	return res;
};

const logout = async () => {
	const res = signOut(auth)
		.then(() => ({
			message: "Logout success",
			type: "success",
		}))
		.catch(() => ({
			message: "Logout fail",
			type: "error",
		}));

	return res;
};


const register = async (fullName, email, password) => {
	const res = createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			addDoc(collection(db, "users"), {
				avatar: "https://firebasestorage.googleapis.com/v0/b/web-blog-fcc94.appspot.com/o/images%2Ffood2.jpg?alt=media&token=8f4b7412-2a26-4604-b4f1-49548d20b63e",
				email: email,
				fullName: fullName,
				idAccount: user.uid,
				isActive: true,
				isAdmin: false,
				lastLogin: new Date(),
				numberPhone: "",
				registeredAt: new Date()
			});
			return {
				message: "Register thành công",
				type: "success",
			};
		})
		.catch((error) => {
			return {
				message: error.message,
				type: "error",
			};
		});

	return res;
}

export { login, forgotPassword, logout, register, loginWithGoogle };
