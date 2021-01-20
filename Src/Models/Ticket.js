export class TicketModel {
    constructor(data) {
        this.id = data.id;
        this.Event_ID = data.Event_ID;
        this.User_ID = data.User_ID;
        this.Validity = data.Validity;
    }
};