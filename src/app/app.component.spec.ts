import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('addNewOrder(false) should add new normal order', () => {
    const comp = new AppComponent();
    expect(comp.orderList).withContext('empty at first').toEqual([]);
    comp.addNewOrder(false);
    expect(comp.orderList.length).withContext('new normal oder').toEqual(1);
  });

  it('addNewOrder(true) should add new VIP order', () => {
    const comp = new AppComponent();
    comp.addNewOrder(true);
    expect(comp.orderList.length).withContext('new VIP oder').toEqual(1);
  });

  it('addNewOrder() should sort vip order first', () => {
    const comp = new AppComponent();
    expect(comp.orderList).withContext('empty at first').toEqual([]);
    comp.addNewOrder(false);
    comp.addNewOrder(false);
    comp.addNewOrder(false);
    expect(comp.orderList[0].orderId).withContext('new normal oder').toEqual(1);
    expect(comp.orderList[1].orderId).withContext('new normal oder').toEqual(2);
    expect(comp.orderList[2].orderId).withContext('new normal oder').toEqual(3);
    comp.addNewOrder(true);
    comp.addNewOrder(false);
    expect(comp.orderList[0].orderId).withContext('new VIP oder').toEqual(4);
    expect(comp.orderList[1].orderId).withContext('new normal oder').toEqual(1);
    expect(comp.orderList[2].orderId).withContext('new normal oder').toEqual(2);
    expect(comp.orderList[3].orderId).withContext('new normal oder').toEqual(3);
    expect(comp.orderList[4].orderId).withContext('new normal oder').toEqual(5);
  });

  it('addBot() should add new bot', () => {
    const comp = new AppComponent();
    expect(comp.botList).withContext('empty at first').toEqual([]);
    comp.addBot();
    expect(comp.botList.length).withContext('new normal oder').toEqual(1);
  });

  it('deleteBot() should delete last created bot', () => {
    const comp = new AppComponent();
    expect(comp.botList).withContext('empty at first').toEqual([]);
    comp.addBot();
    comp.addBot();
    comp.addBot();
    expect(comp.botList.length).withContext('new normal oder').toEqual(3);
    comp.deleteBot();
    expect(comp.botList.length).withContext('new normal oder').toEqual(2);
  });

  it('addBot() should process order in order list', () => {
    const comp = new AppComponent();
    expect(comp.orderList).withContext('empty at first').toEqual([]);
    comp.addNewOrder(false);
    comp.addNewOrder(false);
    expect(comp.botList).withContext('empty at first').toEqual([]);
    comp.addBot();
    expect(comp.botList[0].isWorking).withContext('is working').toEqual(true);
    expect(comp.orderList[0].assignedBotId).withContext('task id').toEqual(comp.botList[0].botId);
  });


});
