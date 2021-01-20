export class EventModel {
    constructor(data) {
        this.id = data.id;
        this.Event = data.Event;
        this.Description = data.Description;
        this.Location = data.Location;
        this.Start_Date = data.Start_Date;
        this.End_Date = data.End_Date;
        this.Total_Seats = data.Total_Seats;
        this.Reserved_Seats = data.Reserved_Seats;
        this.Tickets_Available = data.Tickets_Available;
    }
};