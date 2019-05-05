import React from "react";
import useGlobalHook from "use-global-hook";

const initialState = {
    ChangeNavWord: false
};

const actions = {
    addToCounter: (store, amount) => {
        const newCounterValue = store.state.counter + amount;
        store.setState({ counter: newCounterValue });
    },
    ChangeNavWordAction: (store) => {
        store.setState({ ChangeNavWord: !store.state.ChangeNavWord });
    }
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;