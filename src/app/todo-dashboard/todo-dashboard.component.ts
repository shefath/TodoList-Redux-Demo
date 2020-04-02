import { CLEARTODO } from "./../actions";
import { IToDoState } from "./../store";
import { NgRedux } from "ng2-redux";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "todo-dashboard",
  templateUrl: "./todo-dashboard.component.html",
  styleUrls: ["./todo-dashboard.component.css"]
})
export class TodoDashboardComponent implements OnInit, OnDestroy {
  todos: number;
  lastUpdate;
  subscription;

  // Read the comment in TodoService
  constructor(private ngRedux: NgRedux<IToDoState>) {}
  ngOnInit(): void {
    this.subscription = this.ngRedux.subscribe(() => {
      this.todos = this.ngRedux.getState().toDos.length;
      this.lastUpdate = this.ngRedux.getState().lastUpdate;
    });
  }

  clearTodos() {
    this.ngRedux.dispatch({ type: CLEARTODO });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
