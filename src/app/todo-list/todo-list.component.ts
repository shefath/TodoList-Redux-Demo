import { ADDTODO, REMOVETODO, TOGGLETODO } from "./../actions";
import { IToDoState } from "./../store";
import { NgRedux } from "ng2-redux";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"]
})
export class TodoListComponent implements OnInit, OnDestroy {
  toDos = [];
  subscription;

  constructor(private ngRedux: NgRedux<IToDoState>) {}

  ngOnInit(): void {
    this.subscription = this.ngRedux.subscribe(() => {
      this.toDos = this.ngRedux.getState().toDos;
    });
  }

  addTodo(input) {
    if (!input.value) return;

    var todo = {
      id: this.toDos.length + 1,
      title: input.value,
      isCompleted: false
    };
    this.ngRedux.dispatch({ type: ADDTODO, todo });

    input.value = "";
  }

  toggleTodo(todo: IToDoState) {
    this.ngRedux.dispatch({ type: TOGGLETODO, todo });
  }

  removeTodo(todo: IToDoState) {
    this.ngRedux.dispatch({ type: REMOVETODO, todo });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
