// Managing state globally only using react in JS
import { useState, useEffect } from "react";

let globalState = {}; // Share data between all files that import it
let listeners = [];
let actions = {};

//define outside hooks
export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      // register component when it mounts
      listeners.push(setState);
    }
    // clean up function -> when component remove
    return () => {
        if(shouldListen){
            listeners = listeners.filter(li => li !== setState);
        }
      listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState, shouldListen]); // [] -> emmpty array -> only run ehrn using custom hooks

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
