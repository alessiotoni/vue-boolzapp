const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        contactActive: 0,
    },
    methods: {
        selectContact(index) {
            this.contactActive = index;
        },
        getTimeFromString(dateString){
            const dateFromString = moment(dateString, "DD/MM/YYYY HH/mm/ss");
            return dateFromString.format("HH:mm")
        },
    }
})