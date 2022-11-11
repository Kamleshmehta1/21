import { combineReducers, createStore } from "redux";

const initialState = {
  TODO_DATA: getData() || [],
  toggle: false,
  id: "",
};

function getData() {
  return JSON.parse(localStorage.getItem("TODO"));
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        TODO_DATA: [...state.TODO_DATA, action.payload],
      };
    case "EDIT_TODO":
      return {
        ...state,
        id: action.payload,
      };

    case "DELETE_TODO":
      function filterData(arr) {
        let newArr = arr.map((element) => {
          return {
            ...element, subTask: element.subTask.filter((subElement) => {
              filterData(subElement.subTask);
              return subElement.id !== action.payload
            })
          }
        })
        return newArr
      }
      let newArr = [...filterData(state.TODO_DATA)];
      return {
        ...state,
        TODO_DATA: newArr
      };

    case "ADD_SUBTASK":
      function addTask(arr) {
        let myArr = arr.map((Obj) => {
          for (let x in Obj) {
            if (x === "id" && Obj[x] === action.payload.id) {
              console.log("FOUND");
              Obj["subTask"].push({
                data: action.payload.data,
                id: Math.floor(Date.now() * Math.random(100)).toString(),
                subTask: [],
              });
            }
            if (x === "subTask" && Obj[x].length !== 0) {
              addTask(Obj[x]);
            }
          }
          return Obj;
        });
        return myArr;
      }
      return {
        ...state,
        TODO_DATA: addTask(state.TODO_DATA), //reference is used to render the page here we are giving new reference to render the required data
      };
    case "TOGGLE":
      return {
        ...state,
        toggle: action.payload,
      };
    case "UPDATE_TODO":
      return {
        ...state,
        TODO_DATA: state.TODO_DATA.map((ele) => {
          if (ele.id === state.id) {
            ele.data = action.payload;
          }
          return ele;
        }),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ reducer });
const store = createStore(rootReducer);

store.subscribe(() => {
  // console.log(store.getState());
  // localStorage.setItem("TODO", JSON.stringify(store.getState().reducer.TODO_DATA));
});

export default store;
