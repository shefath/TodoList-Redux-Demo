import { IToDoState, rootReducer, INIT_STATE } from "./store";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { NgRedux, NgReduxModule } from "ng2-redux";

import { AppComponent } from "./app.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodoDashboardComponent } from "./todo-dashboard/todo-dashboard.component";
import { TodoService } from "./todo.service";

@NgModule({
  declarations: [AppComponent, TodoListComponent, TodoDashboardComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, NgReduxModule],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngredux: NgRedux<IToDoState>) {
    ngredux.configureStore(rootReducer, INIT_STATE);
  }
}
