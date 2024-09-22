export interface Bot{
    botId: number;
    isWorking: boolean; 
    taskId: ReturnType<typeof setTimeout> | null;
}
