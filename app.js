const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        contactActive: {},
        newMessage: "",
        contactToSearch: "",
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

            if(item.messages.length == 0) {
                return "nessun messaggio"
            }
            const lastMessage = item.messages[item.messages.length - 1];
            let lastMessageText = lastMessage.text;
            const lastMessageDate = this.getTimeFromString(lastMessage.date);

            if(lastMessageText.length > 20) {
                lastMessageText = lastMessageText.slice(0, 20) + "..."
            }

            return lastMessageText + lastMessageDate;
        },
        addMessage() {
            const messageSent = {
                date: moment().format("DD/MM/YYYY HH:mm:ss"),
                text: this.newMessage,
                status: 'sent'
            }
            if (this.newMessage) {
                const contactActiveNow = this.contactActive;
                contactActiveNow.messages.push(messageSent);
                this.newMessage = "";

                setTimeout(() => {
                    const messageReceived = {
                        date: moment().format("DD/MM/YYY HH:mm:ss"),
                        text: "Va bene!",
                        status: 'received',
                        statusPopUp: false,
                        infoMessage: false,
                    }
                    contactActiveNow.messages.push(messageReceived);
                    contactActiveNow.lastAccessContact = this.getTimeFromString(messageReceived.date);
                    this.scrollToBottom()
                }, 2000);
            };
            this.scrollToBottom()
        },
        deleteText() {
            this.contactToSearch = "";
        },
        showPopUp(item) {
            item.statusPopUp = !item.statusPopUp;
            item.infoMessage = false;
        },
        deleteMessage(item, index) {
            const contactActiveNow = this.contactActive
            contactActiveNow.messages.splice(index, 1)
            
            const messagesReceived = contactActiveNow.messages.filter((element) => {
                return element.status == "received"
            })
            if (messagesReceived.length > 0) {
                const newLastAccess = this.getTimeFromString(messagesReceived[messagesReceived.length - 1].date)
                contactActiveNow.lastAccessContact = newLastAccess
            } else {
                contactActiveNow.lastAccessContact = "non disponibile"
            }
            
        },
        showInfoMessage(item) {
            item.infoMessage = !item.infoMessage;

        },
        scrollToBottom() {
            setTimeout(() => {
                this.$refs.containerChat.scrollTop = this.$refs.containerChat.scrollHeight
            }, 100);
        },
        closePopup() {
            this.contactActive.messages.forEach((element) => {
                element.statusPopUp = false;
                element.infoMessage = false;
            })
        },
    },
    mounted() {
        this.contactActive = this.usersList[0];
    }
})