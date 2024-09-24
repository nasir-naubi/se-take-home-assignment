export interface Order{
    orderId: number;
    assignedBotId: number; 
    vipFlag: boolean;
    completed: boolean;
    timer: number;
    timerId: NodeJS.Timer | null;
}
