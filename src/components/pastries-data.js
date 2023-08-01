import { getPastriesData } from "../firebase/firebaseData";

export const pastriesData = () => {
	getPastriesData().then((data) => {
		for (let i = 0; i < data.length; i++) {
			console.log(data[i]);
		}
	});
};
