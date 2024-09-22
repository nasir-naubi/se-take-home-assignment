import { Component } from '@angular/core';
import { Order } from './model/Order';
import { Bot } from './model/Bot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
  orderIdIndex = 0;
  botIdIndex = 0;
  orderList: Order[] = [];
  botList: Bot[] = [];
  botWorkTime = 10000; // in milisecond

// START ORDER REGION
addNewOrder(isVip: boolean) {
  this.orderIdIndex++;
  const newOrder: Order = {
    orderId: this.orderIdIndex,
    assignedBotId: 0,
    vipFlag: isVip,
    completed: false
  };

  this.orderList.push(newOrder);
  this.sortOrder();
  this.checkPendingOrder();
}

sortOrder() {
  this.orderList.sort(function (a, b) {
    if (a.vipFlag != b.vipFlag) {
      return a.vipFlag ? -1 : 1;
    }
      return a.orderId - b.orderId;
  });
}

checkPendingOrder() {
  const pendingOrder = this.orderList.filter(function (order) {
    return order.assignedBotId == 0
  })[0];

  const availableBot = this.botList.filter(function (bot) {
    return bot.isWorking == false
  })[0];

  if(pendingOrder && availableBot){
    this.assignOrder(pendingOrder,availableBot);
  } 
}

assignOrder(order: Order,bot: Bot) {
  order.assignedBotId = bot.botId;
  bot.isWorking = true;
  
  const timeoutId = setTimeout(() => {this.completeOrder(order, bot)}, this.botWorkTime);
  bot.taskId = timeoutId;
  console.log('order ' + order.orderId + ' assigned to Bot ' + bot.botId)
}

completeOrder(order: Order, bot: Bot) {
  console.log('complete order func: ' + order.orderId + ', ' + order.assignedBotId)
  order.completed = true;
  bot.isWorking = false;
  bot.taskId = null;
  console.log('order ' + order.orderId + ' completed. Bot ' + bot.botId + ' is free now.')
  this.checkPendingOrder();
}
// END ORDER REGION

// START BOT REGION
  addBot() {
    this.botIdIndex++;
    const newBot: Bot = {
      botId: this.botIdIndex,
      isWorking: false,
      taskId: null
    }
    
    this.botList.push(newBot);
    this.checkPendingOrder();
  }

  deleteBot() {
      const lastBot = this.botList.pop();
      if(lastBot){
        this.cancelProcess(lastBot);
        this.botIdIndex--;
      }
  }

  cancelProcess(bot: Bot) {
    const inProgressOrder = this.orderList.filter(function (order) {
      return order.assignedBotId == bot.botId && order.completed == false
    })[0];

    if(inProgressOrder) {
      inProgressOrder.assignedBotId = 0;
      inProgressOrder.completed = false;
      if(bot.taskId != null) {
        clearTimeout(bot.taskId)
      }
    }    
  }
// END BOT REGION

}
