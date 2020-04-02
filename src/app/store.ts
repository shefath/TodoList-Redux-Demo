import { ADDTODO, CLEARTODO, TOGGLETODO, REMOVETODO } from "./actions";
import { tassign } from "tassign";

export interface IToDoState {
  toDos: any[];
  lastUpdate: null;
}
export const INIT_STATE: IToDoState = {
  toDos: [],
  lastUpdate: null
};

export function rootReducer(state: IToDoState, action): IToDoState {
  switch (action.type) {
    case ADDTODO: {
      //return { toDos: state.toDos.concat(action.todo) };
      return tassign(state, {
        toDos: state.toDos.concat(action.todo),
        lastUpdate: new Date()
      });
      break;
    }
    case REMOVETODO: {
      return tassign(state, {
        toDos: state.toDos.filter(i => i.id !== action.todo.id),
        lastUpdate: new Date()
      });
      break;
    }
    case TOGGLETODO: {
      // When modifying an item in an array, we should create a new array, and copy
      // all other item from the source array (except the item to be modified). At the same time
      // we should create a copy of the item to be modified and apply the mutations using tassing.

      // So, first we need to find the item to be modified. Here, we are finding it by it's id.

      var todo = state.toDos.find(t => t.id === action.todo.id);

      // Now, we need to find the position of this item in the array.
      var index = state.toDos.indexOf(todo);
      //console.log("in side reducer");
      //console.log(todo);

      return tassign(state, {
        toDos: [
          // Using the slice() method, we can slice an array. This method does not mutate the
          // original array, and returns a new array. So here, we're getting all the items from
          // the beginning to the index of the item we're going to modiy.
          //
          // We use the spread operator (...) to enumerate an array. This is a clean way to
          // concat two arrays. Instead of
          //
          // var newArray = [];
          // newArray.concat(sourceArray1).concat(sourceArray2);
          //
          // We can write:
          //
          // var newArray = [...sourceArray1, ...sourceArray2];
          ...state.toDos.slice(0, index),

          // So, we have copied all the items before the item to be modified. Now, we take a copy
          // of this item and apply the mutation (isCompleted).
          tassign(todo, { isCompleted: !todo.isCompleted }),

          // Now, we need to copy all the items after this item. Again, we use the slice() method
          // to get all the items following that item, and use the spread operator to enumerate
          // them and put them in our target array.
          ...state.toDos.slice(index + 1)
        ],
        lastUpdate: new Date()
      });
    }
    case CLEARTODO: {
      return tassign(state, {
        toDos: [],
        lastUpdate: new Date()
      });
    }
  }
  return state;
}
