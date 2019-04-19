import axios from 'axios'
import env from '@/env'

export default {
	getChatRoom(obj) {
		return axios({
			method: 'POST',
			url: env.apiUrl + 'room/find',
			headers: env.publicHeader,
			data: obj
		})
	},

	getMessages(room) {
		return axios({
			method: 'GET',
			url: env.apiUrl + 'room/' + room + '/messages',
			headers: env.publicHeader,
		})
	},
	sendMessage(obj) {
		return axios({
			method: 'POST',
			url: env.apiUrl + 'room/createMessage',
			headers: env.publicHeader,
			data: obj
		})
	},
	doLogin(data) {
		return axios({
			method: 'POST',
			url: env.apiUrl + 'user/login',
			headers: env.publicHeader,
			data: data
		})
	},
	getEventHistory() {
		return axios({
			method: 'GET',
			url: env.apiUrl + 'api/eventLog',
			headers: env.publicHeader
		})
	},
	getChatHistory() {
		return axios({
			method: 'GET',
			url: env.apiUrl + 'api/history',
			headers: env.publicHeader
		})
	},
	getRoom() {
		return axios({
			method: 'GET',
			url: env.apiUrl + 'room',
			headers: env.publicHeader
		})
	},
	createRoom(data) {
		return axios({
			method: 'POST',
			url: env.apiUrl + 'room/create',
			headers: env.publicHeader,
			data: data
		})
	}

}
