const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        contactActive: {},
        newMessage: "",
        contactToSearch: "",
    },
    computed: {
        
        
    },
    methods: {
        searchContact() {
            const usersListFiltered = this.usersList.filter((contact) => {
                return contact.name.toLowerCase().includes(this.contactToSearch.toLowerCase());
            })
            return usersListFiltered;
        },
        selectContact(item) {
            this.contactActive = this.searchContact()[item];
        },
        getTimeFromString(dateString) {
            const dateFromString = moment(dateString, "DD/MM/YYYY HH/mm/ss");
            return dateFromString.format("HH:mm");
        },
        getLastMessage(item) {
            const lastMessage = item.messages[item.messages.length - 1]
            return lastMessage;
        },
        addMessage() {   
            const messageSent = {
                date: moment(),
                text: this.newMessage,
                status: 'sent'
            }
            if (this.newMessage) {
                const contactActiveNow = this.contactActive;
                contactActiveNow.messages.push(messageSent);
                this.newMessage = "";

                setTimeout(() => {
                    const messageReceived = {
                        date: moment(),
                        text: "Va bene!",
                        status: 'received',
                        statusPopUp: false,
                        
                    }
                    contactActiveNow.messages.push(messageReceived);
                    contactActiveNow.lastAccessContact = this.getTimeFromString(messageReceived.date);
                }, 2000);
            };
        },
        deleteText(){
            this.contactToSearch = "";
        },
        showPopUp(item){
            item.statusPopUp = !item.statusPopUp
        },
        deleteMessage(item){
            console.log(item)
            this.contactActive.messages.remove(item)
        }
    },
    mounted() {
        this.contactActive = this.usersList[0];
    }
})