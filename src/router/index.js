import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage.vue'
import chat from '@/components/chat.vue'
import login from '@/components/login.vue'
import SecureLayout from '@/components/secureLayout.vue'
import eventHistory from '@/components/eventHistory'
import chatHistory from '@/components/chatHistory'
import room from '@/components/room'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'homePage',
			component: homePage
		},

		{
			path: '/chat',
			name: 'chat',
			component: chat
		},
		{
			path: "/login",
			name: 'login',
			component: login
		},
		{
			path: "*",
			component: SecureLayout,
			children: [
				{
					path: '/event-history',
					name: 'eventHistory',
					component: eventHistory
				},
				{
					path: '/chat-history',
					name: 'chatHistory',
					component: chatHistory
				},
				{
					path: '/room',
					name: 'room',
					component: room
				}
			]
		}

	]

})
