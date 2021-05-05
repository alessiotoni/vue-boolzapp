const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        contactActive: 0,
        newMessage: "",
        contactToSearch: "",
        lastAccess: "",
    },
    computed: {
        // getLastMessageTime(){
        //     const lastAccess = this.getLastMessageTime(this.userList[this.contactActive]).time
            
        //     this.lastAccess = lastAccess
            
        // },
    },

    methods: {
        selectContact(index) {
            this.contactActive = index;
        },
        getTimeFromString(dateString){
            const dateFromString = moment(dateString, "DD/MM/YYYY HH/mm/ss");
            return dateFromString.format("HH:mm")
        },
        getLastMessage(item){
            const lastMessage = item.messages[item.messages.length - 1]
            return lastMessage
        },
        
        addMessage(){
            const messageSent = {
                date: moment(),
                text: this.newMessage,
                status: 'sent'
            }
            if (this.newMessage) {
                this.usersList[this.contactActive].messages.push(messageSent)
                this.newMessage = ""
    
                setTimeout(this.receivedMessage, 2000);
            }
            
        },

        receivedMessage(){
            const messageReceived = {
                date: moment(),
                text: "Va bene!",
                status: 'received'
            }
            this.usersList[this.contactActive].messages.push(messageReceived)
        },
        searchContact(){
            const usersListFiltered =  this.usersList.filter((element) => {
                return element.name.toLowerCase().includes(this.contactToSearch.toLowerCase())
                // console.log(element)
            })
            
            console.log(usersListFiltered)
        }
        
    },
})