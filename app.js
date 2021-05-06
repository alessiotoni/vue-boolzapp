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
            this.contactActive.messages.splice(index, 1)
        },
        showInfoMessage(item) {
            item.infoMessage = !item.infoMessage;

        },
        scrollToBottom() {
            setTimeout(() => {
                this.$refs.containerChat.scrollTop = this.$refs.containerChat.scrollHeight
            }, 100);
        },
        blur() {
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