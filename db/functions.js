module.exports = {
    formatDate: function () {
        const date = new Date();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const day = String(date.getDate()).padStart(2, '0');

        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const month = monthNames[date.getMonth()];

        return `${hours}:${minutes} - ${day} ${month}`;
    }
}