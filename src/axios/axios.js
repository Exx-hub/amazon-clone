import axios from "axios";

const instance = axios.create({
	baseURL: "https://us-central1-clone-54c59.cloudfunctions.net/api", // API URL (cloud function)
});

export default instance;

// http://localhost:5001/clone-54c59/us-central1/api  from emulator just for testing
