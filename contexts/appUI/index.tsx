"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";

export type SIDEBAR_VIEWS = "CART_VIEW" | "HAMBURGER_MENU_VIEW";
interface State {
  displaySidebar: boolean;
  sidebarView: SIDEBAR_VIEWS;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  setSidebarView: (view: SIDEBAR_VIEWS) => void;
}

const initialState = {
  displaySidebar: false,
  sidebarView: "CART_VIEW" as SIDEBAR_VIEWS,
  openSidebar: () => {},
  closeSidebar: () => {},
  toggleSidebar: () => {},
  setSidebarView: (view: SIDEBAR_VIEWS) => {},
};

type Action =
  | {
      type: "OPEN_SIDEBAR";
    }
  | {
      type: "CLOSE_SIDEBAR";
    }
  | {
      type: "SET_SIDEBAR_VIEW";
      view: SIDEBAR_VIEWS;
    };

export const AppUI = createContext<State>(initialState);

const uiReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        displaySidebar: true,
      };
    }
    case "CLOSE_SIDEBAR": {
      return {
        ...state,
        displaySidebar: false,
      };
    }
    case "SET_SIDEBAR_VIEW": {
      return {
        ...state,
        sidebarView: action.view,
      };
    }
  }
};

const AppUIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openSidebar = useCallback(
    () => dispatch({ type: "OPEN_SIDEBAR" }),
    [dispatch]
  );
  const closeSidebar = useCallback(
    () => dispatch({ type: "CLOSE_SIDEBAR" }),
    [dispatch]
  );
  const toggleSidebar = useCallback(
    () =>
      state.displaySidebar
        ? dispatch({ type: "CLOSE_SIDEBAR" })
        : dispatch({ type: "OPEN_SIDEBAR" }),
    [dispatch, state.displaySidebar]
  );

  const setSidebarView = useCallback(
    (view: SIDEBAR_VIEWS) => dispatch({ type: "SET_SIDEBAR_VIEW", view }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      setSidebarView,
    }),
    [state]
  );

  return <AppUI.Provider value={value}>{children}</AppUI.Provider>;
};

export const useUI = () => {
  const context = useContext(AppUI);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};
export default AppUIProvider;
